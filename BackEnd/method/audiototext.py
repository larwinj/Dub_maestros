import assemblyai as aai
import whisper
import torch
import json

from method.texttrans import translatetext

aai.settings.api_key = "31567524f31f41f3b75f25c3e6e9717e"
transcriber = aai.Transcriber()

LANG ={
    "english": "en",
    "chinese": "zh",
    "german": "de",
    "spanish": "es",
    "russian": "ru",
    "korean": "ko",
    "french": "fr",
    "japanese": "ja",
    "portuguese": "pt",
    "turkish": "tr",
    "polish": "pl",
    "catalan": "ca",
    "dutch": "nl",
    "arabic": "ar",
    "swedish": "sv",
    "italian": "it",
    "indonesian": "id",
    "hindi": "hi",
    "finnish": "fi",
    "vietnamese": "vi",
    "hebrew": "he",
    "ukrainian": "uk",
    "greek": "el",
    "malay": "ms",
    "czech": "cs",
    "romanian": "ro",
    "danish": "da",
    "hungarian": "hu",
    "tamil": "ta",
    "norwegian": "no",
    "thai": "th",
    "urdu": "ur",
    "croatian": "hr",
    "bulgarian": "bg",
    "lithuanian": "lt",
    "latin": "la",
    "maori": "mi",
    "malayalam": "ml",
    "welsh": "cy",
    "slovak": "sk",
    "telugu": "te",
    "persian": "fa",
    "latvian": "lv",
    "bengali": "bn",
    "serbian": "sr",
    "azerbaijani": "az",
    "slovenian": "sl",
    "kannada": "kn",
    "estonian": "et",
    "macedonian": "mk",
    "breton": "br",
    "basque": "eu",
    "icelandic": "is",
    "armenian": "hy",
    "nepali": "ne",
    "mongolian": "mn",
    "bosnian": "bs",
    "kazakh": "kk",
    "albanian": "sq",
    "swahili": "sw",
    "galician": "gl",
    "marathi": "mr",
    "punjabi": "pa",
    "sinhala": "si",
    "khmer": "km",
    "shona": "sn",
    "yoruba": "yo",
    "somali": "so",
    "afrikaans": "af",
    "occitan": "oc",
    "georgian": "ka",
    "belarusian": "be",
    "tajik": "tg",
    "sindhi": "sd",
    "gujarati": "gu",
    "amharic": "am",
    "yiddish": "yi",
    "lao": "lo",
    "uzbek": "uz",
    "faroese": "fo",
    "haitian creole": "ht",
    "pashto": "ps",
    "turkmen": "tk",
    "nynorsk": "nn",
    "maltese": "mt",
    "sanskrit": "sa",
    "luxembourgish": "lb",
    "myanmar": "my",
    "tibetan": "bo",
    "tagalog": "tl",
    "malagasy": "mg",
    "assamese": "as",
    "tatar": "tt",
    "hawaiian": "haw",
    "lingala": "ln",
    "hausa": "ha",
    "bashkir": "ba",
    "javanese": "jw",
    "sundanese": "su",
    "cantonese": "yue"
}

def audiototext(path, src, dest):
    print("start att")
    src = LANG.get(src)
    print(src)
    print(dest)
    model = whisper.load_model("base")
    result = model.transcribe(path, language=src, fp16=False, verbose=True)
    print("result done")
    
    result_data = []
    for i, seg in enumerate(result['segments']):
        tw = translatetext(seg['text'], dest, src)
        entry = {
            'start': seg['start'],
            'end': seg['end'],
            'word': seg['text'],
            'tword':tw,
        }
        result_data.append(entry)
        print(result_data)
    with open('result1.json', 'w') as json_file:
        json.dump(result_data, json_file, indent=2)

    result_data1 = []
    for i, seg in enumerate(result['segments']):
        tw = translatetext(seg['text'],dest, src)
        print(tw)
        entry = {
                'start': seg['start'],
                'end': seg['end'],
                'word':tw,
        }
        result_data1.append(entry)
        
    with open('result2.json', 'w') as json_file:
        json.dump(result_data1, json_file, indent=2) 
          
    return result_data

def audiototext_m2(path, src, dest):
    
    transcript = transcriber.transcribe(path)
    sentences = transcript.get_sentences()
    
    result_data = []
    for sentence in sentences:
        tw = translatetext(sentence.text, dest, src)
        entry = {
            'start': sentence.start,
            'end': sentence.end,
            'word': sentence.text,
            'tword':tw,
        }
        result_data.append(entry)
    with open('result1.json', 'w') as json_file:
        json.dump(result_data, json_file, indent=2)

    result_data1 = []
    for sentence in sentences:
        tw = translatetext(sentence.text,dest, src)
        print(tw)
        entry = {
                'start': sentence.start,
                'end': sentence.end,
                'word':tw,
        }
        result_data1.append(entry)
        
    with open('result2.json', 'w') as json_file:
        json.dump(result_data1, json_file, indent=2)
        
    return result_data

# audiototext(r'L:\CMR\Backend\out\audio.wav','telugu','english')