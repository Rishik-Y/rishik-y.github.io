## **Merging the `ext` and `wlr` Backends**

After adding the smaller features, it was time for a major change. I focused on merging the new `ext_image_*` protocol codebase with Wayshot's existing `wlr-screencopy` code.

This was one of the biggest hurdles so far. I quickly learned that any minor mistake I made during the merge would result in countless hours of debugging to find the cause.

-----

### Building a Fallback System

My main focus here was on **backwards compatibility**. I wanted Wayshot to be smart enough to automatically detect and use the correct protocol on its own. The logic I aimed for was:

1.  First, try to connect and capture using the new `ext_image_*` protocols.
2.  If that fails for any reason (like connecting to an older compositor), automatically fall back and try again with the old `wlr-screencopy` protocol.

To properly test this new fallback system, I added a temporary boolean variable to the code. This allowed me to easily force one protocol or the other during my tests, ensuring both paths and the transition between them worked correctly.

-----

### A Successful Merge

Thankfully, after many trial and error sessions, I successfully merged a large portion of the new codebase into the old. 🎉

This significantly reduced the amount of redundant code. I was also able to split and merge some of the existing structs, which increased the overall efficiency of the code, especially when it came to handling the backwards compatibility logic.

-----

### Reaching Feature Parity

While I was deep in the Wayshot codebase doing this merge, I also took the opportunity to bring the new `ext` method closer to feature parity with the `wlr` method. I added support for more of the existing output options, such as piping the screenshot data directly to the **clipboard** or to `stdout`.

<- Back: [Back](Thought_Process_7.md)<br>
Forward: [Next](Thought_Process_9.md) ->