## **Final Project Changes to Wayshot**

This document summarizes the final implemented features and architectural changes made to Wayshot as part of the GSoC project.

---

### **Core Features & Architecture**

* **New `ext` Protocol Backend**: Introduced a new capture backend utilizing the official Wayland protocols: **`ext-image-capture-source-v1`** and **`ext-image-copy-capture-v1`**.
* **Automatic Fallback System**: Implemented a robust, unified function that defaults to the new `ext` backend and automatically falls back to the legacy **`wlr-screencopy`** backend if the new protocols are unavailable.
* **Compositor Compatibility**: Identified and implemented a workaround for a pixel format quirk in the **COSMIC** compositor, allowing Wayshot to function correctly.

---

### **Supported Capture Modes**

The new `ext` backend now supports a full range of capture modes:

* **Full Output Capture**: Capturing an entire monitor or screen.
* **Area Capture**: Selecting and capturing a custom rectangular region. This feature uses **`wlr-layer-shell`** for the selection overlay.
* **Toplevel (Application) Capture**: Capturing a specific application window using the **`ext_foreign_toplevel_list_v1`** protocol.
* **Pixel Color Capture**: A utility to grab the RGB value of a single pixel.

---

### **Integration & Feature Parity**

The new backend was integrated with existing features to ensure a consistent user experience:

* **Unified Saving Mechanism**: The `ext` backend now uses `DynamicImage` and leverages the existing `wlr` backend's save functions, allowing captures to be saved in multiple formats (PNG, JPG, etc.).
* **Cursor Capture**: The option to include the cursor in the screenshot is available for all capture modes.
* **Clipboard & Stdout**: All capture modes support copying the image to the clipboard or piping it to `stdout`.
* **Desktop Notifications**: Wayshot now provides desktop notifications upon a successful capture. The notifications are descriptive, specifying the capture type (e.g., "Area Cropping", "Pixel Color grab", or the specific Output/Application name) for user clarity and privacy.


