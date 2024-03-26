# import torch

# def denoise():
#   name = 'small_slow' 
#   device = torch.device('cpu')
#   model, samples, utils = torch.hub.load(
#     repo_or_dir='snakers4/silero-models',
#     model='silero_denoise',
#     name=name,
#     device=device)
#   (read_audio, save_audio, denoise) = utils
#   output, sr = denoise(model, 'final.mp3', 'final_result.wav', device='cpu')
#   print(output, sr)