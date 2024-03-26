from transformers import pipeline
import torch


def count_words(paragraph):
    words = paragraph.split()
    num_words = len(words)
    return num_words

def summarize(text, min=1, max=25):
    word_count = count_words(text)
    min = min if min <= word_count else word_count
    max = max if max <= word_count else word_count
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    summary = summarizer(text, max_length=max, min_length=min, do_sample=False)
    summary = summary[0]['summary_text']
    print(min, max, summary)
    return summary