use std::cell::RefCell;
use std::rc::Rc;
use wayland_client::{
    protocol::{wl_output, wl_registry},
    Connection, Dispatch, QueueHandle,
};

// The state structure to hold registry data and outputs
struct AppData {
    globals: Vec<(u32, String, u32)>,
    outputs: Vec<(u32, wl_output::WlOutput)>,
}

// Implementation of the Registry handler
impl Dispatch<wl_registry::WlRegistry, ()> for AppData {
    fn event(
        state: &mut Self,
        registry: &wl_registry::WlRegistry,
        event: wl_registry::Event,
        _: &(),
        _: &Connection,
        qh: &QueueHandle<Self>,
    ) {
        match event {
            wl_registry::Event::Global {
                name,
                interface,
                version,
            } => {
                println!(
                    "Global: name={}, interface={}, version={}",
                    name, interface, version
                );
                
                // Store all globals
                state.globals.push((name, interface.clone(), version));
                
                // Bind to wl_output interfaces
                if interface == "wl_output" {
                    let output = registry.bind::<wl_output::WlOutput, _, _>(name, version, qh, ());
                    state.outputs.push((name, output));
                }
            }
            wl_registry::Event::GlobalRemove { name } => {
                println!("Global removed: name={}", name);
                
                // Remove from globals list
                state.globals.retain(|(n, _, _)| *n != name);
                
                // Remove from outputs list if it's there
                state.outputs.retain(|(n, _)| *n != name);
            }
            _ => {}
        }
    }
}

// Implementation of the Output handler
impl Dispatch<wl_output::WlOutput, ()> for AppData {
    fn event(
        _state: &mut Self,
        _output: &wl_output::WlOutput,
        event: wl_output::Event,
        _: &(),
        _: &Connection,
        _: &QueueHandle<Self>,
    ) {
        match event {
            wl_output::Event::Geometry {
                x,
                y,
                physical_width,
                physical_height,
                subpixel,
                make,
                model,
                transform,
            } => {
                println!("Output Geometry:");
                println!("  Position: ({}, {})", x, y);
                println!("  Physical size: {}mm x {}mm", physical_width, physical_height);
                println!("  Subpixel: {:?}", subpixel);
                println!("  Make: {}", make);
                println!("  Model: {}", model);
                println!("  Transform: {:?}", transform);
            }
            wl_output::Event::Mode {
                flags,
                width,
                height,
                refresh,
            } => {
                println!("Output Mode:");
                println!("  Resolution: {}x{}", width, height);
                println!("  Refresh rate: {} Hz", refresh as f64 / 1000.0);
                println!("  Flags: {:?}", flags);
            }
            wl_output::Event::Done => {
                println!("Output configuration complete");
            }
            wl_output::Event::Scale { factor } => {
                println!("Output scale factor: {}", factor);
            }
            wl_output::Event::Name { name } => {
                println!("Output name: {}", name);
            }
            wl_output::Event::Description { description } => {
                println!("Output description: {}", description);
            }
            _ => {}
        }
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Connect to the Wayland server
    let conn = Connection::connect_to_env()?;
    
    // Create a new event queue
    let mut event_queue = conn.new_event_queue();
    let qh = event_queue.handle();
    
    // Initialize state
    let app_data = Rc::new(RefCell::new(AppData {
        globals: Vec::new(),
        outputs: Vec::new(),
    }));
    
    // Get the Wayland display object
    let display = conn.display();
    println!("WlDisplay object created: {:?}", display);
    
    // Get the registry
    let registry = display.get_registry(&qh, ());
    println!("WlRegistry object created: {:?}", registry);
    
    // Roundtrip to process initial events
    event_queue.roundtrip(&mut *app_data.borrow_mut())?;
    
    // Print summary of each stuff
    {
        let data = app_data.borrow();
        
        println!("\n--- Wayland Global Registry Summary ---");
        println!("Total globals found: {}", data.globals.len());
        for (name, interface, version) in &data.globals {
            println!("{}: {} (v{})", name, interface, version);
        }
        
        println!("\n--- Wayland Outputs ---");
        println!("Total outputs found: {}", data.outputs.len());
        for (id, _) in &data.outputs {
            println!("Output ID: {}", id);
        }
    } // data is dropped here, releasing the borrow
    
    // Process remaining events
    event_queue.roundtrip(&mut *app_data.borrow_mut())?;
    
    println!("\nWayland client completed successfully");
    Ok(())
}

