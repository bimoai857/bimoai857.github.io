// DOM elements
const importAudioButton = document.getElementById('importAudioButton');
const importAudioInput = document.getElementById('importAudioInput');
const displayLyricsVisualizer = document.getElementById('displayLyricsVisualizer');
const visualizerCanvas = document.getElementById('canvas1');
const lyricsCanvas = document.getElementById('lyricsCanvas');
const chooseLyrics = document.getElementById('chooseLyrics');
let toggleVisualizer = true;

// EVENT LISTENER FOR CLICKING THE "IMPORT AUDIO" BUTTON
importAudioButton.addEventListener('click', function () {
    // TRIGGER A CLICK ON THE HIDDEN INPUT ELEMENT FOR IMPORTING AUDIO FILES
    importAudioInput.click();
});

// EVENT LISTENER FOR CLICKING THE "DISPLAY LYRICS/VISUALIZER" BUTTON
displayLyricsVisualizer.addEventListener('click', function () {
    if (toggleVisualizer) {
        // IF THE VISUALIZER IS CURRENTLY DISPLAYED, SWITCH TO DISPLAYING LYRICS
        visualizerCanvas.style.display = 'none';
        lyricsCanvas.style.display = 'block';
        displayLyricsVisualizer.innerText = 'Display Visualizer';
        toggleVisualizer = !toggleVisualizer;
    } else {
        // IF LYRICS ARE CURRENTLY DISPLAYED, SWITCH TO DISPLAYING THE VISUALIZER
        visualizerCanvas.style.display = 'block';
        lyricsCanvas.style.display = 'none';
        displayLyricsVisualizer.innerText = 'Display Lyrics';
        toggleVisualizer = !toggleVisualizer;
    }
});

// EVENT LISTENER FOR CLICKING THE "CHOOSE LYRICS" BUTTON
chooseLyrics.addEventListener('click', function () {
  
    srtFile.click();
});

