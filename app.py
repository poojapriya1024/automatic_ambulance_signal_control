from flask import Flask, request, jsonify, render_template
import os
from ambulance_detection import detect_emergency_vehicles  # Import the detect_emergency_vehicles function

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')  # Serve dynamic HTML from templates

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'})

    # Save the uploaded file
    current_directory = os.getcwd()
    file_path = os.path.join(current_directory, file.filename)
    file.save(file_path)

    # Call the detect_emergency_vehicles function from object_detection.py
    result = detect_emergency_vehicles(file_path)

    # Return "yes" or "no" based on the result
    if result == "yes":
        return jsonify({'detected': 'yes'})
    else:
        return jsonify({'detected': 'no'})

if __name__ == '__main__':
    app.run(debug=True)
