from json import load
from os import environ
from dotenv import load_dotenv

load_dotenv('config/.env')
PORT = environ.get("PORT")
HOST = environ.get("HOST")
