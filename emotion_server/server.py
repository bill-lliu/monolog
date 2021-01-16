from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route('/', methods=['GET'])
def home():
    return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"

@app.route('/give/stt', methods=['POST'])
def get_text():
    req_data = request.form.to_dict()['text']
    print(req_data)
    return 'test'

app.run(port=5555)