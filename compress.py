import os
from PIL import Image

# Use your images folder inside SAREEKRAFT WEBSITE
input_folder = "images"
output_folder = "optimized_images"

os.makedirs(output_folder, exist_ok=True)

QUALITY = 70  # Adjust between 10–95

extensions = (".jpg", ".jpeg", ".png", ".webp", ".bmp")

# Loop through ALL subfolders (casual wear, cotton sarees, etc.)
for root, dirs, files in os.walk(input_folder):
    for filename in files:
        if filename.lower().endswith(extensions):

            input_path = os.path.join(root, filename)

            # Keep same subfolder structure in output
            relative_path = os.path.relpath(root, input_folder)
            output_subfolder = os.path.join(output_folder, relative_path)
            os.makedirs(output_subfolder, exist_ok=True)

            output_path = os.path.join(output_subfolder, filename)

            try:
                img = Image.open(input_path)
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")

                img.save(output_path, optimize=True, quality=QUALITY)

                print(f"Compressed: {input_path} → {output_path}")

            except Exception as e:
                print(f"Error: {filename} → {e}")

print("\n🎉 DONE! All images compressed into the 'optimized_images' folder.")
