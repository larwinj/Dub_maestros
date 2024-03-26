import os

def delete_files_in_folder(folder_path):
    [os.remove(os.path.join(folder_path, file_name)) for file_name in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path,file_name))]
