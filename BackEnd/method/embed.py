import moviepy.editor as mp
from pydub import AudioSegment
import soundfile as sf
import librosa
import os



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
    sf.write("streched_audio.wav", y_fast, sr)
    print("audio_streched")
    
# stretch_audio('audio.wav','wav_file.wav')

def embbed(audio, video):
    audio = mp.AudioFileClip(audio)
    video1 = mp.VideoFileClip(video)
    final = video1.set_audio(audio)
    final.write_videofile("output.mp4")
    audio.close()
    video1.close()
# embbed(r"L:\SIH\Backend\out\wav_file.wav",r"L:\SIH\Backend\out\video.mp4")

# from pydub import AudioSegment
# from pydub.playback import play

# sound1 = AudioSegment.from_wav("louder_output.wav")
# sound2 = AudioSegment.from_wav("quieter_output.wav")

# overlay = sound1.overlay(sound2, position=1000)

# play(overlay)
# overlay.export("overlaid_1sec_offset.wav", format="wav")
    


# first_cut_point = (1*60 + 18) * 1000
# last_cut_point = (1*60 + 33) * 1000

# sound_clip = sound[first_cut_point:last_cut_point]

# sound_clip.export(os.path.join(base_dir, "hsr.mp3"), format="mp3")



# from pydub import AudioSegment
# from pydub.playback import play

# sound = AudioSegment.from_wav("new_fs_output_pydub.wav")

# # 3 dB up
# louder = sound + 3
# # 3 dB down
# quieter = sound - 3

# play(louder)
# play(quieter)

# louder.export("louder_output.wav", format="wav")
# quieter.export("quieter_output.wav", format="wav")