# import torch
# import torchaudio
# from moviepy.editor import VideoFileClip
# import whisper
# import numpy as np

# from googletrans import Translator

# model = whisper.load_model("base")

# def videotoaudio(path):
#     clip = VideoFileClip(path)

#     if clip.audio is not None:
#         audio = clip.audio
#         fps = audio.fps
#         duration = audio.duration

#         # audio to PyTorch tensor
#         audio_array = audio.to_soundarray()
#         audio_tensor = torch.tensor(audio_array.T).float()

#         return {"audio": audio_tensor, "fps": fps, "duration": duration}
#     else:
#         print("Video file does not contain audio.")
#         return None

# path_to_video = "virat.mp4"
# audio_info = videotoaudio(path_to_video)

# if audio_info is not None:
#     audio_np = audio_info["audio"].numpy()
#     concatenated_audio = np.concatenate(audio_np, axis=0)
#     result = model.transcribe(concatenated_audio, language='en', fp16=torch.cuda.is_available(), verbose=True)
#     print(result["text"])
# else:
#     print("Failed to extract audio.")


# from googletrans import LANGUAGES

# print("Supported languages in Google Translate:")
# for lang_code, lang_name in LANGUAGES.items():
#     print(f"{lang_name}:{lang_code} ")

# code_mapping = {                                      
#     'afrikaans': 'af',
#     'albanian': 'sq',
#     'amharic': 'am',
#     'arabic': 'ar',
#     'armenian': 'hy',
#     'azerbaijani': 'az',
#     'basque': 'eu',
#     'belarusian': 'be',
#     'bengali': 'bn',
#     'bosnian': 'bs',
#     'bulgarian': 'bg',
#     'catalan': 'ca',
#     'cebuano': 'ceb',
#     'chichewa': 'ny',
#     'chinese': 'zh-cn',
#     'chinese': 'zh-tw',
#     'corsican': 'co',
#     'croatian': 'hr',
#     'czech': 'cs',
#     'danish': 'da',
#     'dutch': 'nl',
#     'english': 'en',
#     'esperanto': 'eo',
#     'estonian': 'et',
#     'filipino': 'tl',
#     'finnish': 'fi',
#     'french': 'fr',
#     'frisian': 'fy',
#     'galician': 'gl',
#     'georgian': 'ka',
#     'german': 'de',
#     'greek': 'el',
#     'gujarati': 'gu',
#     'haitian creole': 'ht',
#     'hausa': 'ha',
#     'hawaiian': 'haw',
#     'hebrew': 'iw',
#     'hindi': 'hi',
#     'hmong': 'hmn',
#     'hungarian': 'hu',
#     'icelandic': 'is',
#     'igbo': 'ig',
#     'indonesian': 'id',
#     'irish': 'ga',
#     'italian': 'it',
#     'japanese': 'ja',
#     'javanese': 'jw',
#     'kannada': 'kn',
#     'kazakh': 'kk',
#     'khmer': 'km',
#     'korean': 'ko',
#     'kurdish': 'ku',
#     'kyrgyz': 'ky',
#     'lao': 'lo',
#     'latin': 'la',
#     'latvian': 'lv',
#     'lithuanian': 'lt',
#     'luxembourgish': 'lb',
#     'macedonian': 'mk',
#     'malagasy': 'mg',
#     'malay': 'ms',
#     'malayalam': 'ml',
#     'maltese': 'mt',
#     'maori': 'mi',
#     'marathi': 'mr',
#     'mongolian': 'mn',
#     'myanmar': 'my',
#     'nepali': 'ne',
#     'norwegian': 'no',
#     'odia': 'or',
#     'pashto': 'ps',
#     'persian': 'fa',
#     'polish': 'pl',
#     'portuguese': 'pt',
#     'punjabi': 'pa',
#     'romanian': 'ro',
#     'russian': 'ru',
#     'samoan': 'sm',
#     'scots gaelic': 'gd',
#     'serbian': 'sr',
#     'sesotho': 'st',
#     'shona': 'sn',
#     'sindhi': 'sd',
#     'sinhala': 'si',
#     'slovak': 'sk',
#     'slovenian': 'sl',
#     'somali': 'so',
#     'spanish': 'es',
#     'sundanese': 'su',
#     'swahili': 'sw',
#     'swedish': 'sv',
#     'tajik': 'tg',
#     'tamil': 'ta',
#     'telugu': 'te',
#     'thai': 'th',
#     'turkish': 'tr',
#     'ukrainian': 'uk',
#     'urdu': 'ur',
#     'uyghur': 'ug',
#     'uzbek': 'uz',
#     'vietnamese': 'vi',
#     'welsh': 'cy',
#     'xhosa': 'xh',
#     'yiddish': 'yi',
#     'yoruba': 'yo',
#     'zulu': 'zu'
# }

# # print(code_mapping["english"])

# # import json

# # # Read JSON file with UTF-8 encoding
# # with open(r'L:\SIH\Backend\out\result2.json', 'r', encoding='utf-8') as file:
# #     data = json.load(file)

# # # Write JSON file with UTF-8 encoding
# # with open(r'L:\SIH\Backend\out\result2.json', 'w', encoding='utf-8') as file:
# #     json.dump(data, file, ensure_ascii=False, indent=4)


# # powershell -Command "(Get-Content 'C:\Program Files\ImageMagick-7.1.1-Q16-HDRI\policy.xml') -replace 'none', 'read,write' | Set-Content 'C:\Program Files\ImageMagick-7.1.1-Q16-HDRI\policy.xml'"
# # --------------------------------------------------------------------------------------------

# # import os
# # def delete_files_in_folder(folder_path):
# #     [os.remove(os.path.join(folder_path, file_name)) for file_name in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path,file_name))]

# # delete_files_in_folder(r'L:\SIH\Backend\out')
# # ----------------------------------------------------------------------------------------

# import cv2
# from PIL import Image, ImageDraw, ImageFont
# import numpy as np
# import json


# def subtittle():
#     video_path = r'L:\SIH\VIDEOSSSS\input_video.mp4'
#     cap = cv2.VideoCapture(video_path)

#     frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
#     frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
#     fps = int(cap.get(cv2.CAP_PROP_FPS))
#     total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

#     output_path = r'L:\SIH\outputttvideo.mp4'
#     out = cv2.VideoWriter(output_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (frame_width, frame_height))

#     font_path = r'Nirmala.ttf'
#     font_size = 12
#     font = ImageFont.truetype(font_path, font_size)
#     json_path = r'L:\SIH\Backend\result2.json'

#     with open(json_path, 'r', encoding='utf-8') as f:
#         words_data = json.load(f)

#     for i in range(total_frames):
#         ret, frame = cap.read()
#         if not ret:
#             break

#         frame_pil = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
#         draw = ImageDraw.Draw(frame_pil)

#         for word_data in words_data:
#             if word_data['start'] * fps <= i < word_data['end'] * fps:
#                 bottom_center_x = int(frame_width / 2)
#                 bottom_center_y = frame_height - 20  
#                 draw.text((bottom_center_x, bottom_center_y), word_data['word'], fill=(255, 255, 255), font=font, anchor='mm')
#                 # draw.text((20, 36), word_data['word'], fill=(255, 255, 255), font=font)

#         out.write(cv2.cvtColor(np.array(frame_pil), cv2.COLOR_RGB2BGR))

#     cap.release()
#     out.release()
# subtittle()

# subtittle()

# from method import generate_image

# generate_image("dog riding bike")
from googletrans import Translator
import pyttsx3

translator = Translator()

text = """ஒரு நேர்மையற்ற தலைமுறையை உருவாக்குதல். தொழில்நுட்ப 
வளர்ச்சியுடன்முன்னேற்றம், மனிதர்கள் குறிப்பிடத்தக்க பிரச்சனைகளை எதிர்கொள்கிறார்கள்."""
translated_text = translator.translate(text, dest='en').text

engine = pyttsx3.init()
engine.setProperty('rate', 150)
engine.say(translated_text)
engine.save_to_file(translated_text, 'outputlppppp.mp3')  # Corrected method name
engine.runAndWait()
