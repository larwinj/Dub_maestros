from pydub import AudioSegment
import pyrubberband as pyrb
import soundfile as sf
import librosa
import pydub

from pysndfx import AudioEffectsChain
from audiotsm import phasevocoder
from audiotsm.io.wav import WavReader, WavWriter

from pydub.playback import play

def get_audio_duration(file_path):
    audio = AudioSegment.from_file(file_path)
    duration_seconds = len(audio) / 1000
    return duration_seconds

def get_stretch_ratio(path1, path2):
    duration1 = get_audio_duration(path1)
    duration2 = get_audio_duration(path2)
    stretch_ratio = duration2 / duration1
    print(duration1, duration2, stretch_ratio)
    return stretch_ratio

def stretch_audio(path1,path2):
    stretch_ratio = get_stretch_ratio(path1, path2)
    y, sr = librosa.load(path2)
    y_fast = librosa.effects.time_stretch(y, rate=stretch_ratio)
    sf.write("streched_audio.mp3", y_fast, sr)
    print("audio_streched")

def speed_changer():
    y, sr = sf.read(r'L:\SIH\Backend\out\wav_file.wav')
    y_stretch = pyrb.time_stretch(y, sr, 1.2)
    sf.write('analyzed_filepathX5.wav', y_stretch, sr, format='wav')
    sound = AudioSegment.from_wav('analyzed_filepathX5.wav')
    sound.export('analyzed_filepathX5.mp3', format="mp3")
  
def speed_changer_1():
    try:
        y, sr = sf.read('wav_file.wav')
        y_stretch = pyrb.time_stretch(y, sr, 1.2)
        sf.write('analyzed_filepathX5.wav', y_stretch, sr, format='wav')
        print("Processing completed successfully.")

    except Exception as e:
        print(f"Error: {e}")

def speed_changer_2():
    s, rate = sf.read('wav_file.wav')
    print(rate)
    fx = AudioEffectsChain().speed(1.3851666666666667)
    s = fx(s)
    sf.write('test1_file.wav', s, rate, 'PCM_16')
    print('done')
# speed_changer_2()

def speed_change_3(input_file ,speed_factor = 1.3851666666666667):
    try:
        y, sr = sf.read(input_file)
        y_stretch = pyrb.time_stretch(y, sr, speed_factor)
        sf.write(r'L:\SIH\Backend\out\audio_out_file.wav', y_stretch, sr, format='wav')
        print("Speed change completed successfully.")
    except Exception as e:
        print(f"Error: {e}")
# speed_change_3(r'L:\SIH\Backend\out\wav_file.wav')

def speed_change_4(p1, p2):
    try:
        # speed_factor = get_stretch_ratio(p1, p2)
        audio = AudioSegment.from_file(p2, format="mp3")
        audio.speedup(playback_speed=1.3851666666666667)
        audio.export('output_file.mp3', format="mp3")
        print("Speed change completed successfully.")
    except Exception as e:
        print(f"Error: {e}")
# speed_change_4(r'L:\SIH\Backend\out\audio.wav',r'L:\SIH\Backend\out\audio_out.mp3')

def speed_change_5(input_file, output_file):
    try:
        speed_factor = get_stretch_ratio(input_file, output_file)
        with WavReader(input_file) as reader:
            with WavWriter(output_file, reader.channels, reader.samplerate) as writer:
                tsm = phasevocoder(reader.channels, speed=speed_factor)
                tsm.run(reader, writer)
        print("Speed change completed successfully.")
    except Exception as e:
        print(f"Error: {e}")

def speed_change_6(input_file, output_file):
    try:
        speed_factor = get_stretch_ratio(input_file, output_file)
        with WavReader(input_file) as reader:
            with WavWriter(output_file, reader.channels, reader.samplerate) as writer:
                tsm = phasevocoder(reader.channels, speed=speed_factor)
                tsm.run(reader, writer)
        print("Speed change completed successfully.")
        output_audio = AudioSegment.from_file(output_file)
        output_audio.export("output_audio.wav", format="wav")
        print("Output audio saved successfully.")
    except Exception as e:
        print(f"Error: {e}")
# speed_change_6(r'L:\SIH\Backend\out\wav_file.wav', r'L:\SIH\Backend\out\wav_out_file.wav')

def speed_down(path, speed):
    audio = AudioSegment.from_file(path)    
    new_frame_rate = int(audio.frame_rate * speed)
    slower_sound = audio._spawn(audio.raw_data, overrides={"frame_rate": new_frame_rate})
    slower_sound.export('slower.mp3', format="mp3")
    print(1)