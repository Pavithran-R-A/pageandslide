from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "client" / "public"

IVORY = "#f5f0e6"
CHARCOAL = "#171715"
BURGUNDY = "#7a3040"
GOLD = "#d7c39b"
MUTED = "#777066"
LINE = "#d8d0c2"


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    paths = {
        "serif": "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
        "serif-bold": "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf",
        "sans": "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "sans-bold": "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    }
    return ImageFont.truetype(paths[name], size)


def monogram(draw: ImageDraw.ImageDraw, x: int, y: int, size: int) -> None:
    scale = size / 168
    page = [(x, y), (x + int(118 * scale), y), (x + size, y + int(50 * scale)), (x + size, y + size), (x, y + size)]
    draw.polygon(page, fill=IVORY)
    draw.line(page + [page[0]], fill=LINE, width=max(2, int(2 * scale)))
    draw.line((x + int(118 * scale), y, x + int(118 * scale), y + int(50 * scale), x + size, y + int(50 * scale)), fill="#a98547", width=max(2, int(3 * scale)))
    # Custom geometric S: a single champagne ribbon behind the P, not a font glyph.
    s_points = [(126, 34), (109, 26), (84, 26), (63, 34), (54, 47), (59, 59), (78, 67), (103, 74), (113, 84), (109, 99), (95, 111), (76, 115), (55, 109), (39, 98)]
    draw.line([(x + px * scale, y + py * scale) for px, py in s_points], fill=GOLD, width=max(5, int(12 * scale)), joint="curve")
    # Custom burgundy P: a strong stem and open bowl that locks with the S.
    stem_x = x + int(43 * scale)
    stem_width = max(6, int(15 * scale))
    draw.rectangle((stem_x, y + int(27 * scale), stem_x + stem_width, y + int(139 * scale)), fill=BURGUNDY)
    bowl = (x + int(48 * scale), y + int(27 * scale), x + int(126 * scale), y + int(96 * scale))
    draw.arc(bowl, start=270, end=90, fill=BURGUNDY, width=max(5, int(15 * scale)))
    draw.line((x + int(61 * scale), y + int(62 * scale), x + int(85 * scale), y + int(62 * scale)), fill=BURGUNDY, width=max(5, int(15 * scale)))
    draw.line((x + int(36 * scale), y + int(148 * scale), x + int(132 * scale), y + int(148 * scale)), fill="#a98547", width=max(3, int(3 * scale)))


def make_social() -> None:
    image = Image.new("RGB", (1200, 630), IVORY)
    draw = ImageDraw.Draw(image)
    draw.rectangle((56, 56, 1144, 574), outline=LINE, width=2)
    monogram(draw, 90, 90, 168)
    draw.text((320, 104), "PAGE & SLIDE", fill=CHARCOAL, font=font("serif-bold", 72), spacing=2)
    draw.rectangle((325, 224, 421, 227), fill="#a98547")
    draw.text((92, 337), "PPTs · Reports · Notes · Resumes", fill=BURGUNDY, font=font("sans-bold", 19), spacing=2)
    draw.text((92, 392), "College work,", fill=CHARCOAL, font=font("serif-bold", 58))
    draw.text((92, 458), "professionally presented.", fill=BURGUNDY, font=font("serif-bold", 58))
    footer = "CLEAR PRICING · EDITABLE FILES · DIRECT ORDERING"
    bbox = draw.textbbox((0, 0), footer, font=font("sans", 15))
    draw.text((906 - (bbox[2] - bbox[0]), 540), footer, fill=MUTED, font=font("sans", 15))
    image.save(PUBLIC / "page-and-slide-social.png", optimize=True)


def make_avatar() -> None:
    image = Image.new("RGB", (512, 512), IVORY)
    draw = ImageDraw.Draw(image)
    draw.rectangle((34, 34, 478, 478), outline=LINE, width=4)
    monogram(draw, 112, 112, 288)
    image.save(PUBLIC / "page-and-slide-social-avatar.png", optimize=True)


if __name__ == "__main__":
    make_social()
    make_avatar()
