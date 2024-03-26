from pytube import YouTube
import json

yt = YouTube("https://www.youtube.com/watch?v=pTCxXZh6VyE")
stream = yt.streams.get_highest_resolution()
stream.download(output_path=r"L:\CMR\Backend\out", filename="video.mp4")
# path = r"L:\SIH\Backend\assets\data.json"
# with open(path, 'r') as json_file:
#     data = json.load(json_file)
# data['name'] = yt.title
# data['duration'] = yt.length
# with open(r"L:\SIH\Backend\assets\data.json", 'w') as json_file:
#     json.dump(data, json_file, indent=4)
print('Video downloaded successfully!')


















# from method import videotoaudio
# from method import audiototext
# from method import texttoaudio
# from method import embbed
# from method import summarize
# from method import mp3_to_wav

# from pydub import AudioSegment
# import soundfile as sf
# import librosa

# def dub(file):
#     videotoaudio(file)
#     result = audiototext('audio.wav')

#     result_data = []
#     for i, seg in enumerate(result['segments']):
#         entry = {
#             'start': seg['start'],
#             'end': seg['end'],
#             'text': seg['text'],
#         }
#         result_data.append(entry)

#     texttoaudio(result_data, 'en', 'hi')
#     embbed('a.mp3', 'v.mp4')






# text = """ New York (CNN)When Liana Barrientos was 23 years old, she got married in Westchester County, New York.
# A year later, she got married again in Westchester County, but to a different man and without divorcing her first husband.
# Only 18 days after that marriage, she got hitched yet again. Then, Barrientos declared "I do" five more times, sometimes only within two weeks of each other.
# In 2010, she married once more, this time in the Bronx. In an application for a marriage license, she stated it was her "first and only" marriage.
# Barrientos, now 39, is facing two criminal counts of "offering a false instrument for filing in the first degree," referring to her false statements on the
# 2010 marriage license application, according to court documents.
# Prosecutors said the marriages were part of an immigration scam.
# On Friday, she pleaded not guilty at State Supreme Court in the Bronx, according to her attorney, Christopher Wright, who declined to comment further.
# After leaving court, Barrientos was arrested and charged with theft of service and criminal trespass for allegedly sneaking into the New York subway through an emergency exit, said Detective
# Annette Markowski, a police spokeswoman. In total, Barrientos has been married 10 times, with nine of her marriages occurring between 1999 and 2002.
# All occurred either in Westchester County, Long Island, New Jersey or the Bronx. She is believed to still be married to four men, and at one time, she was married to eight men at once, prosecutors say.
# Prosecutors said the immigration scam involved some of her husbands, who filed for permanent residence status shortly after the marriages.
# Any divorces happened only after such filings were approved. It was unclear whether any of the men will be prosecuted.
# The case was referred to the Bronx District Attorney\'s Office by Immigration and Customs Enforcement and the Department of Homeland Security\'s
# Investigation Division. Seven of the men are from so-called "red-flagged" countries, including Egypt, Turkey, Georgia, Pakistan and Mali.
# Her eighth husband, Rashid Rajput, was deported in 2006 to his native Pakistan after an investigation by the Joint Terrorism Task Force.
# If convicted, Barrientos faces up to four years in prison.  Her next court appearance is scheduled for May 18.
# """

# # result_text = summarize(text, 100, 100)
# # print(result_text)


# # mp3_to_wav('./Backend/out/audio_out.mp3')

# # Available Languages:
# # af: afrikaans
# # sq: albanian
# # am: amharic
# # ar: arabic
# # hy: armenian
# # az: azerbaijani
# # eu: basque
# # be: belarusian
# # bn: bengali
# # bs: bosnian
# # bg: bulgarian
# # ca: catalan
# # ceb: cebuano
# # ny: chichewa
# # zh-cn: chinese (simplified)
# # zh-tw: chinese (traditional)
# # co: corsican
# # hr: croatian
# # cs: czech
# # da: danish
# # nl: dutch
# # en: english
# # eo: esperanto
# # et: estonian
# # tl: filipino
# # fi: finnish
# # fr: french
# # fy: frisian
# # gl: galician
# # ka: georgian
# # de: german
# # el: greek
# # gu: gujarati
# # ht: haitian creole
# # ha: hausa
# # haw: hawaiian
# # iw: hebrew
# # he: hebrew
# # hi: hindi
# # hmn: hmong
# # hu: hungarian
# # is: icelandic
# # ig: igbo
# # id: indonesian
# # ga: irish
# # it: italian
# # ja: japanese
# # jw: javanese
# # kn: kannada
# # kk: kazakh
# # km: khmer
# # ko: korean
# # ku: kurdish (kurmanji)
# # ky: kyrgyz
# # lo: lao
# # la: latin
# # lv: latvian
# # lt: lithuanian
# # lb: luxembourgish
# # mk: macedonian
# # mg: malagasy
# # ms: malay
# # ml: malayalam
# # mt: maltese
# # mi: maori
# # mr: marathi
# # mn: mongolian
# # my: myanmar (burmese)
# # ne: nepali
# # no: norwegian
# # or: odia
# # ps: pashto
# # fa: persian
# # pl: polish
# # pt: portuguese
# # pa: punjabi
# # ro: romanian
# # ru: russian
# # sm: samoan
# # gd: scots gaelic
# # sr: serbian
# # st: sesotho
# # sn: shona
# # sd: sindhi
# # si: sinhala
# # sk: slovak
# # sl: slovenian
# # so: somali
# # es: spanish
# # su: sundanese
# # sw: swahili
# # sv: swedish
# # tg: tajik
# # ta: tamil
# # te: telugu
# # th: thai
# # tr: turkish
# # uk: ukrainian
# # ur: urdu
# # ug: uyghur
# # uz: uzbek
# # vi: vietnamese
# # cy: welsh
# # xh: xhosa
# # yi: yiddish
# # yo: yoruba
# # zu: zulu





# language_mapping = {
#         'hindi': 'Devanagari',
#         'malayalam': 'Malayalam',
#         'manipuri': 'Bengali',
#         'bengali': 'Bengali',
#         'rajasthani': 'Devanagari',
#         'tamil': 'Tamil',
#         'telugu': 'Telugu',
#         'gujarati': 'Gujarati',
#         'kannada': 'Kannada',
#     }
# gender_mapping = {
#         'hindi': ('hindi_female', 'hindi_male'),
#         'malayalam': ('malayalam_female', 'malayalam_male'),
#         'manipuri': ('manipuri_female',),
#         'bengali': ('bengali_female', 'bengali_male'),
#         'rajasthani': ('rajasthani_female', 'rajasthani_male'),
#         'tamil': ('tamil_female', 'tamil_male'),
#         'telugu': ('telugu_female', 'telugu_male'),
#         'gujarati': ('gujarati_female', 'gujarati_male'),
#         'kannada': ('kannada_female', 'kannada_male'),
#     }

# language = 'manipuri'
# gender = 'male'
# # print(gender_mapping.get(language)[0 if gender== 'female' else 1])


# from googletrans import LANGUAGES

# def print_available_languages():
#     print("Available Languages:")
#     for lang_code, lang_name in LANGUAGES.items():
#         print(f"{lang_code}: {lang_name}")

# # Call the function to print available languages
# # print_available_languages()
        
# from pytube import YouTube
# from pydub import AudioSegment
# import os

# def yt(video_url):
#     if os.path.exists("y_audio.mp3"):
#         os.remove("y_audio.mp3")
#     yt = YouTube(video_url)
#     #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#     audio = yt.streams.filter(only_audio=True).first() #extract only audio
#     out_file_a = audio.download(output_path=".") # download the audio
#     base_a, ext_a = os.path.splitext(out_file_a) # save the audio
#     os.rename(out_file_a, 'y_audio.mp3')
#     print("audio extracted")
#     audio = AudioSegment.from_mp3("y_audio.mp3")
#     audio.export("audio.wav", format="wav")
#     print("Conversion successful")
# yt('https://www.youtube.com/watch?v=JzPfMbG1vrE')


# import subprocess

# input_file = "y_audio.mp3"
# output_file = "output.wav"

# command = ['ffmpeg', '-i', input_file, output_file]
# subprocess.run(command, capture_output=True, text=True, check=True)

# from transformers import pipeline

# summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# ARTICLE = """ New York (CNN)When Liana Barrientos was 23 years old, she got married in Westchester County, New York.
# A year later, she got married again in Westchester County, but to a different man and without divorcing her first husband.
# Only 18 days after that marriage, she got hitched yet again. Then, Barrientos declared "I do" five more times, sometimes only within two weeks of each other.
# In 2010, she married once more, this time in the Bronx. In an application for a marriage license, she stated it was her "first and only" marriage.
# Barrientos, now 39, is facing two criminal counts of "offering a false instrument for filing in the first degree," referring to her false statements on the
# 2010 marriage license application, according to court documents.
# Prosecutors said the marriages were part of an immigration scam.
# On Friday, she pleaded not guilty at State Supreme Court in the Bronx, according to her attorney, Christopher Wright, who declined to comment further.
# After leaving court, Barrientos was arrested and charged with theft of service and criminal trespass for allegedly sneaking into the New York subway through an emergency exit, said Detective
# Annette Markowski, a police spokeswoman. In total, Barrientos has been married 10 times, with nine of her marriages occurring between 1999 and 2002.
# All occurred either in Westchester County, Long Island, New Jersey or the Bronx. She is believed to still be married to four men, and at one time, she was married to eight men at once, prosecutors say.
# Prosecutors said the immigration scam involved some of her husbands, who filed for permanent residence status shortly after the marriages.
# Any divorces happened only after such filings were approved. It was unclear whether any of the men will be prosecuted.
# The case was referred to the Bronx District Attorney\'s Office by Immigration and Customs Enforcement and the Department of Homeland Security\'s
# Investigation Division. Seven of the men are from so-called "red-flagged" countries, including Egypt, Turkey, Georgia, Pakistan and Mali.
# Her eighth husband, Rashid Rajput, was deported in 2006 to his native Pakistan after an investigation by the Joint Terrorism Task Force.
# If convicted, Barrientos faces up to four years in prison.  Her next court appearance is scheduled for May 18.
# """
# print(summarizer(ARTICLE, max_length=130, min_length=30, do_sample=False))
# # >>> [{'summary_text': 'Liana Barrientos, 39, is charged with two counts of "offering a false instrument for filing in the first degree" In total, she has been married 10 times, with nine of her marriages occurring between 1999 and 2002. She is believed to still be married to four men.'}]


# from pydub import AudioSegment
# import os
audio_file = r"L:\SIH\Backend\out\audio.wav"
# audio = AudioSegment.from_mp3(audio_file)

# # Define the speed change factor
# speed_change_factor = 1.5  # Increase speed by 50%

# # Apply time stretching
# audio_stretched = audio.speedup(playback_speed=speed_change_factor)

# # Export the stretched audio to a new MP3 file
# output_file = 'output.mp3'
# audio_stretched.export(output_file, format="mp3")


# import librosa
# import soundfile as sf

# try:
#     y, sr = librosa.load(audio_file)
# except Exception as e:
#     print("Error loading audio file:", e)

# # Define the speed change factor
# speed_change_factor = 1.5  # Increase speed by 50%

# # Time-stretch the audio
# y_stretched = librosa.effects.time_stretch(y, speed_change_factor)

# # Sav
# output_file = 'output.mp3'
# sf.write(output_file, y_stretched, sr)  

# import mpv
# from pynput.keyboard import Key, Listener
# import os

# speed = 1

# def on_press(key):
#     global speed
#     if key.char == 'f':
#         speed -= 0.1
#         player.speed = speed
#     if key.char == 'g':
#         speed += 0.1
#         player.speed = speed

# player = mpv.MPV(ytdl=True)
# player.play(r'L:\SIH\Backend\out\audio.wav')

# with Listener(on_press=on_press) as listener:
#     listener.join()


# import librosa
# import numpy as np
# from scipy.io import wavfile

# song, fs = librosa.load(audio_file)
# song_stretched = librosa.effects.time_stretch(song, 2)
# wavfile.write('song_stretched.wav', fs, song_stretched)



# from reportlab.lib.pagesizes import letter
# from reportlab.pdfgen import canvas

# def create_pdf_with_title_and_text(title, text_lines, filename='output.pdf'):
#     # Create a canvas (PDF object)
#     c = canvas.Canvas(filename, pagesize=letter)
    
#     # Set the font and size for the title
#     c.setFont("Helvetica-Bold", 16)
    
#     # Get the width of the title
#     title_width = c.stringWidth(title)
    
#     # Calculate the x-coordinate to center the title
#     x_title = (letter[0] - title_width) / 2
    
#     # Write the title at the top center of the page
#     c.drawString(x_title, 750, title)  # Adjusted the y-coordinate
    
#     # Move to the position for the text
#     y_text = 720  # Adjusted the y-coordinate
    
#     # Add a two-line space
#     y_text -= 30
    
#     # Set the font and size for the text
#     c.setFont("Helvetica", 12)
    
#     # Write the text lines
#     for line in text_lines:
#         c.drawString(50, y_text, line)
#         y_text -= 15  # Move to the next line
    
#     # Save the PDF
#     c.save()

# if __name__ == "__main__":
#     title = "Sample PDF Document"
#     text_lines = [
#         "This is the first line of text.",
#         "This is the second line of text."
#     ]
    
#     create_pdf_with_title_and_text(title, text_lines)
#     print("PDF created successfully!")

# from reportlab.lib.pagesizes import letter
# from reportlab.pdfgen import canvas

# def create_pdf_with_title_and_paragraph(title, paragraph, filename='output.pdf'):
#     # Create a canvas (PDF object)
#     c = canvas.Canvas(filename, pagesize=letter)
    
#     # Set the font and size for the title
#     c.setFont("Helvetica-Bold", 16)
    
#     # Get the width of the title
#     title_width = c.stringWidth(title)
    
#     # Calculate the x-coordinate to center the title
#     x_title = (letter[0] - title_width) / 2
    
#     # Write the title at the top center of the page
#     c.drawString(x_title, 750, title)  # Adjusted the y-coordinate
    
#     # Move to the position for the paragraph
#     y_paragraph = 720  # Adjusted the y-coordinate
    
#     # Set the font and size for the paragraph
#     c.setFont("Helvetica", 12)
    
#     # Split the paragraph into lines to handle wrapping
#     lines = paragraph.split('\n')
    
#     # Define the maximum width for the paragraph
#     max_paragraph_width = letter[0] - 100  # Adjusted for margins
    
#     # Write the paragraph lines
#     for line in lines:
#         line_width = c.stringWidth(line)
#         if line_width > max_paragraph_width:
#             # If the line exceeds the maximum width, split it
#             words = line.split(' ')
#             new_line = ''
#             for word in words:
#                 test_line = new_line + word + ' '
#                 if c.stringWidth(test_line) <= max_paragraph_width:
#                     new_line = test_line
#                 else:
#                     c.drawString(50, y_paragraph, new_line.strip())
#                     y_paragraph -= 15  # Move to the next line
#                     new_line = word + ' '
#             c.drawString(50, y_paragraph, new_line.strip())
#             y_paragraph -= 15  # Move to the next line
#         else:
#             # If the line fits within the maximum width, write it directly
#             c.drawString(50, y_paragraph, line)
#             y_paragraph -= 15  # Move to the next line
    
#     # Save the PDF
#     c.save()


# from reportlab.lib.pagesizes import letter
# from reportlab.pdfgen import canvas

# def create_pdf(title, data, filename='output_json.pdf'):

#     c = canvas.Canvas(filename, pagesize=letter)

#     c.setFont("Helvetica-Bold", 16)
#     title_width = c.stringWidth(title)
#     x_title = (letter[0] - title_width) / 2
#     c.drawString(x_title, 750, title)
    
#     c.setFont("Helvetica", 12)
#     y = 710
#     for item in data:
#         c.drawString(50, y, "Start: "+ str((item['start'])))  
#         c.drawString(150, y, "End: "+str(item['end']))
#         y -= 20
#         c.drawString(50, y, item['word'])
#         y -= 20
#         c.drawString(50, y, item['tword'])
#         y -= 40
#     c.save()

# if __name__ == "__main__":
#     title = "Sample PDF Document"
#     data = [
#         {"start": 0.0, "end": 2.18, "word": "American accent in 10 seconds.", "tword": "10 सेकंड में अमेरिकी उच्चारण।"},
#         {"start": 2.18, "end": 5.38, "word": "Instead of saying I could have, say I could have.", "tword": "यह कहने के बजाय कि मैं कह सकता था कि मैं कह सकता था।"},
#         {"start": 5.38, "end": 8.3, "word": "And I could have sworn I saw her watching me from the kitchen window.", "tword": "और मैंने शपथ ले सकता था कि मैंने उसे रसोई की खिड़की से देखा।"},
#         {"start": 8.3, "end": 10.94, "word": "Yeah, I could have pulled the car up on the track, slowed it down some.", "tword": "हाँ, मैं कार को ट्रैक पर खींच सकता था, इसे कुछ धीमा कर देता।"},
#         {"start": 10.94, "end": 12.02, "word": "I could have been a better father.", "tword": "मैं एक बेहतर पिता हो सकता था।"},
#         {"start": 12.02, "end": 14.28, "word": "Don't forget to follow me here to learn more.", "tword": "अधिक जानने के लिए यहाँ मेरा अनुसरण करना न भूलें।"}
#     ]
    
#     create_pdf(title, data)
#     print("PDF created successfully!")


# from reportlab.lib.pagesizes import letter
# from reportlab.pdfgen import canvas
# from reportlab.pdfbase.ttfonts import TTFont
# from reportlab.pdfbase import pdfmetrics

# def create_JSON(title, data, filename='output_json.pdf'):
#     c = canvas.Canvas(filename, pagesize=letter)

#     tamil_font_path = "Nirmala.ttf"
#     pdfmetrics.registerFont(TTFont("TamilFont", tamil_font_path))

#     c.setFont("Helvetica-Bold", 16)
#     title_width = c.stringWidth(title)
#     x_title = (letter[0] - title_width) / 2
#     c.drawString(x_title, 750, title)
#     c.setTitle(title)

#     c.setFont("Helvetica", 12)
#     c.setFont("TamilFont", 12) 

#     y = 710
#     for item in data:
#         c.drawString(50, y, "Start: " + str(item['start']))  
#         c.drawString(150, y, "End: " + str(item['end']))
#         y -= 20

#         english_width = c.stringWidth(item['word'])
#         tamil_width = c.stringWidth(item['tword'])

#         max_width = letter[0] - 100 
#         if english_width > max_width :
#             english_lines = _wrap_text(c, item['word'], max_width)
#             for i in range(len(english_lines)):
#                 if y <= 50:
#                     c.showPage()
#                     c.setFont("Helvetica-Bold", 16)
#                     c.setFont("Helvetica", 12) 
#                     c.setFont("TamilFont", 12) 
#                     y = 710  
#                 c.drawString(50, y, english_lines[i])
#                 y -= 20
#         else:
#             c.drawString(50, y, item['word'])
#             y -= 20
            
#         if  tamil_width > max_width:
#             tamil_lines = _wrap_text(c, item['tword'], max_width)
#             for i in range(len(tamil_lines)):
#                 if y <= 50:
#                     c.showPage()
#                     c.setFont("Helvetica-Bold", 16)
#                     c.setFont("Helvetica", 12) 
#                     c.setFont("TamilFont", 12) 
#                     y = 710  
#                 c.drawString(50, y, tamil_lines[i])
#                 y -= 20
#         else:
#             c.drawString(50, y, item['tword'])  
#             y -= 20

#         y -= 30
#     c.save()

# def _wrap_text(c, text, max_width):
#     lines = []
#     words = text.split()
#     line = ''
#     for word in words:
#         if c.stringWidth(line + ' ' + word) < max_width:
#             line += ' ' + word
#         else:
#             lines.append(line.strip())
#             line = word
#     lines.append(line.strip())
#     return lines


# def create_pdf_with_text(title, paragraph, filename='pdftext.pdf'):
#     c = canvas.Canvas(filename, pagesize=letter)
    
#     c.setFont("Helvetica-Bold", 16)
#     title_width = c.stringWidth(title)
#     x_title = (letter[0] - title_width) / 2
#     c.drawString(x_title, 750, title) 
    
#     y_paragraph = 720 
#     c.setFont("Helvetica", 12)
    
#     lines = paragraph.split('\n')
#     max_paragraph_width = letter[0] - 100 
    
#     for line in lines:
#         line_width = c.stringWidth(line)
#         if y_paragraph <= 50:
#             c.showPage()
#             c.setFont("Helvetica-Bold", 16)
#             c.setFont("Helvetica", 12)
#             y_paragraph = 720
#         if line_width > max_paragraph_width:
#             words = line.split(' ')
#             new_line = ''
#             for word in words:
#                 test_line = new_line + word + ' '
#                 if c.stringWidth(test_line) <= max_paragraph_width:
#                     new_line = test_line
#                 else:
#                     c.drawString(50, y_paragraph, new_line.strip())
#                     y_paragraph -= 15 
#                     new_line = word + ' '
#             c.drawString(50, y_paragraph, new_line.strip())
#             y_paragraph -= 15  
#         else:
#             c.drawString(50, y_paragraph, line)
#             y_paragraph -= 15      
#     c.save()

# if __name__ == "__main__":
#     title = "TRANSCRIPT"
#     paragraph = """
#     Before you can begin to determine what the composition of a particular paragraph will be, you must first decide on an argument and a working thesis statement for your paper. What is the most important idea that you are trying to convey to your reader? The information in each paragraph must be related to that idea. In other words, your paragraphs should remind your reader that there is a recurrent relationship between your thesis and the information in each paragraph. A working thesis functions like a seed from which your paper, and your ideas, will grow. The whole process is an organic one—a natural progression from a seed to a full-blown paper where there are direct, familial relationships between all of the ideas in the paper.

# The decision about what to put into your paragraphs begins with the germination of a seed of ideas; this “germination process” is better known as brainstorming. There are many techniques for brainstorming; whichever one you choose, this stage of paragraph development cannot be skipped. Building paragraphs can be like building a skyscraper: there must be a well-planned foundation that supports what you are building. Any cracks, inconsistencies, or other corruptions of the foundation can cause your whole paper to crumble.

# So, let’s suppose that you have done some brainstorming to develop your thesis. What else should you keep in mind as you begin to create paragraphs? Every paragraph in a paper should be:

# Unified: All of the sentences in a single paragraph should be related to a single controlling idea (often expressed in the topic sentence of the paragraph).
# Clearly related to the thesis: The sentences should all refer to the central idea, or thesis, of the paper (Rosen and Behrens 119).
# Coherent: The sentences should be arranged in a logical manner and should follow a definite plan for development (Rosen and Behrens 119).
# Well-developed: Every idea discussed in the paragraph should be adequately explained and supported through evidence and details that work together to explain the paragraph’s controlling idea (Rosen and Behrens 119).
#     """
    
#     create_pdf_with_text(title, paragraph)
#     print("PDF created successfully!")
    
    # data = [
    #     {"start": 0.0, "end": 2.18, "word": "American accent in 10 seconds.", "tword": "10 விநாடிகளில் அமெரிக்க அமெரிக்க உச்சரிப்பு."},
    #     {"start": 2.18, "end": 5.38, "word": "Instead of saying I could have, say I could have.", "tword": "நான் செய்யலாம் என்று கூறுவதில் பதிலளிக்கவும்."},
    #     {"start": 5.38, "end": 8.3, "word": "And I could have sworn I And I could have sworn I saw her watching me from the kitchen window.And I could have sworn I saw her watching me from the kitchen window.And I could have sworn I saw her watching me from the kitchen window.saw her watching me from the kitchen window.", "tword": "நான் அவளை அரசியால் காண்பதில் பெரும்பாலும் உறங்கினது."},
    #     {"start": 8.3, "end": 10.94, "word": "Yeah, I could have pulled the car up on the track, slowed it down some.", "tword": "ஆம், நான் கார்க்கு வளைக்க உடன் தெரியப்படும்."},
    #     {"start": 10.94, "end": 12.02, "word": "I could have been a better father.", "tword": "நான் ஒரு சிறந்த தந்தை ஆக முடியும்."},
    #     {"start": 12.02, "end": 14.28, "word": "Don't forget to follow me here to learn more.", "tword": "அதிகம் அறியும் போது என்னை இங்கே பின்தொடர மறக்க வேண்டாம்."}
    # ]
    
    # create_JSON(title, data)
    # print("PDF created successfully!")



