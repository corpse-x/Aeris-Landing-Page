from pathlib import Path
import subprocess
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'public/assets/aeris'
SOURCE = Path('/home/kali/.codex/generated_images/01a1336e-74d0-7c52-bfe0-1a127095f6cd')
MEDIA = [
    ('hero', 'exec-478df32b-a452-4b70-bc1b-ce4fa8378d12.png', 'atmosphere'),
    ('about', 'exec-11673a3c-529d-4d16-83cd-a3628ecd28a2.png', 'clouds'),
    ('sensor', 'exec-51fb9d0d-efcf-4dca-9ca6-612c85126f75.png', 'field'),
    ('radar', 'exec-c01d0cf2-b65a-434d-ba0d-3757a8ff7768.png', 'close'),
]

for name, source, suffix in MEDIA:
    target = ASSETS / f'aeris-{name}-{suffix}.mp4'
    if name == 'radar':
        filters = 'scale=1000:1000,rotate=0.025*sin(2*PI*t/10):c=black,crop=720:720'
    else:
        filters = f'scale=1408:792,crop=1280:720:x=64+30*sin(2*PI*t/10):y=36+18*cos(2*PI*t/10)'
    subprocess.run([
        'ffmpeg', '-y', '-loglevel', 'error', '-loop', '1', '-framerate', '24',
        '-i', str(SOURCE / source), '-vf', filters, '-t', '10', '-an',
        '-c:v', 'libx264', '-preset', 'fast', '-crf', '25', '-pix_fmt', 'yuv420p',
        '-threads', '2', '-movflags', '+faststart', str(target),
    ], check=True)
    subprocess.run([
        'ffmpeg', '-y', '-loglevel', 'error', '-i', str(target), '-frames:v', '1',
        '-c:v', 'libwebp', '-quality', '88', str(ASSETS / f'aeris-{name}-poster.webp'),
    ], check=True)
    print(f'Created {target.name}', flush=True)

subprocess.run([
    'ffmpeg', '-y', '-loglevel', 'error', '-i', str(SOURCE / 'exec-5bc29e96-b46c-416b-990f-4f5d01adb4d4.png'),
    '-vf', 'scale=1920:1280', '-frames:v', '1', '-c:v', 'libwebp', '-quality', '90',
    str(ASSETS / 'aeris-trace-topography.webp'),
], check=True)

font_path = ASSETS / 'fonts/jetbrains-mono.ttf'
font = TTFont(font_path)
font.flavor = 'woff2'
font.save(ASSETS / 'fonts/jetbrains-mono.woff2')

patterns = {
    'A': ['01110','10001','10001','11111','10001','10001','10001'],
    'C': ['01111','10000','10000','10000','10000','10000','01111'],
    'D': ['11110','10001','10001','10001','10001','10001','11110'],
    'R': ['11110','10001','10001','11110','10100','10010','10001'],
    'S': ['01111','10000','10000','01110','00001','00001','11110'],
    'T': ['11111','00100','00100','00100','00100','00100','00100'],
    'W': ['10001','10001','10001','10101','10101','11011','10001'],
    'L': ['10000','10000','10000','10000','10000','10000','11111'],
    'a': ['00000','00000','01110','00001','01111','10001','01111'],
    'd': ['00001','00001','01111','10001','10001','10001','01111'],
    'e': ['00000','00000','01110','10001','11111','10000','01111'],
    'h': ['10000','10000','11110','10001','10001','10001','10001'],
    'i': ['00100','00000','01100','00100','00100','00100','01110'],
    'n': ['00000','00000','11110','10001','10001','10001','10001'],
    'p': ['00000','00000','11110','10001','11110','10000','10000'],
    'r': ['00000','00000','10110','11001','10000','10000','10000'],
    't': ['00100','00100','11111','00100','00100','00101','00010'],
    'y': ['00000','00000','10001','10001','01111','00001','11110'],
    '0': ['01110','10001','10011','10101','11001','10001','01110'],
    '1': ['00100','01100','00100','00100','00100','00100','01110'],
    '4': ['00010','00110','01010','10010','11111','00010','00010'],
    '/': ['00001','00001','00010','00100','01000','10000','10000'],
    '.': ['00000','00000','00000','00000','00000','00000','00100'],
    ' ': ['00000'] * 7,
}
builder = FontBuilder(1000, isTTF=True)
glyph_names = ['.notdef'] + [f'uni{ord(character):04X}' for character in patterns]
builder.setupGlyphOrder(glyph_names)
builder.setupCharacterMap({ord(character): f'uni{ord(character):04X}' for character in patterns})
glyphs = {'.notdef': TTGlyphPen(None).glyph()}
metrics = {'.notdef': (600, 0)}
for character, rows in patterns.items():
    pen = TTGlyphPen(None)
    for row_index, row in enumerate(rows):
        for column, value in enumerate(row):
            if value != '1':
                continue
            for sub_y in range(2):
                for sub_x in range(2):
                    center_x = 48 + column * 100 + sub_x * 45
                    center_y = 725 - row_index * 100 - sub_y * 45
                    radius = 15
                    pen.moveTo((center_x + radius, center_y))
                    pen.qCurveTo((center_x + radius, center_y + radius), (center_x, center_y + radius))
                    pen.qCurveTo((center_x - radius, center_y + radius), (center_x - radius, center_y))
                    pen.qCurveTo((center_x - radius, center_y - radius), (center_x, center_y - radius))
                    pen.qCurveTo((center_x + radius, center_y - radius), (center_x + radius, center_y))
                    pen.closePath()
    name = f'uni{ord(character):04X}'
    glyphs[name] = pen.glyph()
    metrics[name] = (330 if character == ' ' else 575, 33)
builder.setupGlyf(glyphs)
builder.setupHorizontalMetrics(metrics)
builder.setupHorizontalHeader(ascent=820, descent=-180)
builder.setupNameTable({'familyName': 'Aeris Dot Display', 'styleName': 'Regular', 'uniqueFontIdentifier': 'AerisDotDisplay-Regular', 'fullName': 'Aeris Dot Display Regular', 'psName': 'AerisDotDisplay-Regular'})
builder.setupOS2(sTypoAscender=820, sTypoDescender=-180, usWinAscent=820, usWinDescent=180)
builder.setupPost()
builder.font.flavor = 'woff2'
builder.save(ASSETS / 'fonts/aeris-dot-display.woff2')
print('Created local fonts and topography', flush=True)
