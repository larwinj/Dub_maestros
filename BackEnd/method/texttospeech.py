from aksharamukha import transliterate as trans
from deep_translator import GoogleTranslator
from pydub import AudioSegment
import numpy as np
import librosa
import torch
import soundfile as sf

from method.texttrans import translatetext
# from texttrans import translatetext

#google translator language and code||
code_mapping = {                                      
    'afrikaans': 'af',
    'albanian': 'sq',
    'amharic': 'am',
    'arabic': 'ar',
    'armenian': 'hy',
    'azerbaijani': 'az',
    'basque': 'eu',
    'belarusian': 'be',
    'bengali': 'bn',
    'bosnian': 'bs',
    'bulgarian': 'bg',
    'catalan': 'ca',
    'cebuano': 'ceb',
    'chichewa': 'ny',
    'chinese': 'zh-cn',
    'chinese': 'zh-tw',
    'corsican': 'co',
    'croatian': 'hr',
    'czech': 'cs',
    'danish': 'da',
    'dutch': 'nl',
    'english': 'en',
    'esperanto': 'eo',
    'estonian': 'et',
    'filipino': 'tl',
    'finnish': 'fi',
    'french': 'fr',
    'frisian': 'fy',
    'galician': 'gl',
    'georgian': 'ka',
    'german': 'de',
    'greek': 'el',
    'gujarati': 'gu',
    'haitian creole': 'ht',
    'hausa': 'ha',
    'hawaiian': 'haw',
    'hebrew': 'iw',
    'hindi': 'hi',
    'hmong': 'hmn',
    'hungarian': 'hu',
    'icelandic': 'is',
    'igbo': 'ig',
    'indonesian': 'id',
    'irish': 'ga',
    'italian': 'it',
    'japanese': 'ja',
    'javanese': 'jw',
    'kannada': 'kn',
    'kazakh': 'kk',
    'khmer': 'km',
    'korean': 'ko',
    'kurdish': 'ku',
    'kyrgyz': 'ky',
    'lao': 'lo',
    'latin': 'la',
    'latvian': 'lv',
    'lithuanian': 'lt',
    'luxembourgish': 'lb',
    'macedonian': 'mk',
    'malagasy': 'mg',
    'malay': 'ms',
    'malayalam': 'ml',
    'maltese': 'mt',
    'maori': 'mi',
    'marathi': 'mr',
    'mongolian': 'mn',
    'myanmar': 'my',
    'nepali': 'ne',
    'norwegian': 'no',
    'odia': 'or',
    'pashto': 'ps',
    'persian': 'fa',
    'polish': 'pl',
    'portuguese': 'pt',
    'punjabi': 'pa',
    'romanian': 'ro',
    'russian': 'ru',
    'samoan': 'sm',
    'scots gaelic': 'gd',
    'serbian': 'sr',
    'sesotho': 'st',
    'shona': 'sn',
    'sindhi': 'sd',
    'sinhala': 'si',
    'slovak': 'sk',
    'slovenian': 'sl',
    'somali': 'so',
    'spanish': 'es',
    'sundanese': 'su',
    'swahili': 'sw',
    'swedish': 'sv',
    'tajik': 'tg',
    'tamil': 'ta',
    'telugu': 'te',
    'thai': 'th',
    'turkish': 'tr',
    'ukrainian': 'uk',
    'urdu': 'ur',
    'uyghur': 'ug',
    'uzbek': 'uz',
    'vietnamese': 'vi',
    'welsh': 'cy',
    'xhosa': 'xh',
    'yiddish': 'yi',
    'yoruba': 'yo',
    'zulu': 'zu'
}

device = 'cuda' if torch.cuda.is_available() else 'cpu'

language = 'indic'
speaker = 'v3_indic'

model, example_text = torch.hub.load(
    repo_or_dir='snakers4/silero-models',
    model='silero_tts',
    language=language,
    speaker=speaker,
)

model.to(device)
sample_rate = 48000

def speed_down(audio, speed):  
    new_frame_rate = int(audio.frame_rate * speed)
    slower_sound = audio._spawn(audio.raw_data, overrides={"frame_rate": new_frame_rate})
    return slower_sound

# def speed_up(audio, speed): 
#     y, sr = librosa.load(audio)
#     y_fast = librosa.effects.time_stretch(y, rate=speed)
#     return y_fast

def speed_up(audio,speed_factor):
    # audio = AudioSegment.from_file(input_file)
    # print(speed_factor)
    modified_audio = audio.speedup(playback_speed=speed_factor)
    # modified_audio.export(output_file, format="wav")
    return modified_audio

# speed_up(r'L:\SIH\Backend\out\audio.wav',0.75)
# def translatetext(txt, dest, src='english'):
#     s = str(code_mapping.get(src))
#     d = str(code_mapping.get(dest))
#     translated_text = GoogleTranslator(source=s, target=d).translate(txt)
#     return translated_text

def generate_silence(duration_ms):
    num_samples = int(44100 * duration_ms / 1000)
    silence_data = np.zeros(num_samples, dtype=np.int16)
    silence_audio_segment = AudioSegment(
        silence_data.tobytes(),
        frame_rate=44100,
        sample_width=silence_data.dtype.itemsize,
        channels=1
    )
    return silence_audio_segment

def transliterate(orig_text, language, gender):
    gender_mapping = {
        'hindi': ('hindi_female', 'hindi_male'),
        'malayalam': ('malayalam_female', 'malayalam_male'),
        'manipuri': ('manipuri_female',),
        'bengali': ('bengali_female', 'bengali_male'),
        'rajasthani': ('rajasthani_female', 'rajasthani_male'),
        'tamil': ('tamil_female', 'tamil_male'),
        'telugu': ('telugu_female', 'telugu_male'),
        'gujarati': ('gujarati_female', 'gujarati_male'),
        'kannada': ('kannada_female', 'kannada_male'),
    }
    
    if language != 'tamil':
        language_mapping = {
            'hindi': 'Devanagari',
            'malayalam': 'Malayalam',
            'manipuri': 'Bengali',
            'bengali': 'Bengali',
            'rajasthani': 'Devanagari',
            'telugu': 'Telugu',
            'gujarati': 'Gujarati',
            'kannada': 'Kannada',
            # 'english':'English',
        }
        lang = language_mapping.get(language)
        print(language)
        print(lang)
        roman_text = trans.process(lang, 'ISO', orig_text)

        audio = model.apply_tts(roman_text,
                                speaker=gender_mapping.get(language)[0 if gender== 'female' else 1],
                                sample_rate=sample_rate)
        
        print(language_mapping.get(language), gender_mapping.get(language))
        return audio
    else:
        roman_text = trans.process('Tamil', 'ISO', orig_text, pre_options=['TamilTranscribe'])

        audio = model.apply_tts(roman_text,
                                speaker=gender_mapping.get(language)[0 if gender== 'female' else 1],
                                sample_rate=sample_rate)
        return audio

def texttoaudio(result, src, dest, gender):

    final_audio = AudioSegment.silent(duration=0)
    length = len(result)
    
    s = str(code_mapping.get(src))
    d = str(code_mapping.get(dest))
    
    # dest = code_mapping.get(dest)
    
    for i in range(length):
        if i < length-1:
            current_segment = result[i]
            next_segment = result[i + 1]
            
            difference = next_segment['start'] - current_segment['end']
            
            translated_txt = translatetext(current_segment['word'], d, s)

            audio_bytes = transliterate(translated_txt, dest, gender)

            audio_data = audio_bytes.numpy()
            scaled_audio_data = (audio_data * 32767).astype(np.int16)
            audio_segment = AudioSegment(scaled_audio_data.tobytes(), frame_rate=48000, sample_width=2, channels=1)
            print(type(audio_segment))

            # trans_duration = tensor_audio_segment.duration_seconds
            trans_duration = trans_duration = len(audio_segment) / 1000 
            og_duration = current_segment['end'] - current_segment['start']
            print(og_duration)
            print(trans_duration)

            ratio = og_duration / trans_duration
            print(ratio)

            # if ratio < 1:
            #     seg = speed_down(audio_segment, ratio)
            # else:
            #     seg = speed_up(audio_segment, ratio)
                
            # print(len(seg)/1000)
            # final_audio += seg
            final_audio += audio_segment

            if difference > 0:
                final_audio += generate_silence(difference * 1000)
            print(current_segment['word'])
            print(translated_txt)
        else:
            current_segment = result[i]
            
            translated_txt = translatetext(current_segment['word'], d, s)
            audio_bytes = transliterate(translated_txt, dest, gender)
            
            audio_data = audio_bytes.numpy()
            scaled_audio_data = (audio_data * 32767).astype(np.int16)
            audio_segment = AudioSegment(scaled_audio_data.tobytes(), frame_rate=48000, sample_width=2, channels=1)
            final_audio += audio_segment
            
            trans_duration = audio_segment.duration_seconds
            og_duration = current_segment['end'] - current_segment['start']

            ratio = og_duration / trans_duration

            # if ratio < 1:
            #     final_audio += speed_down(audio_segment, ratio)
            # else:
            #     final_audio += speed_up(audio_segment, ratio)
            final_audio += audio_segment
            print(current_segment['word'])
            print(translated_txt)

    final_audio.export("audio_out.mp3", format="mp3")

data = [
  {
    "start": 0.0,
    "end": 5.82,
    "word": " Without knowing the sweetness of love and the overwhelming nature of the divine,",
    "tword": "\u0b85\u0ba9\u0bcd\u0baa\u0bbf\u0ba9\u0bcd \u0b87\u0ba9\u0bbf\u0bae\u0bc8\u0baf\u0bc1\u0bae\u0bcd, \u0ba4\u0bc6\u0baf\u0bcd\u0bb5\u0bc0\u0b95\u0ba4\u0bcd \u0ba4\u0ba9\u0bcd\u0bae\u0bc8\u0baf\u0bc1\u0bae\u0bcd \u0b85\u0bb1\u0bbf\u0baf\u0bbe\u0bae\u0bb2\u0bcd,"
  },
  {
    "start": 6.82,
    "end": 7.92,
    "word": " you're here to touch life.",
    "tword": "\u0ba8\u0bc0\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0bb5\u0bbe\u0bb4\u0bcd\u0b95\u0bcd\u0b95\u0bc8\u0baf\u0bc8\u0ba4\u0bcd \u0ba4\u0bca\u0b9f \u0b87\u0b99\u0bcd\u0b95\u0bc7 \u0b87\u0bb0\u0bc1\u0b95\u0bcd\u0b95\u0bbf\u0bb1\u0bc0\u0bb0\u0bcd\u0b95\u0bb3\u0bcd."
  },
  {
    "start": 9.92,
    "end": 16.26,
    "word": " If you live in the barren lands of just your thought,",
    "tword": "\u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0b9a\u0bbf\u0ba8\u0bcd\u0ba4\u0ba9\u0bc8\u0baf\u0bbf\u0ba9\u0bcd \u0ba4\u0bb0\u0bbf\u0b9a\u0bc1 \u0ba8\u0bbf\u0bb2\u0ba4\u0bcd\u0ba4\u0bbf\u0bb2\u0bcd \u0ba8\u0bc0\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0bb5\u0bbe\u0bb4\u0bcd\u0ba8\u0bcd\u0ba4\u0bbe\u0bb2\u0bcd,"
  }
]

# texttoaudio(result, src, dest, gender)
# texttoaudio(data,'english','tamil',',male')