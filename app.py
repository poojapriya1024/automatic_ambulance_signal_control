from flask import Flask, request, jsonify, render_template
import os 
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

    current_directory = os.getcwd()
    file_path = os.path.join(current_directory, file.filename)
    file.save(file_path)

    result = detect_emergency_vehicles(file_path)

    return jsonify({'detected': result})

def detect_emergency_vehicles(file_path):
    # Replace with actual logic
    return "yes"  # Assume ambulance detected

if __name__ == '__main__':
    app.run(debug=True)
