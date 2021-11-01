from json import load
from os import environ
from dotenv import load_dotenv
import app

if app.debug == True:
    load_dotenv('.env')
else:
    load_dotenv('.env.production')
    
PORT = environ.get("PORT")
HOST = environ.get("HOST")
