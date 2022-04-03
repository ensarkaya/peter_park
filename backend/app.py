from email.policy import default
from gettext import NullTranslations
from flask import Flask, jsonify, request, Response, send_file, send_from_directory, abort, request
from re import compile
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config['SECRET_KEY'] = '!secret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/peterpark'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)
app.debug = True
app.host = 'localhost'

class Plates(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    owner = db.Column(db.String(100),nullable=True)
    plate = db.Column(db.String(20),nullable=False)
    start_date = db.Column(db.DateTime, default=datetime.datetime.now)
    end_date = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self,owner,plate,start_date,end_date):
        self.owner = owner
        self.plate = plate
        self.start_date = start_date
        self.end_date = end_date

class PlateSchema(ma.Schema):
    class Meta:
        fields = ('id', 'owner', 'plate', 'start_date', 'end_date')
plate_schema = PlateSchema()
plates_schema = PlateSchema(many=True)


@app.route('/plateList', methods=['GET'])
def plateList():
    all_plates = Plates.query.all()
    results = plates_schema.dump(all_plates)
    return jsonify(results)
    
@app.route('/addPlate', methods=['POST'])
def addPlate():
    plate_format = compile('^[A-Z]{1,3}-[A-Z]{1,2}[1-9]{1}[0-9]{0,3}$')
    plate = request.json['plate']
    #print(plate)
    #request malformed, 400
    if(len(plate) < 1):
        return "malformed",400
    #valide plate, 200
    if plate_format.match(plate) is not None:
        plate = Plates(request.json['owner'],request.json['plate'],request.json['start_date'],request.json['end_date'])
        db.session.add(plate)
        db.session.commit()
        return "Valid plate",200
    #invalid plate, 422
    else:
        return "Invalid plate",422
    