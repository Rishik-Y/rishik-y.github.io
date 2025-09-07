## **Writing Some Basic Code**

This is not directly linked to Wayshot, However I believe this is important to later parts
Where I re-iterate back to here in understanding some of the concepts.

So Before Immediately working on the code, I decided to take a step back and get my fundamentals straight.

### **Why I Did This (Even If It's Not Directly Wayshot-Related)**

While trying to dive into Wayshot and the new Wayland protocols 
(`ext-image-capture-source` and `ext-image-copy-capture`), I realized something:

> A lot of this was going over my head.

I’ve worked with Wayland protocols before (specifically in [wluma](https://github.com/maximbaz/wluma)), but that was over a year ago.

So instead of blindly poking at new protocol code, I decided to go back to basics and **build a simple Wayland client in Rust** - just to refresh how globals are registered, how outputs are discovered, and how events are handled.

### **What the Client Does**

This tool is kind of a Rust-powered, simplified version of `wayland-info`.
It connects to a Wayland server and:

* Retrieves the **global registry** of all available interfaces
* Binds to all `wl_output` interfaces
* Logs useful details about each output:

    * Geometry
    * Resolution + refresh rate
    * Scale factor
    * Name & description

Nothing fancy. No screenshots. Just info.

👉 **[View the code on GitHub](https://github.com/Rishik-Y/rishik-y.github.io/tree/b46c5fd8b05369537947a3235af4e75b9ccc100f/GSOC/GSoC_Old_testing/May_17_25)**

### **What I Got Out of It**

Even though it’s not part of Wayshot directly, this little detour helped me:

* Relearn how `wl_registry` and `wl_output` work
* Understand how `Dispatch` works in the Rust `wayland-client` crate
* See how roundtrips and event queues are used to sync state
* Feel a little less lost in the Wayland world :)

<div style="display: flex; justify-content: space-between;">
  <a href="Thought_Process_3.md">&lt;- Back</a>
  <a href="Thought_Process_5.md">Next -&gt;</a>
</div>
