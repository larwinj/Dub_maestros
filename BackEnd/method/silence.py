from pydub import AudioSegment, silence

def func1(path):
    myaudio = AudioSegment.from_file(path)
    dBFS=myaudio.dBFS
    silence = silence.detect_silence(myaudio, min_silence_len=1000, silence_thresh=dBFS-16)
    silence = [((start/1000),(stop/1000)) for start,stop in silence]
    print(silence)
    
import assemblyai as aai
def func2(audio_url):
    aai.settings.api_key = "31567524f31f41f3b75f25c3e6e9717e"
    transcriber = aai.Transcriber()
    transcript = transcriber.transcribe(audio_url)
    # print(transcript.text)
    sentences = transcript.get_sentences()
    for sentence in sentences:
        print(sentence.text, sentence.start/1000, sentence.end/1000)
    
func2(r"L:\CMR\VIDEOSSSS\vtt.mp3")

