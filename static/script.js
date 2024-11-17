function showPreview() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const imagePreview = document.getElementById('imagePreview');
    const videoPreview = document.getElementById('videoPreview');

    if (file) {
        const fileType = file.type.split('/')[0];
        if (fileType === 'image') {
            videoPreview.style.display = 'none';
            imagePreview.style.display = 'block';
            imagePreview.src = URL.createObjectURL(file);
        } else if (fileType === 'video') {
            imagePreview.style.display = 'none';
            videoPreview.style.display = 'block';
            videoPreview.src = URL.createObjectURL(file);
        }
    }
}

function uploadFile() {
    showPreview();
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();

    // Ensure a file has been selected
    if (!fileInput.files.length) {
        alert("Please select a file to upload.");
        return;
    }

    formData.append('file', fileInput.files[0]);

    // Make the POST request to the Flask backend
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            const result = data.detected;
            updateDetectionResult(result);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while processing the file.");
    });
}

function updateDetectionResult(result) {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const redLight = document.getElementById('red');
    const greenLight = document.getElementById('green');
    const greenSound = document.getElementById('greenSound');

    if (result === 'yes') {
        yesButton.style.backgroundColor = 'green';
        noButton.style.backgroundColor = '';
        greenLight.style.backgroundColor = 'green';
        redLight.style.backgroundColor = 'rgb(210, 197, 197)';
        greenSound.play();
    } else {
        noButton.style.backgroundColor = 'red';
        yesButton.style.backgroundColor = '';
        redLight.style.backgroundColor = 'red';
        greenLight.style.backgroundColor = '';
    }
}

// function resetTrafficLight() {
//     const yesButton = document.getElementById('yesButton');
//     const noButton = document.getElementById('noButton');
//     const redLight = document.getElementById('red');
//     const yellowLight = document.getElementById('yellow');
//     const greenLight = document.getElementById('green');

//     yesButton.style.backgroundColor = '';
//     noButton.style.backgroundColor = '';
//     redLight.style.backgroundColor = 'red';
//     yellowLight.style.backgroundColor = '';
//     greenLight.style.backgroundColor = '';
//     alert("Traffic signal reset!");
// }

function resetTrafficLight() {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const redLight = document.getElementById('red');
    const yellowLight = document.getElementById('yellow');
    const greenLight = document.getElementById('green');
    const imagePreview = document.getElementById('imagePreview');
    const videoPreview = document.getElementById('videoPreview');
    const thumbnailBox = document.querySelector('.thumbnail-box'); // Select the thumbnail box

    // Reset button colors and traffic light colors
    yesButton.style.backgroundColor = '';
    noButton.style.backgroundColor = '';
    redLight.style.backgroundColor = 'red';
    yellowLight.style.backgroundColor = '';
    greenLight.style.backgroundColor = '';

    // Hide the image or video preview
    imagePreview.style.display = 'none';
    videoPreview.style.display = 'none';

    // Clear the image and video sources (this will remove the content but keep the elements)
    imagePreview.src = '';
    videoPreview.src = '';

    // Optionally, you can also reset the 'fileInput' value if you want to clear the selected file
    document.getElementById('fileInput').value = '';

    //alert("Traffic signal reset.");
}

