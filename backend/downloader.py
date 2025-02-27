import sys
import os
import yt_dlp

# Define the downloads folder
DOWNLOAD_FOLDER = "downloads"

# Ensure the folder exists
if not os.path.exists(DOWNLOAD_FOLDER):
    os.makedirs(DOWNLOAD_FOLDER)

def download_video(url, resolution):
    try:
        ydl_opts = {
            "format": f"bestvideo[height<={resolution}]+bestaudio/best",
            "outtmpl": os.path.join(DOWNLOAD_FOLDER, "%(title)s.%(ext)s"),
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            filename = ydl.prepare_filename(info)
            print(filename)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    url = sys.argv[1]
    resolution = sys.argv[2] if len(sys.argv) > 2 else "720"
    download_video(url, resolution)
