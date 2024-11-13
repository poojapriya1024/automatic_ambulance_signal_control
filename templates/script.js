function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert("Please select a file to upload.");
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const ambulanceDetected = data.detected;
        
        // Update the traffic light and detection buttons
        if (ambulanceDetected === "Yes") {
            changeTrafficLight('green');
            setDetectionButtons(true);
        } else {
            changeTrafficLight('red');
            setDetectionButtons(false);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function changeTrafficLight(color) {
    // Reset all lights to grey
    document.getElementById('red').style.backgroundColor = 'grey';
    document.getElementById('yellow').style.backgroundColor = 'grey';
    document.getElementById('green').style.backgroundColor = 'grey';

    // Set the specified light color
    if (color === 'green') {
        document.getElementById('green').style.backgroundColor = 'green';
    } else if (color === 'red') {
        document.getElementById('red').style.backgroundColor = 'red';
    }
}

function setDetectionButtons(isDetected) {
    // Reset both buttons
    document.getElementById('yesButton').classList.remove('lit', 'off');
    document.getElementById('noButton').classList.remove('lit', 'off');

    // Light up the appropriate button
    if (isDetected) {
        document.getElementById('yesButton').classList.add('lit');
        document.getElementById('noButton').classList.add('off');
    } else {
        document.getElementById('noButton').classList.add('off');
        document.getElementById('yesButton').classList.add('off');
    }
}

function resetTrafficLight() {
    // Reset the traffic light to the initial state (red on)
    changeTrafficLight('red');

    // Remove all classes from Yes and No buttons to reset them
    document.getElementById('yesButton').classList.remove('lit', 'off');
    document.getElementById('noButton').classList.remove('lit', 'off');

    // Hide image and video previews
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('videoPreview').style.display = 'none';
}

function showPreview() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const imagePreview = document.getElementById('imagePreview');
    const videoPreview = document.getElementById('videoPreview');

    if (file) {
        const url = URL.createObjectURL(file);

        // Display image or video based on file type
        if (file.type.startsWith('image/')) {
            imagePreview.src = url;
            imagePreview.style.display = 'block';
            videoPreview.style.display = 'none';
        } else if (file.type.startsWith('video/')) {
            videoPreview.src = url;
            videoPreview.style.display = 'block';
            imagePreview.style.display = 'none';
        }
    }
}
