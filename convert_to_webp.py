import os
from PIL import Image

# Input folder (your original images)
input_folder = "images"

# Output folder (WebP images)
output_folder = "webp_images"
os.makedirs(output_folder, exist_ok=True)

# Supported formats
extensions = (".jpg", ".jpeg", ".png", ".bmp")

# Quality (1–100)
QUALITY = 80

for root, dirs, files in os.walk(input_folder):
    for filename in files:
        if filename.lower().endswith(extensions):

            input_path = os.path.join(root, filename)

            # Keep same folder structure
            relative_path = os.path.relpath(root, input_folder)
            output_subfolder = os.path.join(output_folder, relative_path)
            os.makedirs(output_subfolder, exist_ok=True)

            # Change file extension to .webp
            output_filename = os.path.splitext(filename)[0] + ".webp"
            output_path = os.path.join(output_subfolder, output_filename)

            try:
                img = Image.open(input_path)

                # Convert RGBA or P images to RGB
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")

                img.save(output_path, "webp", quality=QUALITY, optimize=True)

                print(f"Converted: {input_path} → {output_path}")

            except Exception as e:
                print(f"Error converting {filename}: {e}")

print("\n🎉 Conversion complete! All WebP images saved in 'webp_images' folder.")
