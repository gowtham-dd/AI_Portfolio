import os
from PIL import Image

def convert_png_to_webp():
    img_dir = os.path.abspath("static/assets/images")
    if not os.path.exists(img_dir):
        print(f"Directory {img_dir} does not exist.")
        return

    files = [f for f in os.listdir(img_dir) if f.lower().endswith(".png")]
    print(f"Found {len(files)} PNG images to convert.")
    
    total_saved = 0
    for filename in files:
        png_path = os.path.join(img_dir, filename)
        webp_name = os.path.splitext(filename)[0] + ".webp"
        webp_path = os.path.join(img_dir, webp_name)
        
        # Load and convert image
        try:
            with Image.open(png_path) as img:
                # Save as WebP with optimized quality
                img.save(webp_path, "WEBP", quality=80, optimize=True)
                
            png_size = os.path.getsize(png_path)
            webp_size = os.path.getsize(webp_path)
            saved = png_size - webp_size
            total_saved += saved
            print(f"Converted {filename} ({png_size/1024:.1f} KB) -> {webp_name} ({webp_size/1024:.1f} KB) | Saved: {saved/1024:.1f} KB ({(saved/png_size)*100:.1f}%)")
            
            # Remove original PNG to save git space
            os.remove(png_path)
            print(f"Removed original PNG: {filename}")
        except Exception as e:
            print(f"Failed to convert {filename}: {e}")
            
    print(f"\nDone! Total disk space saved: {total_saved/(1024*1024):.2f} MB")

if __name__ == "__main__":
    convert_png_to_webp()
