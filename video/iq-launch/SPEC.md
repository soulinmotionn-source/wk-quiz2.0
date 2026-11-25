# SPEC: WKQuiz brain test launch clip

GOAL:    A scroller stops, tries the puzzle in their head, and types wkquiz.com/iq into a browser before the video ends.

OUTPUT:  HyperFrames, 1080 x 1920 (9:16), 30 fps, MP4. For TikTok, Instagram Reels and YouTube Shorts.
TIME:    30 s x 30 fps = 900 frames. Music at 120 BPM: 1 beat = 15 frames, 1 bar = 60 frames. Every cut lands on a beat; layout changes on a bar.

LOOK:    Medium = chunky sticker UI, the same rules as the site's buttons (flat colour, thick ink outline, hard offset shadow, no gradients, no glow).
  - Grounds (flat, one per shot, never a gradient): indigo #3F2FD0, orange #FF6A2B, lilac #F7F5FF, ink #1B1740.
  - Ink: #1B1740 for outlines and all text on light grounds; white #FFFFFF for text on indigo, orange and ink grounds.
  - Accent: orange #FF6A2B on lit puzzle cells, the winning option and the CTA ground. One accent per shot.
  - Cards: white, 56 px radius, 8 px ink outline, hard shadow 18 px right and 18 px down in ink at 100%, no blur.
  - Type: Inter 900 for headlines at 150 px with -3% tracking and 0.95 line height. Inter 800 captions at 64 px. Max 5 words per line.
  - Texture: none. Grain 0%, vignette 0%. Flat colour is the look.
  - Mascot "Wiz" (the site's SVG creature, 360 px tall) in indigo or orange with moods: thinking, cheer, sad.

OBJECTS:
  - Puzzle card: the real site puzzles, exported from the test's own generator as SVG, so the video shows what people will actually get. Mirror puzzle: one original figure on top (240 px), a 3 x 2 grid of six option figures below (each 280 px), lit cells orange with a 5 px ink outline and rounded corners.
  - Countdown: a ring 220 px wide with a number inside (Inter 900, 150 px) that slams from 140% to 100% scale in 6 frames each second.
  - Score card: the real share card layout (score, title, six skill bars) as a white sticker card 900 px wide.
  - Two score cards for the challenge shot: "Sam 121" and "You ?" side by side on a diagonal.
  - Phone UI is NOT drawn. The video shows the puzzle, not a phone.

MOTION:
  - Enter: spring on scale 0.8 to 1, damping 0.55, 12 frames. Position moves ease out cubic 10 frames. Opacity is never animated on its own.
  - Reveal (correct option): scale 1 to 1.12 and back, damping 0.45; the other five options drop to 25% opacity over 8 frames.
  - Exit: hard cut on the beat, with the new ground colour already on screen. No fades, no slides out.
  - Camera: one 18-frame push (scale 1 to 1.06) on the reveal. Nothing else moves the camera.
  - Count-up: score runs 0 to 124 over 36 frames, ease out quart.

SHOTS (frame ranges, hero move, what the viewer reads, sound, hand-off):
  1.   0-150  HOOK. Indigo ground. Mirror puzzle card fills 1100 px of height; headline "SOLVE IT IN 5 SECONDS" (3 lines, 150 px) above it at y 190-560 inside the safe band. Frame 0 already shows the card and headline (this is the thumbnail). Countdown ring bottom-right of the card counts 5, 4, 3, 2, 1, one number per 30 frames. Sound: tick on every number, music starts at frame 0. Hand-off: on the last tick the ring turns orange and the music drops for 6 frames.
  2. 150-240  REVEAL. Same card. Correct option springs up with the orange ring, the five others dim. Wiz appears (cheer) on the card's corner. Text line: "MIRROR IT LEFT TO RIGHT" (2 lines). Sound: ding at 150, whoosh at 232. Hand-off: cut on the beat to shot 3.
  3. 240-420  SPEED ROUND. Three puzzle cards, 60 frames each, each on its own ground (orange, lilac, indigo): rotation series, counting ("HOW MANY STRIPED TRIANGLES?"), shape series. A one-word tag on each (SPATIAL, PATTERN, PATTERN) in Inter 900 at 96 px. After the third, a 60-frame beat with the line "21 PUZZLES. NEW EVERY TIME." Sound: a pop on each cut, hi-hat doubles in the last bar.
  4. 420-600  RESULT. Lilac ground. Score card slams in from 140% scale; score counts up 0 to 124; six skill bars fill in order, 6 frames apart. Line "INSTANT RESULTS. FREE." under the card. A small "Example result" label at 40 px under the card (it is an illustration, not a real person's score). Sound: pop at 420, rising bar ticks, ding when the count lands.
  5. 600-750  CHALLENGE. Ink ground. Two score cards slide in on a diagonal: "SAM 121" and "YOU ?". Line "SEND A FRIEND THE SAME PUZZLES" (3 lines, 120 px). Sound: whoosh at 600, a risen synth note building to the CTA.
  6. 750-900  CTA. Orange ground (the only full-orange shot). "WKQUIZ.COM/IQ" at 190 px, 2 lines, centred at y 640. Under it "FREE. NO SIGN-UP." at 96 px. Wiz cheers at the bottom of the band. The last 60 frames hold still (end card for screenshots and replays). Sound: music resolves on the downbeat at 750, silence at the final frame. No loop back to frame 0.

SAFE ZONE (TikTok and Reels UI): nothing in the top 168 px; all words and the puzzles inside 168 to 1330 px; below 1330 px only plain colour or Wiz's lower body; no text under the right-hand action rail (the right 150 px, between y 700 and 1500).

CLAIMS (what the video may and may not say):
  - Says "brain test" and "IQ-style". Never says it measures real IQ, never claims a percentile or "only X% can solve this".
  - The example score card is labelled "Example result".
  - The URL shown is the short link people can type, wkquiz.com/iq.

AUDIO:   One royalty-free upbeat instrumental at 120 BPM, about 30 s, plus ticks, ding, whooshes and pops. No voice. Music peaks at -14 LUFS, effects 4 dB above the music.
CAPTIONS: There is no speech, so the on-screen lines above ARE the captions: Inter 800, 64 to 150 px, max 5 words per line, always inside the safe band, on screen at least 0.5 s plus 0.3 s a word.

BANNED (the defaults this film must not become):
  - a dark void ground with small items floating in it; glow, bloom, neon or lens flares; floating particles;
  - purple or blue gradients, mesh gradients, glass cards;
  - a cream paper ground with serif type, italic accent words, "01 / 02" labels, small monospace caps or pill chips;
  - everything centred and fading in at once; every element fading and sliding up; titles that drift after they land;
  - corner labels, frame borders, HUD readouts as decoration;
  - three cards in a row, KPI grids, a title over a dimmed screenshot;
  - the logo docked in a corner. The site name appears once, in the URL on the last shot.

QA:      Frames to check after render: 0 (thumbnail: puzzle and headline readable, nothing in the top 168 px), 60 (countdown at 4), 150 (correct option clear), 330 (counting puzzle readable at phone size), 540 (all six bars filled, count shows 124), 690 (both cards legible), 899 (end card holds, URL inside the safe band).
