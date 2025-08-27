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

