# Cosmic hero: asset specification

## Current implementation

The hero is a working procedural scene, not an AI-generated render. Three.js draws a luminous spherical universe, spiral dust, nested membranes, a pulsing code nucleus and an articulated plexus avatar. Scroll moves the camera physically through world-space layers. Cards are HTML projected from world-space anchors, rather than independently sliding across the screen. CSS provides a fallback orb without WebGL. Optional sound is synthesized locally with Web Audio; no audio files or external services are required.

## Art direction

Dark green/charcoal (#141815), muted gold (#c9aa70), sage (#789987). Restrained cyan and violet may be introduced in rendered artwork. The galaxy is the central source connecting programming, cloud, data, SEO and product. Desktop: empty left copy area, galaxy center-right, abstract figure at right. Mobile: galaxy in upper half, copy beneath.

## Generation prompt

Abstract cinematic sci-fi environment for a cloud developer portfolio. Ultra-dark green and charcoal space, muted gold and sage spiral galaxy, soft cyan and deep violet dust accents. Central luminous nucleus, fine orbital threads, atmospheric depth, restrained bloom. Abstract human figure at right made from glowing wireframe plexus, illuminated nodes, no facial features. Left 45 percent remains dark and quiet for readable interface text. Sophisticated technical editorial aesthetic, no words, no logos, no watermarks, no baked-in UI. Perspective suitable for a slow camera approach. Deliver landscape 16:9 composition and separately composed portrait 9:16 version.

## Separate deliverables

1. Background nebula plate, without galaxy or figure, 2560x1440 and 1080x1920. AVIF/WebP, target under 500 KB each.
2. Galaxy dust layer with transparent background, no text or UI. Preserve the bright nucleus and feathered edges. WebP/PNG source plus optimized web export.
3. Figure independently rendered with alpha, or a licensed GLB mesh with unlit emissive/wireframe-compatible geometry. Target under 1 MB after optimization.
4. Optional 8-12 second seamless dust loop, fixed camera, no cuts. WebM and MP4, muted, target under 3 MB. Export a matching still poster.

Image-generation tools generally deliver raster images, not editable 3D models or reliable independent layers. Generate layers separately or finish them in a 3D/compositing tool. These assets have not yet been generated.

## Integration constraints

Keep text, translated labels, terminal and cards in HTML. Do not bake them into the artwork. Preserve procedural interactive layers and camera motion. Test blending and alignment at the start and end of the zoom. Load a still first; defer optional video. Supply source/license information with assets. Keep all assets local, with no runtime dependency on a generation service.

## Behavior

Native scrolling drives a 1000svh sticky scene, extended from the initial six-screen draft to give each capability a full reading interval. The timeline contains an introduction, five capability stops, the code terminal and a final outward camera movement revealing the whole universe. Each stop keeps the camera nearly stationary for most of its interval before flying into the next layer. The prior headline fades before the first card, and cards do not overlap in their opacity windows.

Drag the scene to rotate the selected target: universe, code heart, avatar or orbital rings. Vertical touch scrolling remains native. The center-universe button restores all orientations. Pointer hover adds subtle parallax. Cards remain attached to their world positions. The nucleus and avatar share a slow breathing cycle, with no repeated shockwave rings or flashing cursor.

Twenty-five distant galaxies add depth: seven dense formations and eighteen smaller ones. Five deep-space planets and two interactive planets sit beyond the main orb. Coherent cyan and violet pigment patches and soft nebula clouds enrich the dust. HTML hotspots follow projected 3D positions and stay faint until hover, focus or selection. Discoveries are compact anchored popovers, with no modal backdrop or focus trap. They close on Escape or outside click. Clicking empty space has no side effects. Discoveries also work through the keyboard-accessible explorer menu. The topic map jumps directly to a capability and resets orientation; only Explore remains in this navigation during the final stage. The skip action leads to Experience; the global header appears as the visitor leaves the hero. TikTok links to the confirmed profile @tiago.gcastro beside GitHub and LinkedIn.

The five segments inside each capability card fill progressively during its reading interval. The terminal uses plain-language process steps. A shared logo/name lockup rises from the core into the finale. Final cards connect to the visible source through SVG paths measured from their actual responsive positions, and can take visitors back to a capability.

The avatar uses a continuous head and torso profile, jointed limbs, articulated fingers, shaded inner surfaces, fine wire mesh, rib contours, surface data paths and illuminated nodes. It is a procedural abstract avatar, not a scan or a personalized 3D likeness.

Reduced motion and viewports shorter than 541px use an unpinned readable layout, including all capability cards and the final synthesis. Rendering pauses offscreen and in hidden tabs; sustained slow frames reduce pixel density. Sound starts only after the sound button is pressed, and is disabled when the tab becomes hidden. WebGL context restoration resumes the scene.

Audio is an original procedural 74 BPM lo-fi instrumental: four warm seventh-chord voicings, occasional melody, short bass notes, soft kick and filtered brush/hat percussion. An audio-clock lookahead scheduler adds light swing without depending on render frames. Individual envelopes, a low-pass filter, stereo convolution tail, compressor and adjustable master volume keep it restrained. There is no continuous bass drone or noise loop. Its lifecycle is independent of React's sound-button state. All visible copy and accessible labels are translated in the three message files.
