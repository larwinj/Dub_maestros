from pydub import AudioSegment
import pyrubberband
import os

def change_pitch(input_audio_path, output_audio_path, semitones):
    input_audio = AudioSegment.from_file(input_audio_path)

    # Convert AudioSegment to raw PCM data
    pcm_data = input_audio.raw_data
    sample_width = input_audio.sample_width
    frame_rate = input_audio.frame_rate
    channels = input_audio.channels

    # Pitch shift using pyrubberband
    shifted_pcm_data = pyrubberband.pitch_shift(pcm_data, sample_width, channels, frame_rate, semitones)

    # Create a new AudioSegment from the shifted PCM data
    output_audio = AudioSegment(
        shifted_pcm_data,
        frame_rate=frame_rate,
        sample_width=sample_width,
        channels=channels
    )

    # Export the final audio
    output_audio.export(output_audio_path, format="mp3")

input_audio_path = r'L:/CMR/vt.wav'
output_audio_path = 'output_audio_pitch_adjusted.mp3'
semitones_to_change = 6

change_pitch(input_audio_path, output_audio_path, semitones_to_change)
