from json import load
from os import environ
from dotenv import load_dotenv
import app

load_dotenv('config/.env')
PORT = environ.get("PORT")
HOST = environ.get("HOST")
