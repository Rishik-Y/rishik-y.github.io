## So What Did I initially Do?

Okay, now that all the explanations and introductions are out of the way...

#### What have I actually done Initially? And what was I planning to do moving ahead?

First of all,
Here my Initial messages of me celebrating my GSoC selection:<br>
"First of all - 9th May was the day I officially found out I got selected for GSoC! 🎉 <br>
Wait... the official announcement was on the 8th? Yeah, technically. But for me it came in at 00:05 IST on the 9th, so I’m counting it as the 9th :P"

Anyway — let’s talk about setting up the development environment.

### **Why the Dev Environment Matters**

To test `ext_image_capture_source` and its companion protocol `ext_image_copy_capture`, I needed a **compositor that actually supports them**. Without proper compositor support, Wayshot simply can't function with these new protocols.

I think it’s important to Write this part of my Thought Process - especially since it directly impacts the rest of the project.

### **Compositor Hunting: What I Tried and Why**

I tried quite a few compositors, but as of now, **very few** actually support both of the new Wayland protocols.

Some notable ones that came up during my research:

* **Jay**
* **Louvre**

#### **Why Not Jay or Louvre?**

* **Louvre**:
  I initially tried Louvre, but it lacks support for `ext_image_copy_capture`, which is the *core* protocol responsible for doing the actual buffer capture (i.e., the heavy lifting).
  On top of that, I ran into multiple bugs - not ideal for dev work.

* **Jay**:
  Jay *does* support both protocols, but unfortunately... it comes with a **lot of bugs**.
  It’s hard to rely on a compositor that crashes or behaves unpredictably mid-testing. :C

### **Enter Sway (Git)**

Eventually, I turned to **Sway-git**, which already has support for the new protocols.

At first, it had a few issues - but those were quickly resolved after some recent patches by the developers.
**Both Aakash and Rachancheet** recommended Sway for development, and honestly, it worked out well.

That said, I personally didn’t find Sway to be *my taste* for daily use.
Still, it was a solid environment for testing - and great for legacy + wlroots-related work.

### **A New Discovery: COSMIC**

Then I found out about **COSMIC** - a compositor that **also supports the new protocols**, 
and felt more aligned with how I wanted my desktop to work.

So that was what I stick with as my **daily driver**.

### **Final Setup**

Here’s what my environment looked like:

| Compositor   | Purpose                                                             |
| ------------ | ------------------------------------------------------------------- |
| **COSMIC**   | For working with the `ext-*` protocol stack and general daily usage |
| **Sway-git** | For testing compatibility with wlroots and fallback behavior        |
| **Hyprland** | For observing error cases and robustness testing                    |

Note: Hyprland In actuallity came very less into play while working on Wayshot.

This setup gave me the flexibility to cover both legacy and modern protocol paths -
and makes it easier to test Wayshot in realistic environments.

Now forward to digging into actual protocol-level work now that the environment is in place.

<- Back [13/06/25](Thought_Process_2.md)<br>
Forward: [15/06/25](Thought_Process_4.md) ->