from flask import Flask, jsonify, request
from datetime import datetime

now = datetime.now()
app = Flask(__name__)

# Stacks
wpm_stack = []
text_stack = []
video_emotion_stack = [
{ # spoof data
    "Angry": "0.0",
    "Disgusted": "0.0",
    "Fearful": "0.06803891649304891",
    "Happy": "2.861338003571727e-09",
    "Neutral": "0.4986287395159417",
    "Sad": "0.0",
    "Surprised": "0.4333323403508195"
},
    datetime.now()
]



@app.route('/', methods=['GET'])
def home():
    return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"

@app.route('/give/stt', methods=['POST'])
def get_text():
    req_data = request.form.to_dict()['text']
    print(req_data)
    return 'test'

@app.route('/give/video-emotions', methods=['POST'])
def give_video_emotions():
    video_emotion_stack.append([request.form.to_dict(), datetime.now()])
    return 200

@app.route('/get/video-emotions', methods=['GET'])
def get_video_emotions():
    return video_emotion_stack[-1][0]

app.run(port=5555)