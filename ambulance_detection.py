from ultralytics import YOLO
import cv2

def detect_emergency_vehicles(image_path):
    # Load pre-trained YOLOv8 model
    model = YOLO('yolov8n.pt')

    # Detect objects in an image
    results = model(image_path)  # This returns a list of result objects

    # Access the first result
    result = results[0]

    # Filter for trucks/buses
    truck_class_id = 7  # COCO class ID for truck
    bus_class_id = 6    # COCO class ID for bus
    threshold = 0.60     # Confidence threshold for detection

    # Combine trucks and buses into one list
    vehicles = [box for box in result.boxes if int(box.cls) in [truck_class_id, bus_class_id]]

    # Check if any vehicle is detected with confidence greater than threshold
    for vehicle in vehicles:
        conf = float(vehicle.conf)  # Convert tensor to float
        if conf > threshold:
            return "yes"  # Return "yes" if vehicle detected with sufficient confidence

    return "no"  # Return "no" if no vehicle detected with sufficient confidence


