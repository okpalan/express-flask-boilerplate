from re import T, template
from flask import Flask, render_template
app = Flask(__name__)

app.config.from_pyfile('settings.py')


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.debug = False
    app.run(port=app.config.get("PORT"), host=app.config.get("HOST"))