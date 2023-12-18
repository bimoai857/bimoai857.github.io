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
const playBackward=document.getElementById('playBackward');
const playForward=document.getElementById('playForward');
const playlist=document.querySelector(".player__playlistContainer")
const equalizer = document.querySelector(".player__equalizer");

let tracks = [];
let index = 0;

speedControl.addEventListener("input", function () {
  const speed = parseFloat(this.value);
  speedValue.textContent = speed + "x";
  importAudioPlayer.playbackRate = speed;
});

volumeControl.addEventListener("input", function () {
  volumeValue.textContent = Math.round(volumeControl.value * 100) + "%";
  importAudioPlayer.volume = volumeControl.value;
});

importAudioInput.addEventListener("change", function () {

  currentTrack=tracks.length-1;

  const file = Array.from(this.files);

  const track = {
    name: file[0].name,
    url: URL.createObjectURL(file[0]),
    base64: null,
    artist: "",
    album: "",
    genre: "",
    lyrics: "",
  };

  const reader = new FileReader();
  reader.onload = function (e) {
    track.base64 = e.target.result.split(",")[1];
  };
  reader.readAsDataURL(file[0]);

  tracks.push(track);
  console.log(tracks);

  // Play the latest track by default
  if (tracks.length > 0) {
    const latestTrack = tracks[tracks.length - 1];
    importAudioPlayer.src = latestTrack.url;
    importAudioPlayer.load();
    importAudioPlayer.play();

    playButton.classList.remove("fa-circle-play");
    playButton.classList.add("fa-pause");

    createPlaylistButton.style.display = "inline-block";

    playlist.style.display='block';
    equalizer.style.display='block'
  }

});

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

importAudioPlayer.addEventListener("timeupdate", function () {
  const currentTime = importAudioPlayer.currentTime;
  const duration = importAudioPlayer.duration;

  // Convert current time to mm:ss format
  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60);
  const formattedCurrentTime = `${currentMinutes}:${
    currentSeconds < 10 ? "0" : ""
  }${currentSeconds}`;

  // Convert duration to mm:ss format
  let formattedDuration = "00:00"; // Default value in case duration is not finite

  if (isFinite(duration)) {
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);
    formattedDuration = `${durationMinutes}:${
      durationSeconds < 10 ? "0" : ""
    }${durationSeconds}`;
  }

  // Update the progress bar width
  const percent = (currentTime / duration) * 100;
  playbarProgress.style.width = percent + "%";

  // Update the circle position
  const circlePosition = `calc(${percent}% - ${
    playbarCircle.offsetWidth / 2
  }px)`;
  playbarCircle.style.left = circlePosition;

  // Update the displayed time in mm:ss format
  timeProgress.innerHTML = formattedCurrentTime;
  totalDuration.innerHTML = formattedDuration;
});

progressContainer.addEventListener("click", function (e) {

  const boundingRect = this.getBoundingClientRect();
  const offsetX = e.clientX - boundingRect.left;
  const percent = offsetX / boundingRect.width;
  const seekTime = percent * importAudioPlayer.duration;

  // Update the audio player's current time
  importAudioPlayer.currentTime = seekTime;
});

playBackward.addEventListener('click',function(){
    currentTrack-=1;
    if(currentTrack<0){
      currentTrack=tracks.length-1;
    }
    if(tracks[currentTrack].url){
      importAudioPlayer.pause();
    importAudioPlayer.src=tracks[currentTrack].url;
    importAudioPlayer.play()
    }
    else{
      playBase64(tracks[currentTrack].base64)
    }

 
})

playForward.addEventListener('click',function(){
  currentTrack+=1;
  if(currentTrack>tracks.length-1){
    currentTrack=0;
  }
  if(tracks[currentTrack].url){
    importAudioPlayer.pause();
  importAudioPlayer.src=tracks[currentTrack].url;
  importAudioPlayer.play()
  }
  else{
    playBase64(tracks[currentTrack].base64)
  }
  
})