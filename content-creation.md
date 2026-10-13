# Motion Graphics

- **Remotion (React/TypeScript):** you build the animation as React components and it renders to MP4. This is the best fit if you want product-style motion graphics like animated stats, charts, kinetic text, or logo reveals. It would also fit this repo's web stack.
- **Lottie / SVG / CSS animations:** lightweight animations that play inside the app itself, such as loaders, onboarding, or celebration effects.
- **Manim (Python):** good for explainer-style animations with diagrams, data and math.
- **ffmpeg pipelines:** putting together image sequences, overlays and transitions.
- **Still frames:** I can generate images for storyboards or key frames, but not the moving video itself.

**One constraint in this project:** your rules say nothing builds locally, so rendering would run in a GitHub Actions job. That job would render the video and upload the MP4 as a build artifact you can download. I wouldn't be able to preview the result myself until CI produces it.

**What I'd need from you:**
1. What the video is for (an in-app animation, a promo or demo clip, a social post, data storytelling).
2. Length, resolution and aspect ratio (for example 15s at 1080×1920 vertical).
3. The content and style: text, data, brand colors, references you like.

If this is meant to be part of the tracker app, it would go through the normal process: an architect plan and a designer plan first, then implementation and a CI render.


What format and length?

30s landscape 1920×1080 (website / YouTube) - 30-second, 1920×1080, graphics-only Remotion ad as a side slice, rendered in CI
(1920×1080, 30 fps) and GitHub Actions rendered it to an MP4




--------


Free licence: individuals, for-profit companies with up to 3 employees, non-profits, and evaluation. Commercial use is allowed under it, so a solo developer or a team of up to three can monetize freely.

Two more things affect whether you can monetize the video:

Fonts: Inter and JetBrains Mono are under the SIL Open Font License, which allows commercial use.
Other content: the video has no stock footage or music, so there are no third-party rights to clear.










Kokoro: free, open source, generated in Cl with no API key (Recommended)

ElevenLabs: best quality, needs a paid plan and an API key added as a GitHub secret

OpenAI TTS: very good, cheap, needs an API key added as a GitHub secret

I'll record my own voice and give you the files








Background music? - 

Voice only

A quiet synth pad generated in code, so there are no licensing issues

I'll supply a royalty-free track I have the rights to




The script -

Use the draft lines above

Have the designer write and time the script

I'll write it myself




Designer - ui frame by frame designing


Research - search for relevant docs, sites for content curation and delivering quality content




