from flask import Flask, jsonify, request, Response, send_file, send_from_directory, abort, request
from re import compile
app = Flask(__name__)
app.config['SECRET_KEY'] = '!secret'
app.debug = True
app.host = 'localhost'

@app.route('/plateList', methods=['GET'])
def plateList():
    if request.method == 'GET':
        return {
            'data': [
                {'id': 0, 'plate': 'M-PP123', 'owner': 'Max0', 'start_date': '2020-09-18T13:21:21Z' , 'end_date' : '2020-09-18T13:21:21Z'},
                {'id': 1, 'plate': 'M-PP124', 'owner': 'Max1', 'start_date': '2020-09-18T13:21:21Z' , 'end_date' : '2020-09-18T13:21:21Z'},
                {'id': 2, 'plate': 'M-PP125', 'owner': 'Max2', 'start_date': '2020-09-18T13:21:21Z' , 'end_date' : '2020-09-18T13:21:21Z'},
                {'id': 3, 'plate': 'M-PP126', 'owner': 'Max3', 'start_date': '2020-09-18T13:21:21Z' , 'end_date' : '2020-09-18T13:21:21Z'},
                {'id': 4, 'plate': 'M-PP127', 'owner': 'Max4', 'start_date': '2020-09-18T13:21:21Z' , 'end_date' : '2020-09-18T13:21:21Z'},
                {'id': 5, 'plate': 'M-PP128', 'owner': 'Max5', 'start_date': '2020-09-18T13:21:21Z' , 'end_date' : '2020-09-18T13:21:21Z'},
                {'id': 6, 'plate': 'M-PP129', 'owner': 'Max6', 'start_date': '2020-09-18T13:21:21Z' , 'end_date' : '2020-09-18T13:21:21Z'},
                {'id': 7, 'plate': 'M-PP133', 'owner': 'Max7', 'start_date': '2020-09-18T13:21:21Z' , 'end_date' : '2020-09-18T13:21:21Z'},
                {'id': 8, 'plate': 'M-PP143', 'owner': 'Max8', 'start_date': '2020-09-18T13:21:21Z' , 'end_date' : '2020-09-18T13:21:21Z'},
            ]
        }
@app.route('/addPlate', methods=['POST'])
def addPlate():
    plate_format = compile('^[A-Z]{1,3}-[A-Z]{1,2}[1-9]{1}[0-9]{0,3}$')
    plate = request.json['plate']
    print(plate)
    #request malformed, 400
    if(len(plate) < 1):
        return "malformed",400
    #valide plate, 200
    if plate_format.match(plate) is not None:
        return "Valid plate",200
    #invalid plate, 422
    else:
        return "Invalid plate",422
    