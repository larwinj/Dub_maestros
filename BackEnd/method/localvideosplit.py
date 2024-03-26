import base64
import moviepy.editor as mp
import tempfile
import os
import numpy as np



def videotoaudio(video_file):

    with tempfile.NamedTemporaryFile(delete=False) as temp_video_file:
        temp_video_file.write(video_file.read())
        temp_video_file_path = temp_video_file.name

    video_clip = mp.VideoFileClip(temp_video_file_path)
    audio_clip = video_clip.audio
    audio_clip.write_audiofile("audio.wav", codec='pcm_s16le', ffmpeg_params=["-ac", "2"])

    clip = video_clip.set_audio(None)
    clip.write_videofile("video.mp4", codec="libx264", audio_codec="aac")
    video_clip.close()
    os.remove(temp_video_file_path)

    # audio_array = np.vstack(list(audio_clip.iter_frames(fps=44100, dtype=np.int16)))
    # #base64-encoded string
    # audio_data_base64 = base64.b64encode(audio_array.tobytes()).decode('utf-8')

    # return audio_data_base64
    # return audio_clip