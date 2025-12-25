# Video Background Setup

## How to Add Your Video

Place your construction video in this folder with the following filenames:

- **construction-bg.mp4** (required)
- **construction-bg.webm** (optional, for better browser compatibility)

## Video Recommendations

For best performance and appearance:

### File Specifications:
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Frame Rate**: 24-30 fps
- **Duration**: 10-30 seconds (loops automatically)
- **File Size**: Under 10MB for faster loading

### Content Suggestions:
- Construction site footage (time-lapse or regular speed)
- Building process highlights
- Heavy machinery in action
- Completed projects showcase
- Aerial/drone footage of developments
- Night construction scenes (works great with dark mode)

### Video Optimization:
Use tools like HandBrake or FFmpeg to compress your video:

```bash
# FFmpeg example to compress and optimize
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -strict -2 -b:v 2M -maxrate 2M -bufsize 1M construction-bg.mp4

# Create WebM version for broader compatibility
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 1.5M construction-bg.webm
```

## Current Implementation

The video background:
- ✅ Covers the entire hero section
- ✅ Extends down to the "Our Story" section in About
- ✅ Has a dark overlay for better text readability
- ✅ Stronger overlay in dark/night mode
- ✅ Autoplays, loops, and is muted (mobile-friendly)
- ✅ Responsive and works on all devices

## Fallback

If no video is found, the banner image (hero-bg.jpg) will display as fallback.
