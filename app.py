from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient(os.getenv("MONGO_URI"))
db = client['spin_wheel_game']
collection = db['game_results']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit_result', methods=['POST'])
def submit_result():
    data = request.json
    collection.insert_one(data)  # Save result to MongoDB
    return jsonify({'status': 'success', 'message': 'Result saved!'})

if __name__ == '__main__':
    app.run(debug=True)
