
document
  .getElementById("importAudioInput")
  .addEventListener("change", handleAudioFile);

document
  .getElementById("srtFile")
  .addEventListener("change", handleSrtFile);

let audioElement=importAudioPlayer;
let lyrics = [];
const canvas = document.getElementById('canvas1');



function handleAudioFile(event) {
  const file = event.target.files[0];
    
  if (file) {
    // audioElement = new Audio();
    audioElement.src = URL.createObjectURL(file);
    audioElement.controls = true;
    audioElement.addEventListener("loadeddata", () => {
      audioElement.play();
    });

    document.body.appendChild(audioElement);
  
  }

}

function handleSrtFile(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const srtContent = e.target.result;
      lyrics = parseSrt(srtContent);
      drawLyrics();
    };

    reader.readAsText(file);
  }
}

function parseSrt(srtContent) {
const lines = srtContent.split(/\r?\n/);
const parsedLyrics = [];
let currentLyric = {};

for (let i = 0; i < lines.length; i++) {
const line = lines[i].trim();

if (line === '') {
// Empty line indicates the end of a subtitle entry
if (currentLyric.startTime && currentLyric.text) {
  parsedLyrics.push(currentLyric);
  currentLyric = {};
}
} else if (!currentLyric.startTime) {
// The first non-empty line is the start time
const startTimeParts = line.split(' --> ');

if (startTimeParts.length === 2) {
  currentLyric.startTime = startTimeParts[0];
} else {
  console.error('Invalid start time format:', line);
}
} else {
// Subsequent lines are the text of the subtitle
if (currentLyric.text) {
  currentLyric.text += '\n' + line;
} else {
  currentLyric.text = line;
}
}
}

// Push the last subtitle if present
if (currentLyric.startTime && currentLyric.text) {
parsedLyrics.push(currentLyric);
}

return parsedLyrics;
}

function drawLyrics() {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  audioElement.addEventListener("timeupdate", () => {
    const currentTime = audioElement.currentTime;

    // Find the lyrics for the current time
    const currentLyric = lyrics.find((lyric) => {
      const startTime = convertTimeToSeconds(lyric.startTime);
      const nextLyric = lyrics[lyrics.indexOf(lyric) + 1];

      if (nextLyric) {
        const endTime = convertTimeToSeconds(nextLyric.startTime);
        return currentTime >= startTime && currentTime < endTime;
      }

      return currentTime >= startTime;
    });

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Display current lyric
    if (currentLyric) {
      ctx.font = "20px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText(
        currentLyric.text,
        canvas.width / 2,
        canvas.height / 2
      );
    }
  });
}

function convertTimeToSeconds(time) {
  if (!time) {
    return 0;
  }

  const timeParts = time.split(":");
  const hours = parseInt(timeParts[0], 10) * 3600;
  const minutes = parseInt(timeParts[1], 10) * 60;
  const seconds = parseFloat(timeParts[2].replace(",", "."));
  return hours + minutes + seconds;
}
