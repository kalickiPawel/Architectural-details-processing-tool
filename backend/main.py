import sys
import os
from dotenv import load_dotenv
from flask import request
from flask import jsonify
from flask import render_template
from ConnectMongoDB import connect

ROOT_PATH = os.path.dirname(os.path.realpath(__file__))
os.environ.update({'ROOT_PATH': ROOT_PATH})
sys.path.append(os.path.join(ROOT_PATH, 'modules'))

from app import app
app.add_api('swagger.yml')

import logger

load_dotenv()

LOG = logger.get_root_logger(os.environ.get(
    'ROOT_LOGGER', 'root'), filename=os.path.join(ROOT_PATH, 'output.log'))
PORT = "5000"

tasks = [
    {
        'id': 1,
        'title': u'Buy froceries',
        'description': u'Milk, Cheese, Pizza, Fruit, Tylenol',
        'done': False
    },
    {
        'id': 2,
        'title': u'Learn Python',
        'description': u'Need to find a good Python tutorial on the web',
        'done':False
    }
]

@app.route("/todo/api/v1.0/tasks", methods=['GET'])
def get_taks():
    return jsonify({'tasks':tasks})

@app.route("/index.html")
def home():
    return render_template('home.html')


@app.route("/")
def hello():
    coll= connect.db.points                                               
    point = coll.insert({'a':1})
    return "Welcome to Python Flask \n Coll: %s \n Type of coll: %s \n Point: %s \n Type of point %s \n" % (coll, type(coll), point, type(point))


if __name__ == '__main__':
    LOG.info('running environment: %s', os.getenv('APP_ENV'))
    DEBUG=os.getenv('APP_ENV')=='development'
    app.run(host='0.0.0.0', port=int(PORT), debug=DEBUG)
