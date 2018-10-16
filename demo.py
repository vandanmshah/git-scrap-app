from flask import Flask
from flask import request
from flask_cors import CORS
import urllib2
from bs4 import BeautifulSoup
app = Flask(__name__)
CORS(app)
# install flask
# install flask cors

@app.route('/scrap_git_Data', methods=['POST'])
def srap_data():
    search_str = request.headers['domain']
    finalStr = 'https://github.com/search?&q=' + search_str
    page = urllib2.urlopen(finalStr).read()
    soup = BeautifulSoup(page, "lxml")
    body = soup.find('body')
    return str(body)

if __name__ == '__main__':
   app.run(host= '0.0.0.0')