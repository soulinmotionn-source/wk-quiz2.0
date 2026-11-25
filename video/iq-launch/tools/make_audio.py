"""
Synthesises the launch video's soundtrack and sound effects from scratch (numpy only):
a 120 BPM bed in A minor / C major plus effects timed to the picture.
Run:  python tools/make_audio.py   ->  assets/audio/soundtrack.wav
"""
import os
import wave
import numpy as np

SR = 44100
DUR = 30.0
N = int(SR * DUR)
BPM = 120
BEAT = 60.0 / BPM  # 0.5 s
rng = np.random.default_rng(7)
L = np.zeros(N)
R = np.zeros(N)


def add(sig, t0, gain=1.0, pan=0.0):
    i = int(round(t0 * SR))
    if i >= N or i < 0:
        return
    j = min(N, i + len(sig))
    seg = sig[: j - i] * gain
    ang = (pan + 1) * np.pi / 4
    L[i:j] += seg * np.cos(ang)
    R[i:j] += seg * np.sin(ang)


def T(d):
    return np.arange(int(d * SR)) / SR


def noise(d):
    return rng.standard_normal(int(d * SR))


def hp(x):  # crude high-pass: the difference of neighbouring samples
    return np.diff(x, prepend=0.0)


# ------------------------------------------------------------------ drums
def kick():
    t = T(0.38)
    f = 46 + 130 * np.exp(-t / 0.028)
    ph = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(ph) * np.exp(-t / 0.15)
    click = hp(noise(0.38)) * np.exp(-t / 0.004) * 0.35
    return (body + click) * np.minimum(1, t / 0.002)


def clap():
    t = T(0.28)
    s = np.zeros_like(t)
    for off in (0.0, 0.011, 0.022):
        k = int(off * SR)
        s[k:] += hp(noise(0.28))[: len(t) - k] * np.exp(-t[: len(t) - k] / 0.012)
    s += hp(noise(0.28)) * np.exp(-t / 0.07) * 0.6
    return s * 0.55


def hat(open_=False):
    d = 0.16 if open_ else 0.06
    t = T(d)
    return hp(noise(d)) * np.exp(-t / (0.06 if open_ else 0.014)) * 0.5


def snare():
    t = T(0.2)
    tone = np.sin(2 * np.pi * 190 * t) * np.exp(-t / 0.05)
    return (hp(noise(0.2)) * np.exp(-t / 0.06) * 0.7 + tone * 0.5) * 0.8


# ------------------------------------------------------------- instruments
def pluck(f, d=0.45, tau=0.2):
    t = T(d)
    s = (
        np.sin(2 * np.pi * f * t)
        + 0.5 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t / (tau * 0.5))
        + 0.22 * np.sin(2 * np.pi * 3 * f * t) * np.exp(-t / (tau * 0.3))
    )
    return s * np.exp(-t / tau) * np.minimum(1, t / 0.004)


def bass(f, d=0.4):
    t = T(d)
    s = sum(np.sin(2 * np.pi * f * k * t) / k for k in range(1, 6))
    return s * np.exp(-t / 0.22) * np.minimum(1, t / 0.006) * 0.6


def lead(f, d=0.5):
    t = T(d)
    s = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * 2 * f * t) + 0.12 * np.sin(2 * np.pi * 3 * f * t)
    return s * np.exp(-t / 0.26) * np.minimum(1, t / 0.008)


def pad(freqs, d):
    t = T(d)
    s = sum(np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * 2 * f * t) for f in freqs) / len(freqs)
    return s * np.minimum(1, t / 0.03) * np.exp(-t / (d * 0.55))


# ------------------------------------------------------------ effect sounds
def tick(f=1900, strong=False):
    t = T(0.06)
    s = np.sin(2 * np.pi * f * t) * np.exp(-t / 0.006) + hp(noise(0.06)) * np.exp(-t / 0.003) * 0.5
    return s * (1.3 if strong else 0.8)


def whoosh(d, f0, f1):
    t = T(d)
    f = f0 * (f1 / f0) ** (t / d)
    ph = 2 * np.pi * np.cumsum(f) / SR
    bell = np.sin(np.pi * t / d) ** 2
    return (np.sin(ph) * 0.35 + hp(noise(d)) * 0.7) * bell


def pop(f0=640, f1=260, d=0.14):
    t = T(d)
    f = f1 + (f0 - f1) * np.exp(-t / 0.03)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t / 0.05) * np.minimum(1, t / 0.002)


def boom():
    t = T(1.6)
    f = 52 + 90 * np.exp(-t / 0.05)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t / 0.55)


def crash(d=1.8):
    t = T(d)
    return hp(noise(d)) * np.exp(-t / 0.5) * 0.45


def riser(d, f0, f1):
    t = T(d)
    f = f0 * (f1 / f0) ** (t / d)
    ph = 2 * np.pi * np.cumsum(f) / SR
    trem = 0.6 + 0.4 * np.sin(2 * np.pi * (5 + 16 * t / d) * t)
    amp = (t / d) ** 1.6
    return (np.sin(ph) * 0.6 + hp(noise(d)) * 0.5) * trem * amp


def success(t0, base=523.25, gain=0.5):
    for k, m in enumerate((1.0, 1.25, 1.5, 2.0)):
        add(pluck(base * m, 0.5, 0.25), t0 + k * 0.075, gain, pan=-0.1 + 0.07 * k)


# ------------------------------------------------------------------- score
A2, F2, C3, G2 = 110.0, 87.31, 130.81, 98.0
CHORDS = [
    (A2, [220.0, 261.63, 329.63, 440.0]),
    (F2, [174.61, 220.0, 261.63, 349.23]),
    (C3, [261.63, 329.63, 392.0, 523.25]),
    (G2, [196.0, 246.94, 293.66, 392.0]),
]
HOOK = [
    [659.25, 587.33, 523.25, 659.25],  # Am: E5 D5 C5 E5
    [698.46, 659.25, 523.25, 440.0],  # F : F5 E5 C5 A4
    [783.99, 659.25, 783.99, 1046.5],  # C : G5 E5 G5 C6
    [587.33, 493.88, 587.33, 783.99],  # G : D5 B4 D5 G5
]
ARP_ORDER = [0, 1, 2, 3, 2, 1, 2, 1]


def section(t):
    if t < 5:
        return 0
    if t < 8:
        return 1
    if t < 15:
        return 2
    if t < 20:
        return 3
    if t < 25:
        return 4
    return 5


K, CL, HC, HO, SN = kick(), clap(), hat(False), hat(True), snare()

for b in range(int(DUR / BEAT)):
    t = b * BEAT
    s = section(t)
    bar = int(t // 2)
    root, tones = CHORDS[bar % 4]
    beat_in_bar = b % 4

    # kick
    if s == 0:
        add(K, t, 0.5)
    elif s in (1, 2, 3, 4):
        add(K, t, 0.95)
    elif s == 5 and t < 29:
        add(K, t, 0.8 if t >= 25 else 0.0)

    # clap / snare on 2 and 4
    if s in (1, 2, 3) and beat_in_bar in (1, 3):
        add(CL, t, 0.8)
    if s == 4 and t < 22 and beat_in_bar in (1, 3):
        add(CL, t, 0.8)
    if s == 5 and 25 <= t < 29 and beat_in_bar in (1, 3):
        add(CL, t, 0.7)

    # hats: open on the offbeat, closed 16ths for energy
    if s in (1, 2, 3, 4) or (s == 5 and t < 29):
        add(HO, t + BEAT / 2, 0.42, pan=0.25)
        if s in (2, 3, 4):
            add(HC, t + BEAT / 4, 0.3, pan=-0.2)
            add(HC, t + 3 * BEAT / 4, 0.3, pan=0.2)
        if s == 3:
            add(HC, t, 0.22, pan=0.1)

    # bass
    if s == 0:
        if beat_in_bar == 0:
            add(bass(root, 0.9), t, 0.7)
    elif s in (1, 2, 3, 4) or (s == 5 and t < 29):
        add(bass(root, 0.4), t, 0.9)
        add(bass(root * 2, 0.3), t + BEAT / 2, 0.55)

    # arpeggio, eighth notes
    if s in (1, 2, 3) or (s == 5 and t < 29):
        for e in range(2):
            idx = ARP_ORDER[(beat_in_bar * 2 + e) % 8]
            add(pluck(tones[idx], 0.35, 0.16), t + e * BEAT / 2, 0.2, pan=-0.35 if e == 0 else 0.35)

    # lead hook, one quarter-note per beat
    if s == 2 or s == 3:
        f = HOOK[bar % 4][beat_in_bar] * (2 if s == 3 else 1)
        add(lead(f, 0.45), t, 0.24 if s == 2 else 0.2, pan=0.05)

# chord accents on every shot change, so the music "hits" with the picture
for hit in (5.0, 8.0, 15.0, 20.0):
    _, tones = CHORDS[int(hit // 2) % 4]
    for f in tones:
        add(pluck(f, 0.6, 0.3), hit, 0.22)

# snare roll that speeds up into the call to action (22 to 25 s)
t = 22.0
gap = 0.25
while t < 25.0:
    add(SN, t, 0.5 + 0.5 * (t - 22.0) / 3.0)
    t += gap
    gap = max(0.0625, gap * 0.9)

# ------------------------------------------------------------ picture sounds
# Shot 1: countdown ticks at 0, 1, 2, 3, 4 s, the last one stronger; ring flash at 4.7 s
for i in range(5):
    add(tick(1500 + 220 * i, strong=(i == 4)), float(i), 0.7)
add(whoosh(0.35, 500, 2600), 4.6, 0.35)

# Shot 2: the answer lands
add(boom()[: int(0.5 * SR)], 5.0, 0.5)
success(5.02, 523.25, 0.55)
add(whoosh(0.3, 400, 3000), 7.75, 0.45)

# Shot 3: speed round, a pop for every change on screen
add(pop(), 8.0, 0.5)
add(pop(900, 400), 8.8, 0.5)  # rotation answer highlights
add(whoosh(0.25, 600, 3000), 9.1, 0.45)
add(pop(), 9.2, 0.5)
for k in range(3):
    add(pop(700 + 120 * k, 380 + 60 * k), 9.9 + k * 0.12, 0.45)  # three triangles circled
add(pluck(1318.5, 0.35, 0.2), 10.3, 0.4)  # "3" lands
add(whoosh(0.25, 600, 3000), 11.1, 0.45)
add(pop(), 11.2, 0.5)
add(pop(1000, 420, 0.2), 11.9, 0.55)  # series answer
add(whoosh(0.25, 600, 3000), 12.7, 0.45)
add(K, 12.8, 1.0)
add(pop(520, 200, 0.18), 12.8, 0.6)

# Shot 4: result card
add(boom()[: int(0.7 * SR)], 15.0, 0.5)
add(crash(0.5), 15.0, 0.25)
for k in range(12):
    add(tick(800 + 80 * k), 15.25 + k * 0.1, 0.45)
add(pluck(1567.98, 0.4, 0.2), 16.5, 0.35)
for k in range(6):
    add(pop(500 + 90 * k, 300 + 40 * k, 0.1), 16.0 + k * 0.2, 0.3)
add(pop(), 16.9, 0.45)
add(pop(700, 280, 0.18), 17.6, 0.6)  # stamp
add(pluck(1046.5, 0.5, 0.3), 17.6, 0.35)
add(pop(900, 400, 0.1), 18.6, 0.3)
add(pop(900, 400, 0.1), 19.2, 0.3)

# Shot 5: challenge
add(whoosh(0.35, 400, 2800), 19.9, 0.5)
add(pop(), 20.0, 0.45)
add(whoosh(0.3, 500, 2600), 20.45, 0.45)
add(pop(520, 200, 0.18), 20.9, 0.55)
add(whoosh(0.3, 500, 2600), 21.05, 0.45)
add(pop(520, 200, 0.18), 21.5, 0.55)
add(pop(1000, 500, 0.2), 21.7, 0.4)
add(riser(3.0, 180, 2600), 22.0, 0.55)

# Shot 6: call to action
add(boom(), 25.0, 0.9)
add(crash(1.6), 25.0, 0.5)
for f in (261.63, 329.63, 392.0, 523.25, 783.99):
    add(pluck(f, 1.6, 0.9), 25.0, 0.32)
add(pad([130.81, 261.63, 329.63, 392.0], 4.2), 25.0, 0.3)
add(pop(), 25.5, 0.5)
success(25.85, 659.25, 0.5)

# ------------------------------------------------------------------ master
# soft clip, gentle fade out in the last second, short fade in to avoid a click
mix = np.stack([L, R], axis=1)
mix = np.tanh(1.1 * mix)
fade = np.ones(N)
fo = int(1.0 * SR)
fade[-fo:] = np.linspace(1, 0, fo) ** 1.5
fade[: int(0.005 * SR)] = np.linspace(0, 1, int(0.005 * SR))
mix *= fade[:, None]
peak = np.max(np.abs(mix))
mix = mix / peak * 0.9

out = os.path.join(os.path.dirname(__file__), "..", "assets", "audio")
os.makedirs(out, exist_ok=True)
path = os.path.abspath(os.path.join(out, "soundtrack.wav"))
pcm = (np.clip(mix, -1, 1) * 32767).astype("<i2")
with wave.open(path, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("wrote", path, f"{N / SR:.1f}s, peak before norm {peak:.2f}")
