// CREATE AN AUDIO ELEMENT FOR AUDIO PLAYBACK
let audioElement = importAudioPlayer;

// ARRAY TO STORE PARSED LYRICS
let lyrics = [];

// CANVAS ELEMENT FOR DISPLAYING LYRICS
const canvas = document.getElementById('lyricsCanvas');

// EVENT LISTENER FOR HANDLING AUDIO FILE SELECTION
document
  .getElementById("importAudioInput")
  .addEventListener("change", handleAudioFile);

// EVENT LISTENER FOR HANDLING SRT FILE SELECTION
document
  .getElementById("srtFile")
  .addEventListener("change", handleSrtFile);

/**
 * HANDLES THE SELECTION OF AN AUDIO FILE.
 * @param {Event} event 
 */
function handleAudioFile(event) {
  const file = event.target.files[0];
  
  if (file) {
    // SET AUDIO SOURCE TO THE SELECTED FILE
    audioElement.src = URL.createObjectURL(file);
    audioElement.controls = true;

    // PLAY AUDIO ONCE LOADED
    audioElement.addEventListener("loadeddata", () => {
      audioElement.play();
    });

    // APPEND AUDIO ELEMENT TO THE BODY
    document.body.appendChild(audioElement);
  }
}

/**
 * HANDLES THE SELECTION OF AN SRT FILE.
 * @param {Event} event 
 */
function handleSrtFile(event) {
  const file = event.target.files[0];

  if (file) {
    // READ SRT FILE CONTENT
    const reader = new FileReader();

    reader.onload = function (e) {
      // PARSE SRT CONTENT AND UPDATE LYRICS ARRAY
      const srtContent = e.target.result;
      lyrics = parseSrt(srtContent);
      // DISPLAY LYRICS ON THE CANVAS
      drawLyrics();
    };

    reader.readAsText(file);
  }
}

/**
 * PARSES SRT CONTENT INTO AN ARRAY OF SUBTITLE OBJECTS.
 * @param {string} srtContent 
 * @returns {Array} Parsed lyrics array
 */
function parseSrt(srtContent) {
  const lines = srtContent.split(/\r?\n/);
  console.log(lines);
   const parsedLyrics = [];
  let currentLyric = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === '') {
      // EMPTY LINE INDICATES THE END OF A SUBTITLE ENTRY
      if (currentLyric.startTime && currentLyric.text) {
        parsedLyrics.push(currentLyric);
        currentLyric = {};
      }
    } else if (!currentLyric.startTime) {
      // THE FIRST NON-EMPTY LINE IS THE START TIME
      const startTimeParts = line.split(' --> ');

      if (startTimeParts.length === 2) {
        currentLyric.startTime = startTimeParts[0];
      } else {
        console.error('Invalid start time format:', line);
      }
    } else {
      // SUBSEQUENT LINES ARE THE TEXT OF THE SUBTITLE
      if (currentLyric.text) {
        currentLyric.text += '\n' + line;
      } else {
        currentLyric.text = line;
      }
    }
  }

  // PUSH THE LAST SUBTITLE IF PRESENT
  if (currentLyric.startTime && currentLyric.text) {
    parsedLyrics.push(currentLyric);
  }

  return parsedLyrics;
}

/**
 * DRAWS LYRICS ON THE CANVAS BASED ON THE CURRENT AUDIO PLAYBACK TIME.
 */
function drawLyrics() {
  const ctx = canvas.getContext("2d");

  audioElement.addEventListener("timeupdate", () => {
    const currentTime = audioElement.currentTime;

    // FIND THE LYRICS FOR THE CURRENT TIME
    const currentLyric = lyrics.find((lyric) => {
      const startTime = convertTimeToSeconds(lyric.startTime);
      const nextLyric = lyrics[lyrics.indexOf(lyric) + 1];

      if (nextLyric) {
        const endTime = convertTimeToSeconds(nextLyric.startTime);
        return currentTime >= startTime && currentTime < endTime;
      }

      return currentTime >= startTime;
    });

    // CLEAR CANVAS
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // DISPLAY CURRENT LYRIC
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

/**
 * CONVERTS A TIME STRING IN "hh:mm:ss" FORMAT TO SECONDS.
 * @param {number} time 
 * @returns {number} Converted time in seconds
 */
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
