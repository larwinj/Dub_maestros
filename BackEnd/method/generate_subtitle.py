import json
from moviepy.editor import TextClip, CompositeVideoClip, ColorClip
import numpy as np
from moviepy.editor import TextClip, CompositeVideoClip, concatenate_videoclips,VideoFileClip, ColorClip
from googletrans import Translator


# def sub_trans():

#   with open(r'L:\SIH\Backend\out\result2.json', 'r') as json_file:
#       data = json.load(json_file)

#   # Initialize translator
#   # translator = Translator()

#   # Translate each word in the JSON data
#   translated_data = []
#   for item in data:
#       word = item['word']
#       translation = translator.translate(word, src='en', dest='hi').text
#       translated_item = {
#           'start': item['start'],
#           'end': item['end'],
#           'word': word,
#           'translation': translation
#       }
#       translated_data.append(translated_item)

#   print(json.dumps(translated_data, indent=2, ensure_ascii=False))

#   with open('translated_data.json', 'w', encoding='utf-8') as output_file:
#       json.dump(translated_data, output_file, indent=2, ensure_ascii=False)


def subtitles():

  # sub_trans()

  with open(r'L:\CMR\Backend\out\result1.json', 'r') as f:
      wordlevel_info_modified = json.load(f)

  ###################################################################

  def split_text_into_lines(data):
      MaxChars = 30
      #maxduration in seconds
      MaxDuration = 2.0
      MaxGap = 1.5

      subtitles = []
      line = []
      line_duration = 0
      line_chars = 0


      for idx,word_data in enumerate(data):
          word = word_data["word"]
          start = word_data["start"]
          end = word_data["end"]

          line.append(word_data)
          line_duration += end - start

          temp = " ".join(item["word"] for item in line)


          # Check if adding a new word exceeds the maximum character count or duration
          new_line_chars = len(temp)

          duration_exceeded = line_duration > MaxDuration
          chars_exceeded = new_line_chars > MaxChars
          if idx>0:
            gap = word_data['start'] - data[idx-1]['end']
            # print (word,start,end,gap)
            maxgap_exceeded = gap > MaxGap
          else:
            maxgap_exceeded = False


          if duration_exceeded or chars_exceeded or maxgap_exceeded:
              if line:
                  subtitle_line = {
                      "word": " ".join(item["word"] for item in line),
                      "start": line[0]["start"],
                      "end": line[-1]["end"],
                      "textcontents": line
                  }
                  # subtitle_line["word"] = translatetext(subtitle_line["word"])
                  # subtitle_line['textcontents'][0]['word'] = translatetext(subtitle_line['textcontents'][0]['word'])
                  # print(subtitle_line['textcontents'][0]['word'])
                  subtitles.append(subtitle_line)
                  line = []
                  line_duration = 0
                  line_chars = 0


      if line:
          subtitle_line = {
              "word": " ".join(item["word"] for item in line),
              "start": line[0]["start"],
              "end": line[-1]["end"],
              "textcontents": line
          }
          # subtitle_line["word"] = translatetext(subtitle_line["word"])
          # subtitle_line['textcontents'][0]['word'] = translatetext(subtitle_line['textcontents'][0]['word'])
          # print(subtitle_line['textcontents'][0]['word'])
          subtitles.append(subtitle_line)

      return subtitles

  #########

  linelevel_subtitles = split_text_into_lines(wordlevel_info_modified)
  # print (linelevel_subtitles)

  # ##############

  for line in linelevel_subtitles:
    json_str = json.dumps(line, indent=4)
    # print(line)

  #########################
  font = r"L:\CMR\Backend\method\Akshar.ttf"

  def create_caption(textJSON, framesize,font = font ,color='white', highlight_color='yellow',stroke_color='white',stroke_width=1.5):
      wordcount = len(textJSON['textcontents'])
      full_duration = textJSON['end']-textJSON['start']

      word_clips = []
      xy_textclips_positions =[]

      x_pos = 0
      y_pos = 0
      line_width = 0  # Total width of words in the current line
      frame_width = framesize[0]
      frame_height = framesize[1]

      x_buffer = frame_width*1/10

      max_line_width = frame_width - 20 * (x_buffer)

      fontsize = int(frame_height * 0.05) #7.5 percent of video height

      space_width = ""
      space_height = ""

      for index,wordJSON in enumerate(textJSON['textcontents']):
        duration = wordJSON['end']-wordJSON['start']
        word_clip = TextClip(wordJSON['word'], font = font,fontsize=fontsize, color=color,stroke_color=stroke_color,stroke_width=stroke_width).set_start(textJSON['start']).set_duration(full_duration)
        word_clip_space = TextClip(" ", font = font,fontsize=fontsize, color=color).set_start(textJSON['start']).set_duration(full_duration)
        word_width, word_height = word_clip.size
        space_width,space_height = word_clip_space.size
        if line_width + word_width+ space_width <= max_line_width:
              # Store info of each word_clip created
              xy_textclips_positions.append({
                  "x_pos":x_pos,
                  "y_pos": y_pos,
                  "width" : word_width,
                  "height" : word_height,
                  "word": wordJSON['word'],
                  "start": wordJSON['start'],
                  "end": wordJSON['end'],
                  "duration": duration
              })

              word_clip = word_clip.set_position((x_pos, y_pos))
              word_clip_space = word_clip_space.set_position((x_pos+ word_width, y_pos))

              x_pos = x_pos + word_width+ space_width
              line_width = line_width+ word_width + space_width
        else:
              # Move to the next line
              x_pos = 0
              y_pos = y_pos+ word_height+10
              line_width = word_width + space_width

              # Store info of each word_clip created
              xy_textclips_positions.append({
                  "x_pos":x_pos,
                  "y_pos": y_pos,
                  "width" : word_width,
                  "height" : word_height,
                  "word": wordJSON['word'],
                  "start": wordJSON['start'],
                  "end": wordJSON['end'],
                  "duration": duration
              })

              word_clip = word_clip.set_position((x_pos, y_pos))
              word_clip_space = word_clip_space.set_position((x_pos+ word_width , y_pos))
              x_pos = word_width + space_width


        word_clips.append(word_clip)
        word_clips.append(word_clip_space)


      for highlight_word in xy_textclips_positions:

        word_clip_highlight = TextClip(highlight_word['word'], font = font,fontsize=fontsize, color=highlight_color,stroke_color=stroke_color,stroke_width=stroke_width).set_start(highlight_word['start']).set_duration(highlight_word['duration'])
        word_clip_highlight = word_clip_highlight.set_position((highlight_word['x_pos'], highlight_word['y_pos']))
        word_clips.append(word_clip_highlight)

      return word_clips,xy_textclips_positions

  ###################################################

  vid_path = r"L:\CMR\Backend\out\output.mp4"
  input_video = VideoFileClip(vid_path)
  frame_size = input_video.size
  print(frame_size)
  all_linelevel_splits=[]

  for line in linelevel_subtitles:
    out_clips,positions = create_caption(line,frame_size)

    max_width = 0
    max_height = 0

    for position in positions:
      # print (out_clip.pos)
      # break
      x_pos, y_pos = position['x_pos'],position['y_pos']
      width, height = position['width'],position['height']

      max_width = max(max_width, x_pos + width)
      max_height = max(max_height, y_pos + height)  

    color_clip = ColorClip(size=(int(max_width*1.1), int(max_height*1.1)),
                        color=(255, 255, 255))
    color_clip = color_clip.set_opacity(0)
    color_clip = color_clip.set_start(line['start']).set_duration(line['end']-line['start'])

    # centered_clips = [each.set_position('center') for each in out_clips]

    clip_to_overlay = CompositeVideoClip([color_clip]+ out_clips)
    clip_to_overlay = clip_to_overlay.set_position("bottom")

    all_linelevel_splits.append(clip_to_overlay)

  input_video_duration = input_video.duration


  final_video = CompositeVideoClip([input_video] + all_linelevel_splits)

  # Set the audio of the final video to be the same as the input video
  final_video = final_video.set_audio(input_video.audio)

  # Save the final clip as a video file with the audio included
  final_video.write_videofile("s_output.mp4", fps=24, codec="libx264", audio_codec="aac")


# subtitles()