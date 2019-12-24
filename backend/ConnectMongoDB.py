from pymongo import MongoClient
import configparser


class ConnectMongoDB:
    def __init__(self):
        self.config = self.read_configuration('config.ini')
        [self.client, self.db] = self.connect_db()

    @staticmethod
    def read_configuration(config_file):
        config = configparser.ConfigParser()
        config.read(config_file)
        return config

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


connect = ConnectMongoDB()
print(type(connect))
print(connect)
