import os
import shutil
import fitz # PyMuPDF

source_pdf = r"C:\Users\MERT\Desktop\Sertifikalar ve CV\Mert Ceren — Özgeçmiş.pdf"
dest_pdf = r"public\Mert_Ceren_CV.pdf"
dest_jpg = r"public\Mert_Ceren_CV.jpg"

os.makedirs("public", exist_ok=True)

if os.path.exists(source_pdf):
    # Copy PDF to public/
    shutil.copy2(source_pdf, dest_pdf)
    print(f"Copied PDF to {dest_pdf}")
    
    # Render page 1 as high-res JPG
    doc = fitz.open(source_pdf)
    page = doc.load_page(0) # page 1
    pix = page.get_pixmap(dpi=200) # 200 DPI high resolution
    pix.save(dest_jpg)
    print(f"Saved CV preview image to {dest_jpg}")
else:
    print(f"File not found: {source_pdf}")
