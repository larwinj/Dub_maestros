from PIL import Image, ImageDraw, ImageFont
import numpy as np
import json
import cv2

def subtittle():
    print("Start Embleding subtittle")
    video_path = r'L:\CMR\Backend\out\video.mp4'
    cap = cv2.VideoCapture(video_path)

    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    output_path = r'L:\CMR\Backend\out\output_video.mp4'
    out = cv2.VideoWriter(output_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (frame_width, frame_height))

    font_path = r'Nirmala.ttf'
    font_size = 20
    font = ImageFont.truetype(font_path, font_size)
    json_path = r'L:\CMR\Backend\out\result2.json'

    with open(json_path, 'r', encoding='utf-8') as f:
        words_data = json.load(f)

    for i in range(total_frames):
        ret, frame = cap.read()
        if not ret:
            break

        frame_pil = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
        draw = ImageDraw.Draw(frame_pil)

        for word_data in words_data:
            if word_data['start'] * fps <= i < word_data['end'] * fps:
                bottom_center_x = int(frame_width / 2)
                bottom_center_y = frame_height - 100  
                draw.text((bottom_center_x, bottom_center_y), word_data['word'], fill=(255, 255, 255), font=font, anchor='mm')

        out.write(cv2.cvtColor(np.array(frame_pil), cv2.COLOR_RGB2BGR))

    cap.release()
    out.release()
    print("subtittle completed")
