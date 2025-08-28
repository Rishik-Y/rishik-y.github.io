What is a Wayland Compositor? \
It's basically a program that manages how all other programs on your system are displayed. \
All your programs draw stuff 
and pass it to your compositor which ultimately draws them onto your monitor after adding stuff like window decorations. 
It's responsible for a large part of the Linux desktop user experience

Mutter, Kwin, Hyprland, Sway are some to name a few. \
If you are using a Distro like Ubuntu or fedora, You are probably using Gnome by default. \
Gnome is a Desktop environment and uses Mutter as its compositor. \
KDE plasma (Desktop Environment) uses Kwin as its compositor.

Now Each compositor has its own way of doing things and simply uses wayland protocol to communicate with the client.

To be precise, Wayland simply is a protocol that defines how a client should
communicate with a compositor. \
Wayland cannot work on its own without a compositor unlike X11.

Now thats out of the way, \
Every compositor utilizes these protocols in their own way, \
Some choose to incorporate every single wayland protocol in their compositor. \
While others may only choose a very few handful of protocols trying to either
keeping it lightweight or simply choosing to utilize their own compositor specific protocol.

Mutter (Gnome), Kwin (KDE Plasma) and Cosmic (Pop OS) are some compositors 
which were made from scratch and make up their very own protocols 
where they find it lacking in wayland protocols. 

However making a compositor from scratch is a very difficult task and so 
there is another set of compositors called wlroots based compositors 
which used wlr protocols, 
wlr protocols are basically a set of protocols which covers the remaining sets of protocols
not yet built by the wayland team, for a compositor to function properly.
Its built by the sway team and is used by many compositors.

Some of the few well known compositors which use wlr protocols are: Sway and Treeland (Deepin)

One unique compositor here would be Hyprland which used to be dependent on wlroots but 
now has become completely independent of wlroots and uses its very own compositor as well.

Hopefully this should give you a basic Idea on what a Wayland compositor is.