import os
from PIL import Image, ImageDraw, ImageFont

sizes = [
    ("public/icon-48.png", 48),
    ("public/icon-192.png", 192),
    ("public/apple-touch-icon.png", 180),
    ("public/icon.png", 512),
    ("public/favicon.png", 64),
]

os.makedirs("public", exist_ok=True)
os.makedirs("app", exist_ok=True)

for path, dim in sizes:
    img = Image.new("RGBA", (dim, dim), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Rounded dark background
    radius = int(dim * 0.22)
    bg_color = (10, 10, 11, 255) # #0a0a0b
    draw.rounded_rectangle([0, 0, dim - 1, dim - 1], radius=radius, fill=bg_color)
    
    # Inner border (hairline glow)
    draw.rounded_rectangle([1, 1, dim - 2, dim - 2], radius=radius, outline=(242, 240, 234, 40), width=max(1, int(dim * 0.015)))

    # Brand mark: "MC" monogram or crisp geometric lines + accent dot
    # Let's draw high-contrast "MC" text or geometric mark
    try:
        # Try loading a clean sans-serif font, or fallback to drawn geometric letters
        font_size = int(dim * 0.42)
        font = ImageFont.truetype("arial.ttf", font_size)
        text = "MC"
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        tx = (dim - tw) // 2 - int(dim * 0.04)
        ty = (dim - th) // 2 - int(dim * 0.05)
        
        # Text "MC" in white/cream #f2f0ea
        draw.text((tx, ty), text, fill=(242, 240, 234, 255), font=font)
        
        # Accent orange dot #ff4d00 at top right of C
        dot_r = max(2, int(dim * 0.06))
        dot_cx = tx + tw + int(dim * 0.02)
        dot_cy = ty + int(dim * 0.1)
        draw.ellipse([dot_cx - dot_r, dot_cy - dot_r, dot_cx + dot_r, dot_cy + dot_r], fill=(255, 77, 0, 255))
    except Exception as e:
        print(f"Fallback geometry for {dim}: {e}")
        # Geometric fallback: vertical line + orange dot
        lw = max(2, int(dim * 0.06))
        draw.line([(int(dim*0.3), int(dim*0.25)), (int(dim*0.3), int(dim*0.75))], fill=(242, 240, 234, 255), width=lw)
        dot_r = max(3, int(dim * 0.1))
        draw.ellipse([(int(dim*0.7) - dot_r, int(dim*0.7) - dot_r, int(dim*0.7) + dot_r, int(dim*0.7) + dot_r)], fill=(255, 77, 0, 255))
        
    img.save(path, "PNG")

# Generate favicon.ico containing 16x16, 32x32, 48x48
img_48 = Image.open("public/icon-48.png")
img_48.save("public/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
img_48.save("app/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])

print("All favicons generated successfully!")
