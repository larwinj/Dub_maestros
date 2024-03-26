from moviepy.video.compositing.concatenate import concatenate_videoclips
from moviepy.video.io.VideoFileClip import VideoFileClip
import assemblyai as aai
import os

aai.settings.api_key = "c60240dd459849489d63edb47da6f517"

def summarize_video(audio_url, video):

    config = aai.TranscriptionConfig(auto_highlights=True)

    transcript = aai.Transcriber().transcribe(audio_url, config)

    for result in transcript.auto_highlights.results:
        print(f"Highlight: {result.text}, Count: {result.count}, Rank: {result.rank}, Timestamps: {result.timestamps}")

    video_clip = VideoFileClip(video)
    
    subclips = []

    for result in transcript.auto_highlights.results:
        print(result.text)

        start_time = float('inf')
        end_time = float('-inf')
        
        for ts in result.timestamps:
            if ts.start < start_time:
                start_time = ts.start
            if ts.end > end_time:
                
                end_time = ts.end

        # for res in result.timestamps:
        start_time = max(0, (start_time) / 1000)
        end_time = min(video_clip.duration/1000, (end_time)/1000)

        print(start_time, end_time)

        subclip = video_clip.subclip(start_time, end_time)
        subclips.append(subclip)

    final_clip = concatenate_videoclips(subclips)
    final_clip.write_videofile(r"L:\CMR\Backend\out\output_video_summary.mp4")
    video_clip.close()

# summarize_video(r"L:\CMR\VIDEOSSSS\m.mp3", r"L:\CMR\VIDEOSSSS\m.mp4")


