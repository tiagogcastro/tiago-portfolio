# Cosmic hero implementation

## Current baseline

The V2 hero is a procedural interactive scene, not a generated image or video. Three.js renders the spherical universe, spiral dust, nested membranes, code nucleus, planets, distant galaxies, and abstract plexus avatar. HTML remains responsible for translated copy, controls, capability cards, discoveries, terminal content, and the final topic map.

No external media or generation service is required at runtime. The only audio is synthesized locally with the Web Audio API after the visitor explicitly enables it.

## Visual direction

The scene follows the site palette:

- background: `#141815`
- deep mineral: `#26372e`
- mineral green: `#789987`
- warm accent: `#c9aa70`
- restrained cyan and violet for depth and topic differentiation

The visual hierarchy must keep interface copy readable before adding spectacle. Desktop reserves a quiet area for the introduction while the universe occupies the center and right side. Mobile reorganizes the same content around the available height instead of reproducing the desktop composition at a smaller scale.

## Journey and interaction

Native scrolling drives a `760svh` sticky journey with these stages:

1. introduction and positioning
2. programming
3. cloud
4. data
5. Google visibility
6. product
7. code terminal and process synthesis
8. final universe map

Visitors can rotate selected targets, open keyboard-accessible discoveries, jump between capability chapters, reset the universe, skip to Experience, and enable or mute procedural audio. The final map reconnects every capability to the central source.

The global header appears after the visitor leaves the hero. Social links and the audio control remain available inside the scene without replacing the primary journey.

## Responsive and accessibility requirements

- Vertical touch scrolling must remain native.
- Controls and discoveries must work with keyboard input.
- Escape and outside click close transient UI.
- `prefers-reduced-motion` and viewports shorter than 541 px use an unpinned readable layout.
- Hidden stages must not remain focusable or exposed as active content to assistive technology.
- Rendering pauses while offscreen or in a hidden tab.
- Sustained slow frames reduce pixel density.
- A CSS fallback preserves the composition when WebGL is unavailable.
- Text, labels, and accessible names stay synchronized across all three locale files.

## Performance constraints

- Keep the first render independent of downloaded video or audio.
- Avoid large texture sets unless they produce a clear visual improvement.
- Prefer procedural geometry and local assets with explicit ownership or licenses.
- New effects must be tested on desktop, mobile, short screens, reduced motion, and low-power hardware.
- Interaction must never block access to the rest of the landing page.

## Future exploration

A later design phase may explore a more navigable cosmic experience, such as piloting a small craft, discovering hidden systems, completing lightweight objectives, or finding easter eggs. This is intentionally not specified as part of V2. Before implementation, it needs a separate plan covering interaction model, controls, narrative purpose, mobile behavior, accessibility, performance budgets, fallback behavior, and how quickly a visitor can still reach the portfolio content.

Any game-like layer should strengthen the professional story rather than turn the hero into an unrelated mini-game.
