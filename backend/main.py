import sys
import os
from dotenv import load_dotenv
from flask_cors import CORS

ROOT_PATH = os.path.dirname(os.path.realpath(__file__))
os.environ.update({'ROOT_PATH': ROOT_PATH})
sys.path.append(os.path.join(ROOT_PATH, 'modules'))

from interp_tool import app
app.add_api('swagger.yml')
CORS(app.app)

import logger

load_dotenv()

LOG = logger.get_root_logger(os.environ.get(
    'ROOT_LOGGER', 'root'), filename=os.path.join(ROOT_PATH, 'output.log'))

@app.route("/")
def hello():
    LOG.info('running home page')
    return "Welcome to Interpolation WebTool \n"


if __name__ == '__main__':
    LOG.info('running environment: %s', os.getenv('APP_ENV'))
    PORT = "5000"
    DEBUG=os.getenv('APP_ENV')=='development'
    app.run(host='0.0.0.0', port=int(PORT), debug=DEBUG)
