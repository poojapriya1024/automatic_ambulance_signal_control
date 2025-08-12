# Automatic Ambulance Signal Control

A computer vision–based system that uses a pretrained YOLOv8 model to detect ambulances (currently approximated using truck/bus classes) in traffic camera footage and automatically change traffic signals to give them priority.

## Features
- Detects emergency vehicles in real-time from uploaded images or video frames.
- Uses YOLOv8 object detection for accurate detection.
- Flask-based web interface for uploading and processing footage.
- Returns a simple 'yes' or 'no' response for ambulance detection.
- Designed for future integration with real traffic signal controllers.

## Tech Stack
- **Python**
- **Flask** for the web interface
- **YOLOv8** (Ultralytics) for object detection
- **OpenCV** for image processing

## How It Works
1. The user uploads an image through the Flask web interface.
2. The image is processed by the YOLOv8 model (`yolov8n.pt` weights).
3. The system checks if any detected object belongs to the 'truck' or 'bus' COCO class (as a stand-in for ambulances).
4. If a match is found with a confidence score above the set threshold, the system returns "yes". Otherwise, it returns "no".
5. In a real deployment, a "yes" result would trigger the connected traffic signal to turn green for that lane.

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/poojapriya1024/automatic_ambulance_signal_control.git
cd automatic_ambulance_signal_control
```

2. **Install dependencies**
```bash
pip install flask ultralytics opencv-python
```

3. **Download YOLOv8 model weights**
```bash
# The default yolov8n.pt will be downloaded automatically by Ultralytics
# Alternatively, you can manually download from:
# https://github.com/ultralytics/assets/releases/download/v0.0.0/yolov8n.pt
```

4. **Run the app**
```bash
python app.py
```

5. Open your browser and go to:
```
http://127.0.0.1:5000/
```

## API Endpoints

### `/` (GET)
- Serves the HTML upload form.

### `/upload` (POST)
- Accepts an image file upload.
- Returns JSON response:
```json
{ "detected": "yes" }
```
or
```json
{ "detected": "no" }
```

## File Structure
```
automatic_ambulance_signal_control/
│
├── app.py                   # Flask web interface
├── ambulance_detection.py   # YOLOv8 detection logic
├── templates/
│   └── index.html           # Upload form
├── static/                  # Static assets (if any)
└── README.md
```

## Notes
- Current detection uses COCO classes for truck (ID: 7) and bus (ID: 6) as a placeholder for ambulances.
- The confidence threshold is set to 0.60 — adjust in `ambulance_detection.py` if needed.
- For actual ambulance detection, the YOLO model can be retrained with ambulance-specific data.

## Future Improvements
- Train YOLOv8 on ambulance-specific dataset.
- Integrate with real-time video feed instead of static images.
- Connect with actual traffic light controllers for field deployment.
