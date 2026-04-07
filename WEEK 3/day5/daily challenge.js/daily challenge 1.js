/* ADD THIS LOGIC TO YOUR SCRIPT TAG 
  To implement a "Record & Replay" Daily Challenge 
*/

let recording = [];
let isRecording = false;
let startTime;

// 1. Function to handle recording the time of each hit
function recordHit(keyCode) {
    if (!isRecording) return;
    const timeOffset = Date.now() - startTime;
    recording.push({ keyCode, timeOffset });
}

// 2. Wrap your existing playSound function to include recording
const originalPlaySound = playSound;
window.playSound = function(e) {
    const keyCode = e.keyCode || this.getAttribute('data-key');
    originalPlaySound(e);
    if (isRecording) recordHit(keyCode);
};

// 3. Replay Function
function playSequence() {
    if (recording.length === 0) return alert("Record something first!");
    
    recording.forEach(hit => {
        setTimeout(() => {
            // Simulate a key event to trigger your existing playSound
            const event = { keyCode: hit.keyCode };
            originalPlaySound(event);
        }, hit.timeOffset);
    });
}

/* HTML ADDITIONS:
  Add these buttons above your <div class="keys">
  <button id="record">Start Recording</button>
  <button id="play-back">Play Back</button>
*/

// Button Listeners
document.getElementById('record').addEventListener('click', function() {
    isRecording = !isRecording;
    this.innerText = isRecording ? "Stop Recording" : "Start Recording";
    if (isRecording) {
        recording = [];
        startTime = Date.now();
    }
});

document.getElementById('play-back').addEventListener('click', playSequence);