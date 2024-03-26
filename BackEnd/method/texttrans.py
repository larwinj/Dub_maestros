from deep_translator import GoogleTranslator

def translatetext(txt, dest, src):
    translated_text = GoogleTranslator(source=src, target=dest).translate(txt)
    return translated_text