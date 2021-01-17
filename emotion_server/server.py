from flask import Flask, jsonify, request
from datetime import datetime
import text2emotion as te

now = datetime.now()
app = Flask(__name__)



start_time = ''

# Stacks
wpm_stack = [[100, datetime.now]]
text_stack = [['this is a test', datetime.now()]]
video_emotion_stack = [[{
    "Angry": "0.0",
    "Disgusted": "0.0",
    "Fearful": "0.0",
    "Happy": "0.0",
    "Neutral": "0.0",
    "Sad": "0.0",
    "Surprised": "0.0"
},
    datetime.now()
]]



@app.route('/', methods=['GET'])
def home():
    return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"

# @app.route('/give/stt', methods=['POST'])
# def give_text():
#     req_data = request.form.to_dict()['text']
#     print(req_data)
#     return 'test'

@app.route('/give/video-emotions', methods=['POST'])
def give_video_emotions():
    video_emotion_stack.append([request.form.to_dict(), datetime.now()])
    return 'success'

@app.route('/get/video-emotions', methods=['GET'])
def get_video_emotions():
    return {'emotions': video_emotion_stack[-1][0]}

@app.route('/give/wpm', methods=['POST'])
def give_wpm():
    wpm_stack.append([request.form.to_dict(), datetime.now()])
    print(request.form.to_dict())
    return 'success'

@app.route('/get/wpm', methods=['GET'])
def get_wpm():
    return {'wpm': wpm_stack[-1][0]}

@app.route('/give/text', methods=['POST'])
def give_text():
    text_stack.append([request.form.to_dict()['text'], datetime.now()])
    return 'success'

@app.route('/get/text', methods=['GET'])
def get_text():
    return text_stack[-1][0]

@app.route('/get/text_emotion', methods=['GET'])
def get_text_emotion():
    if(len(text_stack) > 3):
        phrases = text_stack[-3][0] + ' ' + text_stack[-2][0] + ' ' + text_stack[-1][0]
    else:
        phrases = text_stack[-1][0]

    return te.get_emotion(phrases)

@app.route('/get/start', methods=['GET'])
def start():
    global start_time, wpm_stack, text_stack, video_emotion_stack

    wpm_stack = [[100, datetime.now]]
    text_stack = [[' ', datetime.now()]]
    video_emotion_stack = [[{
        "Angry": "0.0",
        "Disgusted": "0.0",
        "Fearful": "0.0",
        "Happy": "0.0",
        "Neutral": "0.0",
        "Sad": "0.0",
        "Surprised": "0.0"
    },
        datetime.now()
    ]]

    start_time = datetime.now()
    return 'started'

@app.route('/get/interim_combined', methods=['GET'])
def interim_combined():

    if(len(text_stack) > 3):
        phrases = text_stack[-3][0] + ' ' + text_stack[-2][0] + ' ' + text_stack[-1][0]
    else:
        phrases = text_stack[-1][0]

    tem =  te.get_emotion(phrases)

    combined =  {
        'Angry': float(video_emotion_stack[-1][0]['Angry']) + tem['Angry'],
        'Disgusted': float(video_emotion_stack[-1][0]['Disgusted']),
        'Fearful': float(video_emotion_stack[-1][0]['Fearful']) + tem['Fear'],
        'Happy': float(video_emotion_stack[-1][0]['Happy']) + tem['Happy'],
        'Neutral': float(video_emotion_stack[-1][0]['Neutral']) * 1.3,
        'Sad': float(video_emotion_stack[-1][0]['Sad']) + tem['Sad'],
        'Surprised': float(video_emotion_stack[-1][0]['Surprised']) + tem['Surprise']
    }
    print(combined)
    return {'emotions': combined}
    # return 'success'
# {'Happy': 0, 'Angry': 0, 'Surprise': 0, 'Sad': 0, 'Fear': 0}
app.run(port=5555)