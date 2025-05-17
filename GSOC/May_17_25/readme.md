Outputs are as such:

Cosmic:
```
cargo run
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.15s
     Running `target/debug/Testing`
WlDisplay object created: WlDisplay { id: ObjectId(wl_display@1, 0), version: 1, data: Some(ObjectData { .. }), backend: WeakBackend { inner: WeakInnerBackend { state: (Weak) } } }
WlRegistry object created: WlRegistry { id: ObjectId(wl_registry@2, 1), version: 1, data: Some(ObjectData { .. }), backend: WeakBackend { inner: WeakInnerBackend { state: (Weak) } } }
Global: name=1, interface=wl_compositor, version=5
Global: name=2, interface=wl_subcompositor, version=1
Global: name=3, interface=wl_data_device_manager, version=3
Global: name=4, interface=wp_fractional_scale_manager_v1, version=1
Global: name=5, interface=zwp_keyboard_shortcuts_inhibit_manager_v1, version=1
Global: name=6, interface=zxdg_output_manager_v1, version=3
Global: name=7, interface=zwlr_output_manager_v1, version=4
Global: name=8, interface=zcosmic_output_manager_v1, version=3
Global: name=9, interface=zwlr_output_power_manager_v1, version=1
Global: name=10, interface=zcosmic_overlap_notify_v1, version=1
Global: name=11, interface=wp_presentation, version=2
Global: name=12, interface=zwp_primary_selection_device_manager_v1, version=1
Global: name=13, interface=ext_output_image_capture_source_manager_v1, version=1
Global: name=14, interface=zcosmic_workspace_image_capture_source_manager_v1, version=1
Global: name=15, interface=ext_foreign_toplevel_image_capture_source_manager_v1, version=1
Global: name=16, interface=ext_image_copy_capture_manager_v1, version=1
Global: name=17, interface=wl_shm, version=2
Global: name=18, interface=wp_cursor_shape_manager_v1, version=1
Global: name=19, interface=wp_viewporter, version=1
Global: name=20, interface=org_kde_kwin_server_decoration_manager, version=1
Global: name=21, interface=zxdg_decoration_manager_v1, version=1
Global: name=22, interface=ext_session_lock_manager_v1, version=1
Global: name=25, interface=zwp_pointer_constraints_v1, version=1
Global: name=26, interface=zwp_pointer_gestures_v1, version=3
Global: name=27, interface=zwp_tablet_manager_v2, version=1
Global: name=28, interface=wp_security_context_manager_v1, version=1
Global: name=29, interface=zwp_input_method_manager_v2, version=1
Global: name=30, interface=zwp_text_input_manager_v3, version=1
Global: name=31, interface=zwp_virtual_keyboard_manager_v1, version=1
Global: name=32, interface=wp_alpha_modifier_v1, version=1
Global: name=33, interface=wp_single_pixel_buffer_manager_v1, version=1
Global: name=34, interface=ext_idle_notifier_v1, version=2
Global: name=35, interface=zwp_idle_inhibit_manager_v1, version=1
Global: name=36, interface=zwlr_layer_shell_v1, version=4
Global: name=37, interface=xdg_wm_base, version=6
Global: name=38, interface=xdg_activation_v1, version=1
Global: name=39, interface=zxdg_exporter_v2, version=1
Global: name=40, interface=zxdg_importer_v2, version=1
Global: name=41, interface=zcosmic_toplevel_info_v1, version=3
Global: name=42, interface=ext_foreign_toplevel_list_v1, version=1
Global: name=43, interface=zcosmic_toplevel_manager_v1, version=4
Global: name=44, interface=ext_workspace_manager_v1, version=1
Global: name=45, interface=zcosmic_workspace_manager_v2, version=2
Global: name=46, interface=cosmic_a11y_manager_v1, version=2
Global: name=47, interface=cosmic_atspi_manager_v1, version=1
Global: name=48, interface=zwp_relative_pointer_manager_v1, version=1
Global: name=51, interface=wp_drm_lease_device_v1, version=1
Global: name=52, interface=zwp_linux_dmabuf_v1, version=5
Global: name=53, interface=wl_drm, version=2
Global: name=54, interface=wp_drm_lease_device_v1, version=1
Global: name=55, interface=wl_output, version=4
Global: name=56, interface=wp_linux_drm_syncobj_manager_v1, version=1
Global: name=57, interface=wl_seat, version=9

--- Wayland Global Registry Summary ---
Total globals found: 53
1: wl_compositor (v5)
2: wl_subcompositor (v1)
3: wl_data_device_manager (v3)
4: wp_fractional_scale_manager_v1 (v1)
5: zwp_keyboard_shortcuts_inhibit_manager_v1 (v1)
6: zxdg_output_manager_v1 (v3)
7: zwlr_output_manager_v1 (v4)
8: zcosmic_output_manager_v1 (v3)
9: zwlr_output_power_manager_v1 (v1)
10: zcosmic_overlap_notify_v1 (v1)
11: wp_presentation (v2)
12: zwp_primary_selection_device_manager_v1 (v1)
13: ext_output_image_capture_source_manager_v1 (v1)
14: zcosmic_workspace_image_capture_source_manager_v1 (v1)
15: ext_foreign_toplevel_image_capture_source_manager_v1 (v1)
16: ext_image_copy_capture_manager_v1 (v1)
17: wl_shm (v2)
18: wp_cursor_shape_manager_v1 (v1)
19: wp_viewporter (v1)
20: org_kde_kwin_server_decoration_manager (v1)
21: zxdg_decoration_manager_v1 (v1)
22: ext_session_lock_manager_v1 (v1)
25: zwp_pointer_constraints_v1 (v1)
26: zwp_pointer_gestures_v1 (v3)
27: zwp_tablet_manager_v2 (v1)
28: wp_security_context_manager_v1 (v1)
29: zwp_input_method_manager_v2 (v1)
30: zwp_text_input_manager_v3 (v1)
31: zwp_virtual_keyboard_manager_v1 (v1)
32: wp_alpha_modifier_v1 (v1)
33: wp_single_pixel_buffer_manager_v1 (v1)
34: ext_idle_notifier_v1 (v2)
35: zwp_idle_inhibit_manager_v1 (v1)
36: zwlr_layer_shell_v1 (v4)
37: xdg_wm_base (v6)
38: xdg_activation_v1 (v1)
39: zxdg_exporter_v2 (v1)
40: zxdg_importer_v2 (v1)
41: zcosmic_toplevel_info_v1 (v3)
42: ext_foreign_toplevel_list_v1 (v1)
43: zcosmic_toplevel_manager_v1 (v4)
44: ext_workspace_manager_v1 (v1)
45: zcosmic_workspace_manager_v2 (v2)
46: cosmic_a11y_manager_v1 (v2)
47: cosmic_atspi_manager_v1 (v1)
48: zwp_relative_pointer_manager_v1 (v1)
51: wp_drm_lease_device_v1 (v1)
52: zwp_linux_dmabuf_v1 (v5)
53: wl_drm (v2)
54: wp_drm_lease_device_v1 (v1)
55: wl_output (v4)
56: wp_linux_drm_syncobj_manager_v1 (v1)
57: wl_seat (v9)

--- Wayland Outputs ---
Total outputs found: 1
Output ID: 55
Output Geometry:
  Position: (0, 0)
  Physical size: 340mm x 190mm
  Subpixel: Value(Unknown)
  Make: AU Optronics
  Model: 0xAF90
  Transform: Value(Normal)
Output Mode:
  Resolution: 1920x1080
  Refresh rate: 144.149 Hz
  Flags: Value(Mode(Current | Preferred))
Output Mode:
  Resolution: 1920x1080
  Refresh rate: 60.201 Hz
  Flags: Value(Mode(0x0))
Output Mode:
  Resolution: 1680x1050
  Refresh rate: 144.149 Hz
  Flags: Value(Mode(0x0))
Output Mode:
  Resolution: 1280x1024
  Refresh rate: 144.149 Hz
  Flags: Value(Mode(0x0))
Output Mode:
  Resolution: 1440x900
  Refresh rate: 144.149 Hz
  Flags: Value(Mode(0x0))
Output Mode:
  Resolution: 1280x800
  Refresh rate: 144.149 Hz
  Flags: Value(Mode(0x0))
Output Mode:
  Resolution: 1280x720
  Refresh rate: 144.149 Hz
  Flags: Value(Mode(0x0))
Output Mode:
  Resolution: 1024x768
  Refresh rate: 144.149 Hz
  Flags: Value(Mode(0x0))
Output Mode:
  Resolution: 800x600
  Refresh rate: 144.149 Hz
  Flags: Value(Mode(0x0))
Output Mode:
  Resolution: 640x480
  Refresh rate: 144.149 Hz
  Flags: Value(Mode(0x0))
Output name: eDP-1
Output description: AU Optronics - 0xAF90 - eDP-1
Output scale factor: 1
Output configuration complete

Wayland client completed successfully
```
