// DOM ELEMENTS
const importAudioPlayer = document.getElementById("importAudioPlayer");
const playButton = document.getElementById("playButton");
const progressContainer = document.querySelector(".playbar__progressContainer");
const playbarProgress = document.getElementById("progress");
const playbarCircle = document.getElementById("circle");
const timeProgress = document.querySelector(".playbar__timeProgress");
const totalDuration = document.querySelector(".playbar__duration");
const volumeControl = document.getElementById("volumeControl");
const volumeValue = document.getElementById("volumeValue");

const speedControl = document.getElementById("speedControl");
const speedValue = document.getElementById("speedValue");
const playBackward = document.getElementById('playBackward');
const playForward = document.getElementById('playForward');
const playlist = document.querySelector(".player__playlistContainer");
const equalizer = document.querySelector(".player__equalizer");

let tracks = [];


// EVENT LISTENER FOR SPEED CONTROL INPUT
speedControl.addEventListener("input", function () {
  const speed = parseFloat(this.value);
  speedValue.textContent = speed + "x";
  importAudioPlayer.playbackRate = speed;
});

// EVENT LISTENER FOR VOLUME CONTROL INPUT
volumeControl.addEventListener("input", function () {
  volumeValue.textContent = Math.round(volumeControl.value * 100) + "%";
  importAudioPlayer.volume = volumeControl.value;
});

// EVENT LISTENER FOR AUDIO INPUT CHANGE
importAudioInput.addEventListener("change", function () {
  // SET THE CURRENT TRACK TO THE LAST TRACK IN THE ARRAY
  currentTrack = tracks.length - 1;

  // GET THE SELECTED AUDIO FILE
  const file = Array.from(this.files);

  // CREATE A TRACK OBJECT
  const track = {
    name: file[0].name,
    url: URL.createObjectURL(file[0]),
    base64: null,
    artist: "",
    album: "",
    genre: "",
    lyrics: "",
  };

  // READ THE BASE64 DATA FROM THE FILE
  const reader = new FileReader();
  reader.onload = function (e) {
    track.base64 = e.target.result.split(",")[1];
  };
  reader.readAsDataURL(file[0]);

  // ADD THE TRACK TO THE TRACKS ARRAY
  tracks.push(track);

  // PLAY THE LATEST TRACK BY DEFAULT
  if (tracks.length > 0) {
    const latestTrack = tracks[tracks.length - 1];
    importAudioPlayer.src = latestTrack.url;
    importAudioPlayer.load();
    importAudioPlayer.play();

    // UPDATE UI AND DISPLAY PLAYLIST AND EQUALIZER
    playButton.classList.remove("fa-circle-play");
    playButton.classList.add("fa-pause");
    createPlaylistButton.style.display = "inline-block";
    playlist.style.display = 'block';
    equalizer.style.display = 'block';
  }
});

// EVENT LISTENER FOR PLAY/PAUSE BUTTON
playButton.addEventListener("click", function () {
  if (importAudioPlayer.src) {
    if (playButton.classList.contains("fa-circle-play")) {
      importAudioPlayer.play();
      playButton.classList.remove("fa-circle-play");
      playButton.classList.add("fa-pause");
    } else {
      importAudioPlayer.pause();
      playButton.classList.remove("fa-pause");
      playButton.classList.add("fa-circle-play");
    }
  }
});

// EVENT LISTENER FOR TIME UPDATE ON THE AUDIO PLAYER
importAudioPlayer.addEventListener("timeupdate", function () {
  const currentTime = importAudioPlayer.currentTime;
  const duration = importAudioPlayer.duration;

  // CONVERT CURRENT TIME TO MM:SS FORMAT
  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60);
  const formattedCurrentTime = `${currentMinutes}:${currentSeconds < 10 ? "0" : ""}${currentSeconds}`;

  // CONVERT DURATION TO MM:SS FORMAT
  let formattedDuration = "00:00"; // DEFAULT VALUE IN CASE DURATION IS NOT FINITE
  if (isFinite(duration)) {
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);
    formattedDuration = `${durationMinutes}:${durationSeconds < 10 ? "0" : ""}${durationSeconds}`;
  }

  // UPDATE THE PROGRESS BAR WIDTH
  const percent = (currentTime / duration) * 100;
  playbarProgress.style.width = percent + "%";

  // UPDATE THE CIRCLE POSITION
  const circlePosition = `calc(${percent}% - ${playbarCircle.offsetWidth / 2}px)`;
  playbarCircle.style.left = circlePosition;

  // UPDATE THE DISPLAYED TIME IN MM:SS FORMAT
  timeProgress.innerHTML = formattedCurrentTime;
  totalDuration.innerHTML = formattedDuration;
});

// EVENT LISTENER FOR PROGRESS CONTAINER CLICK
progressContainer.addEventListener("click", function (e) {
  const boundingRect = this.getBoundingClientRect();
  const offsetX = e.clientX - boundingRect.left;
  const percent = offsetX / boundingRect.width;
  const seekTime = percent * importAudioPlayer.duration;

  // UPDATE THE AUDIO PLAYER'S CURRENT TIME
  importAudioPlayer.currentTime = seekTime;
});

// EVENT LISTENER FOR PLAY BACKWARD BUTTON
playBackward.addEventListener('click', function () {
  currentTrack -= 1;
  if (currentTrack < 0) {
    currentTrack = tracks.length - 1;
  }
  if (tracks[currentTrack].url) {
    importAudioPlayer.pause();
    importAudioPlayer.src = tracks[currentTrack].url;
    importAudioPlayer.play();
  } else {
    playBase64(tracks[currentTrack].base64);
  }
});

// EVENT LISTENER FOR PLAY FORWARD BUTTON
playForward.addEventListener('click', function () {
  currentTrack += 1;
  if (currentTrack > tracks.length - 1) {
    currentTrack = 0;
  }
  if (tracks[currentTrack].url) {
    importAudioPlayer.pause();
    importAudioPlayer.src = tracks[currentTrack].url;
    importAudioPlayer.play();
  } else {
    playBase64(tracks[currentTrack].base64);
  }
});
