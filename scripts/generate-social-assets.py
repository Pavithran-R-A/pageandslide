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
    draw.rectangle((x, y, x + size, y + size), fill=CHARCOAL)
    scale = size / 168
    draw.text((x + 34 * scale, y + 29 * scale), "S", fill=BURGUNDY, font=font("serif-bold", int(83 * scale)), stroke_width=0)
    draw.text((x + 66 * scale, y + 21 * scale), "B", fill=GOLD, font=font("serif-bold", int(83 * scale)), stroke_width=0)


def make_social() -> None:
    image = Image.new("RGB", (1200, 630), IVORY)
    draw = ImageDraw.Draw(image)
    draw.rectangle((56, 56, 1144, 574), outline=LINE, width=2)
    monogram(draw, 90, 90, 168)
    draw.text((320, 104), "SOFTBAZZAR", fill=CHARCOAL, font=font("serif-bold", 72), spacing=2)
    draw.rectangle((325, 224, 421, 227), fill="#a98547")
    draw.text((92, 337), "PRESENTATIONS · REPORTS · NOTES · RESUMES", fill=BURGUNDY, font=font("sans-bold", 19), spacing=2)
    draw.text((92, 392), "College work,", fill=CHARCOAL, font=font("serif-bold", 58))
    draw.text((92, 458), "professionally presented.", fill=BURGUNDY, font=font("serif-bold", 58))
    footer = "CLEAR PRICING · EDITABLE FILES · DIRECT ORDERING"
    bbox = draw.textbbox((0, 0), footer, font=font("sans", 15))
    draw.text((906 - (bbox[2] - bbox[0]), 540), footer, fill=MUTED, font=font("sans", 15))
    image.save(PUBLIC / "softbazzar-social.png", optimize=True)


def make_avatar() -> None:
    image = Image.new("RGB", (512, 512), IVORY)
    draw = ImageDraw.Draw(image)
    draw.rectangle((34, 34, 478, 478), outline=LINE, width=4)
    monogram(draw, 112, 112, 288)
    image.save(PUBLIC / "softbazzar-social-avatar.png", optimize=True)


if __name__ == "__main__":
    make_social()
    make_avatar()
