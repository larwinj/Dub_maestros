from method import embbed, stretch_audio
from method import translatetext
from method import videotoaudio
from method import audiototext
from method import texttoaudio
from method import mp3to_wav
import json


def dub(file, src, dest, voice):
    videotoaudio(file)
    result = audiototext("audio.wav", src)
    texttoaudio(result, src, dest, voice)
    mp3to_wav('audio_out.mp3')
    stretch_audio('audio.wav','wav_file.wav')
    embbed(r'L:\CMR\Backend\out\streched_audio.wav', "video.mp4")