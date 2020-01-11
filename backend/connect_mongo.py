from pymongo import MongoClient
import configparser
import os
import sys

ROOT_PATH = os.path.dirname(os.path.realpath(__file__))
os.environ.update({'ROOT_PATH': ROOT_PATH})
sys.path.append(os.path.join(ROOT_PATH, 'modules'))

import logger

LOG = logger.get_root_logger(os.environ.get(
    'ROOT_LOGGER', 'root'), filename=os.path.join(ROOT_PATH, 'output.log'))


class ConnectMongoDB:
    def __init__(self):
        self.config = self.read_configuration('config.ini')
        [self.client, self.db] = self.connect_db()
        LOG.info('Created object Database connection %s', self.client)

    @staticmethod
    def read_configuration(config_file):
        config = configparser.ConfigParser()
        config.read(config_file)
        return config

    def get_collection(self, collection):
        list_collections = self.db.list_collection_names()
        if collection in list_collections:
            LOG.info('Collection <<%s>> exist', collection)
        else:
            LOG.info('Collection <<%s>> created', collection)
        return self.db[collection]

    def connect_db(self):
        uri = uri = "mongodb://%s:%s@%s:%s" % (
            self.config['mongo']['username'],
            self.config['mongo']['password'],
            self.config['mongo']['host'],
            self.config['mongo']['port']
        )
        client = MongoClient(uri)
        db = client[self.config['mongo']['dbname']]
        return client, db
