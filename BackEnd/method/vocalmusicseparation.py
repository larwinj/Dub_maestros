from spleeter.separator import Separator
import numpy as np

separator = Separator('spleeter:2stems')

def vocalspleeter(audio):
    pcm_data = np.array(audio.to_soundarray())
    output_folder = 'L:\CMR\Backend'
    separator.separate_to_file(pcm_data, output_folder)
    return True

vocalspleeter('vt.mp3')