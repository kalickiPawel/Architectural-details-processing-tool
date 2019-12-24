import sys
import os
from dotenv import load_dotenv
from flask import request
from ConnectMongoDB import connect
import json

ROOT_PATH = os.path.dirname(os.path.realpath(__file__))
os.environ.update({'ROOT_PATH': ROOT_PATH})
sys.path.append(os.path.join(ROOT_PATH, 'modules'))

from app import app
import logger

load_dotenv()

LOG = logger.get_root_logger(os.environ.get(
    'ROOT_LOGGER', 'root'), filename=os.path.join(ROOT_PATH, 'output.log'))
PORT = os.getenv('BACKEND_PORT')

client, db = connect.connect_db()

@app.route("/")
def hello():
    return "Welcome to Python Flask \n Client:  %s \n DB: %s \n" % (client, db)


if __name__ == '__main__':
    LOG.info('running environment: %s', os.getenv('APP_ENV'))
    app.config['DEBUG'] = os.getenv('APP_ENV') == 'development'
    app.run(host='0.0.0.0', port=int(PORT))
