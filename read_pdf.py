import urllib.request
import json
import os
import subprocess
import sys

def install_and_import(package):
    try:
        import importlib
        importlib.import_module(package)
    except ImportError:
        import pip
        if hasattr(pip, 'main'):
            pip.main(['install', package])
        else:
            subprocess.check_call([sys.executable, '-m', 'pip', 'install', package])
    finally:
        globals()[package] = importlib.import_module(package)

install_and_import('requests')
install_and_import('PyPDF2')

import requests
import PyPDF2
import io

def download_file_from_google_drive(id):
    URL = "https://docs.google.com/uc?export=download"
    session = requests.Session()
    response = session.get(URL, params = { 'id' : id }, stream = True)
    token = get_confirm_token(response)
    if token:
        params = { 'id' : id, 'confirm' : token }
        response = session.get(URL, params = params, stream = True)
    return response.content

def get_confirm_token(response):
    for key, value in response.cookies.items():
        if key.startswith('download_warning'):
            return value
    return None

file_id = '1OkHCoIdRjWj4he-i7y0WGKxawMql9RGV'
pdf_content = download_file_from_google_drive(file_id)

pdf_file = io.BytesIO(pdf_content)
reader = PyPDF2.PdfReader(pdf_file)
text = ""
for page in reader.pages:
    text += page.extract_text() + "\n"

print(text)
