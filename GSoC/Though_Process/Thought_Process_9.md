## **Exploring the Streaming Usecase**

By this point, I had nearly completed the basic tasks that were needed for the new backend. So, I started focusing on a separate, more advanced task: enabling the **streaming usecase**.

-----

### The Bottleneck in `libwayshot`

To give you a brief idea of the problem, here's what's happening in Wayshot:

Each time a frame needs to be captured, the necessary resources are initialized, utilized once, and then immediately deleted. This entire process is contained within a loop.

This is perfectly fine for taking a single screenshot. However, this becomes a major issue when focusing on a streaming usecase. For `xdg-portals` or any other program using the `libwayshot` library for screen recording, this constant setup and teardown for every single frame is a huge performance bottleneck.

-----

### Simulating a Stream

To try and understand this problem better, I decided to simulate a stream. I wrote a separate block of code that would take a series of images in quick succession and save them immediately into a folder.

When I ran this program, a series of issues occurred. The process was far slower than I expected, and I ran into problems with the parallelism of capturing and saving, as well as with storing the frames in `wl_shm` memory.

NOTE: At the time, I didn't understand what the flaw was. From my understanding, the capture process itself should have been much faster. What was lacking in my judgement was the fact that the **saving of the images to disk** was the actual bottleneck. In a real streaming scenario, the frames aren't saved but are streamed directly to another application, which avoids this I/O-heavy operation.

-----

### Pausing the Experiment

After giving it a serious amount of time and not making clear progress - largely due to my flawed simulation - I decided to remove the experimental streaming block for now. I'll come back to this issue once I have a better understanding of the fundamentals involved.

<div style="display: flex; justify-content: space-between;">
  <a href="Thought_Process_8.md">&lt;- Back</a>
  <a href="Thought_Process_10.md">Forward: [Next] -&gt;</a>
</div>
