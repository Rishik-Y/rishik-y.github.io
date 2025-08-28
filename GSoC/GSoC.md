Google Summer of Code 2025 with Waycrate!

This website is basically a Documentation of the project I worked on,
Why and what Changes I did,
What new features I added,
What bugs I encountered,
What I learned,
What I new features can be added for the people next!

So what is the project on about? \
In a very layman terms, it is making a existing screenshot tool making it cross compatible across all wayland based compositors from wlroots based compositors.

Here, Wayshot is a screen capture client for Wayland compositors (which in this instance act as servers) that
implement the wlr-screencopy protocol (which at this point is mostly compositors based on the wlroots library like sway , river, etc).

Right now,
Wayshot currently uses wlr-screencopy protocol which is non-standard. 
Its main drawback is that it works only on wlr-based compositors which means Wayshot as of till now can't be used on compositors like Mutter, Cosmic, Kwin

My Project will be to modify libwayshot and wayshot such that it uses "ext_image_capture_source_v1" protocol, which has been introduced to Wayland,
providing a standardized method for display and top-level window capture. 
This allows us to run Wayshot on any compositor that supports this latest protocol.
Adopting the official protocol will also offer us toplevel capture capabilities natively and using it we can further improve the user experience.
The Main Idea is to turn the existing wlr backend into a legacy codebase for backwards compatibility and add addition features such as notification when a particular app-id is being recorded by wayshot clients etc.

It's all a bit steeped in domain specific knowledge which is distributed all over the internet. 
I have an unorganized and non-exhaustive pile of links I used to get a better idea of the problem which may be of interest to some: [Research Links](Resources.md)

For a thorough explanation on my though process from start to finish, please go through this: [My Thought Process](Though_Process/Thought_Process_1.md)

For a Direct Info on the end changes I made, please go through this: [My End Changes](End_Changes.md)



I will be explaining in a manner such that even newbie in Linux could understand,
So for people who are professionals in Linux, please go easy on me, for simplifying some parts of the documentation.