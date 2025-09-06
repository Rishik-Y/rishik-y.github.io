Before I start going through my Thought Process, 
I would like to let the reader know that this is a Post Writing on my Thought Process 
as in Relecting back on my thought process and writing it here.

Now let me reiterate what i am trying to do.

### What am i trying to do?

As of now, Wayland doesn’t have a fully standardized method for display and top-level window capture. Most compositors rely on their own methods, or, in the case of wlroots-based compositors, use tools like `wlr-screencopy`. \
While this works, it creates complications: developers often need to write compatibility layers or checks to ensure screen and window capture features work across different compositors. This has been a persistent hassle.

But Finally as of late last year 2024 \
Some new protocols were introduced that aim to address this fragmentation: \
[Image Capture Source](https://wayland.app/protocols/ext-image-capture-source-v1) and
[Image Copy Capture](https://wayland.app/protocols/ext-image-copy-capture-v1)

So My Primary Goal is to introduce a new backend to Wayshot, Adopting the official protocol and turn the wlr backend into a legacy codebase for backwards compatibility.

### What is the difference between the current wlr-screencopy and these new sets of protocols you ask?

`wlr-screencopy` is a protocol originally developed as part of the wlroots ecosystem. It allows clients to request frames (images) from the screen. It works well for wlroots-based compositors like Sway or River, but its usage is limited outside of that scope.
So non-wlroots compositor like GNOME’s Mutter or KDE’s KWin often requires its own different protocol or extension to achieve the same results—if it allows screen capturing at all.
So as i stated before, This leads to a fragmentation problem.

#### Now what does the new protocols do different?

Wayland has introduced two more universal and formalized protocols:

ext-image-capture-source-v1: This protocol serves as an intermediary between capturing protocols and potential image capture sources such as outputs and toplevels.

ext-image-copy-capture-v1: This protocol allows clients to ask the compositor to capture image sources such as outputs and toplevels into user submitted buffers.

#### "Sorry i am really confused.. What exactly are these? What do they really do? Why are they seperated into 2 protocols? Why not keep in just 1 protocol like wlr-screencopy?"

I Know this is very confusing so lets just understand in simple terms: \
we are running sway with a 2 monitor setup,

You dont know what sway is? \
[sway](https://github.com/swaywm/sway "sway") is an [i3](https://github.com/swaywm/sway "i3")-compatible tiling Wayland compositor.

What is a Wayland compositor?
Go through [here](What_is_wayland_compositor.md)

What is wayland? (Did you even understand what i wrote till this point!?!)<br>
Go through [here](What_is_linux.md)

Now going coming back to out initial question,<br>
we are running sway with a 2 monitor setup,<br>
Now,<br>
Step 1: `Use ext-image-capture-source-v1`<br>
App says: “Hey compositor, tell me what I can capture.”<br>
Sway responds with:<br>
- Monitor 1: "DP-1 (1920x1080)"<br>
- Monitor 2: "HDMI-A-1 (1920x1080)"<br>
- ~~Window: "Firefox – YouTube"~~<br>
- ~~Window: "Terminal – neovim"~~<br>

Note: The above crossed lined were my initial assumption on what the compositor would reply with but the applications are not part of it,
its specifically handled by ext_foreign_toplevel_list_v1.

Step 2: `Use ext-image-copy-capture-v1`<br>
Once the user select a source, the app uses this protocol to say: “Now give me a frame from the selected source.”
The compositor sends the pixels.

This is a very lay man terms and example presented above, but in essence:-<br>
ext-image-capture-source-v1:  It doesn't perform any actual image capture; instead, it facilitates the discovery of available sources.<br>
ext-image-copy-capture-v1: It handles the actual image capture process, copying the content into the specified buffer.

Now why are these two seperate and not 1 similar to wlr-screencopy for wlroots?<br>
Mainly for modularity, protocols were designed with single, well-defined roles.<br>
This gives compositors choice to add on his own accord on which protocol to use.

There are also reasons like security and privacy but I would not like to dvelve more on it since I havent understood much myself.<br>
But from what i understood, wlr-screencopy being in one protocol, may not capture the top level layer or window however still have an access to it nonetheless which is a security hole.


| Feature                  | `ext-image-capture-source-v1`         | `ext-image-copy-capture-v1`          |
|--------------------------|----------------------------------------|----------------------------------------|
| **Purpose**              | Enumerate and select capture sources   | Actually capture image frames          |
| **Role**                 | Source discovery                       | Data transfer (frame copying)          |
| **Analogy**              | TV Guide – shows you what’s available  | DVR – records the show                 |
| **Replaces / Improves**  | ad hoc APIs for window/output discovery | `wlr-screencopy`, per-compositor capture methods |

This is the reason why the new protocols were not kept like wlr-screencopy.

### "Sorry Everything went over my head 😵‍💫"

Look, these protocols are aim to be adopted across multiple compositors, including GNOME, KDE, and wlroots-based ones. If widely adopted, this can eliminate the need for each app to implement multiple capture backends or rely on compositor-specific hacks.

In other words: one capture API to rule them all.

<- Back [GSOC Homepage](../GSoC.md)<br>
Forward: [Next](Thought_Process_2.md) ->