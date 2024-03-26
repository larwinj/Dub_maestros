from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from pytube import YouTube
import subprocess
import traceback
import json
import os
# from flask_ngrok import run_with_ngrok

from method import embbed
from method import stretch_audio
from method import translatetext
from method import texttoaudio
from method import audiototext
from method import subtittle
from method import summarize
from method import mp3to_wav
from method import videotoaudio
from method import delete_files_in_folder
from method import create_pdf_with_text
from method import create_JSON
from method import summarize_video

app = Flask(__name__)
# run_with_ngrok(app) 
CORS(app)

@app.route('/video_dub', methods=['GET','POST'])
def video_dub():
    try:
        delete_files_in_folder(r'L:\CMR\Backend\out')
        if 'video' not in request.files:
            return jsonify({'error': 'No video file provided'}), 400
        
        video_file = request.files['video']
        # video_file.save(r"L:\CMR\Backend\out\full_video.mp4")
        
        if(video_file.filename):
            path = r"L:\CMR\Backend\assets\data.json"
            with open(path, 'r') as json_file:
                data = json.load(json_file)
            data['name'] = video_file.filename
            with open(r"L:\CMR\Backend\assets\data.json", 'w') as json_file:
                json.dump(data, json_file, indent=4)
        
        src = request.form['src']
        dest = request.form['dest']
        voice = request.form['voice']
        
        videotoaudio(video_file)
        result = audiototext("audio.wav", src, dest)
        texttoaudio(result, src, dest, voice)
        mp3to_wav('audio_out.mp3')
        stretch_audio('audio.wav','wav_file.wav')
        embbed(r'L:\CMR\Backend\out\streched_audio.wav', "video.mp4")
        subtittle()
        return send_file(r"L:\CMR\Backend\out\output.mp4", as_attachment=True)

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/y_dub', methods=['GET','POST'])
def y_dubbing():
    try:
        delete_files_in_folder(r'L:\CMR\Backend\out')
        
        video_url = request.form['url']
        print(video_url)
        
        src = request.form['src']
        dest = request.form['dest']
        voice = request.form['voice']
        
        yt = YouTube(video_url)
        
        stream = yt.streams.get_highest_resolution()
        stream.download(output_path=r"L:\CMR\Backend\out", filename="full_video.mp4")
        
        path = r"L:\CMR\Backend\assets\data.json"
        with open(path, 'r') as json_file:
            data = json.load(json_file)
            
        data['name'] = yt.title
        data['duration'] = yt.length
        
        with open(r"L:\CMR\Backend\assets\data.json", 'w') as json_file:
            json.dump(data, json_file, indent=4)
            
        #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        if os.path.exists("audio.mp3"):
            os.remove("audio.mp3")
        audio = yt.streams.filter(only_audio=True).first() #extract only audio
        out_file_a = audio.download(output_path=".") # download the audio
        base_a, ext_a = os.path.splitext(out_file_a) # save the audio
        os.rename(out_file_a, 'audio.mp3')
        command = ['ffmpeg', '-i', 'audio.mp3', 'audio.wav']
        subprocess.run(command, capture_output=True, text=True, check=True)
        print("audio extracted")
        #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        if os.path.exists("video.mp4"):
            os.remove("video.mp4")
        video = yt.streams.filter(only_video=True).first() #extract only video
        out_file_v = video.download(output_path=".") # download the video
        base_v, ext_v = os.path.splitext(out_file_v) # save the video
        os.rename(out_file_v, 'video.mp4')
        print("video extracted")
        #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        result = audiototext("audio.wav", src, dest)  
        texttoaudio(result, src,dest, voice)
        mp3to_wav('audio_out.mp3')
        stretch_audio('audio.wav','wav_file.wav')
        subtittle()
        embbed(r'L:\CMR\Backend\out\streched_audio.wav', "output_video.mp4")
        
        # sound = AudioSegment.from_wav(r'L:\SIH\Backend\out\streched_audio.wav')
        # sound.export(r"L:\SIH\Backend\out\s_output.mp4",format="mp4")
        
        return send_file(r"L:\CMR\Backend\out\output.mp4", as_attachment=True)
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)})
    
@app.route('/video_summary', methods=['GET','POST'])
def video_summary():
    try:
        summarize_video(r"L:\CMR\Backend\out\audio.mp3", r"L:\CMR\Backend\out\full_video.mp4")
        
        return send_file(r"L:\CMR\Backend\out\output_video_summary.mp4", as_attachment=True)

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/gettext', methods=['GET','POST'])
def gettext():
    try:
        with open(r'L:\CMR\Backend\out\result1.json', 'r') as json_file:
            data = json.load(json_file)
            
        response_text = ""
        response_trans = ""
        
        for item in data:
            response_text += item['word']
            response_trans += item['tword']
        
        path = r"L:\CMR\Backend\assets\data.json"
        with open(path, 'r') as json_file:
            data = json.load(json_file)
            
        data['original_text'] = response_text
        data['translated_text'] = response_trans
        
        with open(r"L:\CMR\Backend\assets\data.json", 'w') as json_file:
            json.dump(data, json_file, indent=4)
        
        return jsonify({'response_text': response_text, 'response_trans': response_trans})
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)})
    
@app.route('/summary', methods=['GET','POST'])
def summary():
    try:
        min_value = request.form.get('min_value')
        max_value = request.form.get('max_value')
        min_value = 100
        max_value = 100
        
        path = r'L:\CMR\Backend\assets\data.json'
        with open(path, 'r') as json_file:
            data = json.load(json_file)
        response_text = data['original_text']
        
        response_text = summarize(response_text, int(min_value),  int(max_value))
        result_trans = translatetext(response_text,'telugu' ,'english')
        
        data['original_text_summary'] = response_text
        data['translated_text_summary'] = result_trans
        
        with open(path, 'w') as json_file:
            json.dump(data, json_file, indent=4)
        
        return jsonify({'response_text': response_text,
                        'response_trans': result_trans})
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)})

@app.route('/getsubtitle', methods=['GET','POST'])
def getsubtitle():
    try:
        with open(r'L:\CMR\Backend\out\result1.json', 'r') as json_file:
            data = json.load(json_file)
        return jsonify({'response': data})
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)})

@app.route('/get-text-pdf')
def get_text_pdf():
    try:
        with open(r'L:\CMR\Backend\assets\data.json', 'r') as json_file:
            data = json.load(json_file)
            
        title = data['name']       
        paragraph = data['original_text'] + "\n\n\n"
        paragraph += data['translated_text']
        
        create_pdf_with_text(title, paragraph)
        
        return send_file(r'L:\CMR\Backend\out\text.pdf', as_attachment=True)
    except Exception as e:
        return str(e)
    
@app.route('/get-summary-pdf')
def get_summary_pdf():
    try:
        with open(r'L:\CMR\Backend\assets\data.json', 'r') as json_file:
            data = json.load(json_file)
            
        title = data['name']       
        paragraph = data['original_text_summary'] + "\n\n\n"
        paragraph += data['translated_text_summary']
        
        create_pdf_with_text(title, paragraph)
        
        return send_file('text.pdf', as_attachment=True)
    except Exception as e:
        return str(e)
    
@app.route('/get-transcript-pdf')
def get_transcript_pdf():
    try:
        with open(r'L:\CMR\Backend\assets\data.json', 'r') as json_file:
            data = json.load(json_file)
            
        title = data['name'] 
        
        create_JSON(title)
        
        return send_file('transcript.pdf', as_attachment=True)
    except Exception as e:
        return str(e)

@app.route('/get-og-audio')
def get_og_audio():
    try:
        return send_file('audio.mp3', as_attachment=True)
    except Exception as e:
        return str(e)
    
    
@app.route('/final_dub', methods=['GET','POST'])
def ret_op():
    try:
        return send_file(r"L:\CMR\Backend\out\output.mp4", as_attachment=True)
    except Exception as e:
        return str(e)

@app.route('/ret_audiomp3')
def ret_audiomp3():
    try:
        return send_file(r'L:\CMR\Backend\out\audio.wav', as_attachment=True)
    except Exception as e:
        return str(e)
@app.route('/ret_videomp4', methods=['GET','POST'])
def ret_vide():
    try:
        return send_file(r"L:\CMR\Backend\out\output_video.mp4", as_attachment=True)
    except Exception as e:
        return str(e)

@app.route('/get-trans-audio')
def get_trans_audio():
    try:
        return send_file(r'L:\CMR\Backend\out\audio_out.mp3', as_attachment=True)
    except Exception as e:
        return str(e)
    
if __name__ == '__main__':
    app.run(debug=True)