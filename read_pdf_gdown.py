import os
import subprocess
import sys

def install_and_import(package):
    try:
        import importlib
        importlib.import_module(package)
    except ImportError:
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', package])

install_and_import('gdown')
install_and_import('PyPDF2')

import gdown
import PyPDF2

file_id = '1OkHCoIdRjWj4he-i7y0WGKxawMql9RGV'
url = f'https://drive.google.com/uc?id={file_id}'
output = 'resume.pdf'

try:
    gdown.download(url, output, quiet=False)
    
    with open(output, 'rb') as pdf_file:
        reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        print("--- RESUME TEXT ---")
        print(text)
except Exception as e:
    print(f"Error: {e}")
