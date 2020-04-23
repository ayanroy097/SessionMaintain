import json
from urllib.request import urlopen 
import requests
from flask import Flask, render_template, request, jsonify


app = Flask(__name__)
@app.route("/home")
def test_page():
    
    return render_template('index.html')
@app.route("/", methods=["GET", "POST"])
def planetinfo():
    
    page = request.args.get('page')
   
    api_url = f"https://swapi.dev/api/planets/?page={page}" 
    
   
    source = requests.get(api_url)
    # planetdata = source.json()
    return source.json() 
    

app.run(debug=True)