## **An Unexpected Reversal: Back to `wlr-layer-shell`**

Just as I thought I was finishing up the project, I learned something new that changed my direction again. I found out from Decode that `waysip`, a library Wayshot uses for area cropping, was still using `wlr_layer_shell` and `wlr_layer_surface` under the hood.

This meant that regardless of my changes to use `xdg-shell` in `libwayshot`, the `wlr` protocols were still being used in the background for area selection.

---

### Correcting a Flawed Assumption

I also learned that my initial reasoning for the switch was flawed. I had assumed that most non-wlroots compositors didn't support `wlr_layer_shell`, making `xdg-shell` a better choice for compatibility. It turns out, beyond my knowledge, that many compositors *do* actually support `wlr_layer_shell` even if they aren't wlroots-based.

Of the most popular compositors, only GNOME's Mutter is a major exception.

---

### Reverting the Change

Given this new information, I started working on reverting the code back from `xdg-shell` to the `wlr_layer_shell` protocol (the opposite of my work in `Thought_Process_7.md`).

After changing the code back to use the original `LayerShellState`, I tested it on Sway, and area capturing ran successfully. This gave more weight to my earlier suspicion that `sway-git` was most likely just broken at that time, which is why my initial tests failed.

---

### The COSMIC Quirk Revisited

On the other hand, when I tested the reverted code on COSMIC, area cropping was broken again\!

This time, however, I was more prepared. Suspecting that COSMIC (still in alpha) was the likely culprit, I took a direct step into debugging the protocol errors. After some trial and testing, I found out that it was indeed a quirk of COSMIC.

- It *did* have `wlr_layer_shell` and `wlr_layer_surface`.
- Wayshot was able to utilize it, but only partially.
- The grey surface layer for selection didn't work, but the tracking of the rectangular region *did* work, but only if the `xdg` protocols were also present.

It was a weird combination of dependencies needed just to make it work on COSMIC. After a talk with my mentor, Aakash, it was deemed likely a COSMIC bug, and the best path forward was to keep Wayshot's code reverted to the standard `wlr` usage only.

So, Wayshot is now back to using `wlr_layer_shell` for area capture, invalidating my work from `Thought_Process_7.md` 🥲.

<div style="display: flex; justify-content: space-between;">
  <a href="Thought_Process_12.md">&lt;- Back</a>
  <a href="Thought_Process_14.md">Next -&gt;</a>
</div>
