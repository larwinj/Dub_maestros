from pytube import YouTube
from pydub import AudioSegment
import json
import os

from method import audiototext
from method import texttoaudio
from method import embbed, stretch_audio
from method import mp3to_wav


def mp3to_wav(mp3_path):
    try:
        audio = AudioSegment.from_mp3(mp3_path)
        audio.export('wav_file.wav', format="wav")
        print("Conversion successful")
    except Exception as e:
        print(f"Error converting MP3 to WAV: {e}")

def you_download(url):
    yt = YouTube(url)
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    audio = yt.streams.filter(only_audio=True).first() #extract only audio
    out_file_a = audio.download(output_path=".") # download the audio
    base_a, ext_a = os.path.splitext(out_file_a) # save the audio
    os.rename(out_file_a, 'audio.mp3')
    mp3to_wav('audio.mp3')
    print("audio extracted")
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    video = yt.streams.filter(only_video=True).first() #extract only video
    out_file_v = video.download(output_path=".") # download the video
    base_v, ext_v = os.path.splitext(out_file_v) # save the video
    os.rename(out_file_v, 'video.mp4')
    print("video extracted")
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    result = audiototext("audio.wav")
    result_data = []
    for i, seg in enumerate(result['segments']):
        entry = {
            'start': seg['start'],
            'end': seg['end'],
            'word': seg['text'],
        }
        result_data.append(entry)

    with open('result1.json', 'w') as json_file:
        json.dump(result_data, json_file, indent=2)

    texttoaudio(result_data, 'english','hindi', 'male')
    mp3to_wav('audio_out.mp3')
    stretch_audio('audio.wav','wav_file.wav')
    embbed(r'L:\CMR\Backend\out\streched_audio.wav', "video.mp4")




# you_download('https://www.youtube.com/watch?v=v4t0E3S1N1k')