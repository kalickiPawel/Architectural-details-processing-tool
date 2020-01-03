from flask import Flask

import connexion

app = connexion.FlaskApp(__name__, specification_dir='../../')
