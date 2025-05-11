
Currently using Resources:

- [GSOC 2025](Resources)

# Google Summer Of Code 2025 With Waycrate

I'm glad to able to participate in [Google's Summer of Code](https://en.wikipedia.org/wiki/Google_Summer_of_Code) 2025 program with [Waycrate](https://waycrate.github.io/index.html). I have been looking into GSoC for a few months and I'm happy that after a rabbit hole of looking at different projects that I was able to find a project I was interested in.

# What's your project about?
To put it in a nutshell: It's basically about implementing a [new wayland protocol](https://wayland.app/protocols/ext-image-capture-source-v1#ext_image_capture_source_v1) to a Rust library called [libwayshot](https://github.com/waycrate/wayshot). 


> [!question]- Never Heard of Wayland, What is it?
> Here [link}(https://wayland.freedesktop.org) is the general explanation

> [!question]- How do I know whether i use wayland or Xorg?
> Simply open your Linux terminal and type 'echo $XDG_SESSION_TYPE' – this command will tell you whether you're running Wayland or Xorg!






> [!question]- Never heard of ext_image_capture_source? What is it?
> Technically, it's a Wayland protocol extension that allows clients (like screen recording tools or remote desktop apps) to request and receive image data from specific surfaces or windows. More casually, think of it as a new way for applications to "see" parts of your screen—securely and efficiently. It's especially important for use cases like screen sharing in video calls or capturing gameplay footage, and it's designed with privacy and permissions in mind.



In a bit more detail: 

Wayshot is a screen capture *client* for Wayland compositors (which in this instance act as servers) that implement the [wlr-screencopy](https://wayland.app/protocols/wlr-screencopy-unstable-v1)  protocol (which at this point is mostly compositors based on the [wlroots](https://github.com/swaywm/wlroots) library like [sway](https://en.wikipedia.org/wiki/Sway_(window_manager)) , river, etc).
> [!question]- What is a Wayland Compositor? 
> It's basically a program that manages how all *other* programs on your system are displayed. All your programs draw stuff and pass it to your compositor which ultimately draws them onto your monitor after adding stuff like window decorations. It's responsible for a large part of the Linux desktop user experience

