// Function to set the traffic light color
function setLight(color) {
    // Reset all lights to colorless
    document.getElementById('red-light').classList.remove('red');
    document.getElementById('yellow-light').classList.remove('yellow');
    document.getElementById('green-light').classList.remove('green');
    
    // Set the selected light to the specified color
    if (color === 'red') {
        document.getElementById('red-light').classList.add('red');
    } else if (color === 'yellow') {
        document.getElementById('yellow-light').classList.add('yellow');
    } else if (color === 'green') {
        document.getElementById('green-light').classList.add('green');
    }
}
