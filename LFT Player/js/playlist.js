
// DOM elements
const playerTracks = document.getElementById("player__tracks");
const createPlaylistButton = document.getElementById("createPlaylistButton");
const exportPlaylistButton = document.getElementById("exportPlaylistButton");
const importPlaylistButton = document.getElementById("importPlaylistButton");
const importPlaylistInput = document.getElementById("importPlaylistInput");
const playlistTitle = document.getElementById("playlistTitle");
const modal = document.querySelector(".modal");
const modalForm = document.querySelector(".modal__form");
const modalEdit = document.querySelector(".modal__edit");
const modalAlbum = document.querySelector(".modal__album");
const modalGenre = document.querySelector(".modal__genre");
const modalArtist = document.querySelector(".modal__artist");
const modalTrackName = document.querySelector(".modal__trackName");
const srtFile = document.querySelector("#srtFile");
const searchBar = document.querySelector(".searchBar");
const selectDetails = document.getElementById("player__selectDetails");
const bands= document.querySelectorAll(".band");
const speed= document.getElementById("speedControl");
const volume= document.getElementById("volumeControl");


// TRACKS AND PLAYLIST-RELATED VARIABLES
let filteredTracks = [];
let selectedTracks = [];
let jsonFile = [];
let selectButtonsVisible = false;
let currentTrack = 0;

// EDIT DATA OBJECT TO STORE TRACK DETAILS FOR EDITING
const editData = { artist: "", album: "", genre: "" };

let playlistName;

// INITIAL VISIBILITY SETUP FOR BUTTONS BASED ON TRACKS AND SELECTED TRACKS
if (tracks.length == 0) {
  createPlaylistButton.style.display = "none";
}
if (selectedTracks.length == 0) {
  exportPlaylistButton.style.display = "none";
}

/**
 * FUNCTION TO RENDER TRACKS
 * @param {Array} tracks
 */
let renderingTracks = (tracks) => {
  tracks.forEach((track, index) => {
    // CREATE TRACK ELEMENT
    const trackElement = document.createElement("div");
    const content = document.createElement("h5");

    content.textContent = track.name;
    trackElement.style.cursor = "pointer";
    trackElement.appendChild(content);
    playerTracks.appendChild(trackElement);

    // EVENT LISTENER FOR PLAYING THE TRACK
    content.addEventListener("click", function () {

      // Resetting bands,speed and VOLUME
      bands.forEach((band) => {
        band.value = 0;
      });
      speed.value=1;
      volume.value=0.5;
      speedValue.innerHTML='1x';
      volumeValue.innerHTML='50%'

      currentTrack = index;
      if (track.base64) {
        playBase64(track.base64);
      } else {
        importAudioPlayer.src = track.url;
        importAudioPlayer.load();
        importAudioPlayer.play();
      }
    });

    // SELECT AND DETAILS BUTTONS
    var trackButton = document.createElement("button");
    trackButton.textContent = "Select";
    trackButton.style.display = "none";
    trackButton.style.background = "#121212";
    trackButton.style.color = "#389638";

    // EVENT LISTENER FOR SELECTING THE TRACK
    trackButton.addEventListener("click", function (event) {
      toggleTrackSelection(track);
    });

    // Details button
    const detailsButton = document.createElement("button");
    detailsButton.textContent = "Details";
    detailsButton.style.background = "#121212";
    detailsButton.style.color = "#FF8232";
    detailsButton.id = index;

    // CONTAINER FOR BUTTONS
    const buttonContainer = document.createElement("div");
    buttonContainer.appendChild(detailsButton);
    buttonContainer.appendChild(trackButton);
    buttonContainer.classList.add("player__button");

    // EVENT LISTENER FOR OPENING DETAILS MODAL
    detailsButton.addEventListener("click", function (event) {
      // POPULATE DETAILS IN THE MODAL
      modalTrackName.innerHTML = tracks[event.target.id]["name"];
      modalTrackName.style.color = "#121212";
      modalAlbum.value = tracks[event.target.id]["album"];
      modalGenre.value = tracks[event.target.id]["genre"];
      modalArtist.value = tracks[event.target.id]["artist"];

      // EVENT LISTENERS FOR EDITING DETAILS
      modalAlbum.addEventListener("change", function (e) {
        editData["album"] = e.target.value;
      });
      modalGenre.addEventListener("change", function (e) {
        editData["genre"] = e.target.value;
      });
      modalArtist.addEventListener("change", function (e) {
        editData["artist"] = e.target.value;
      });

      // SHOW MODAL
      modal.style.display = "block";
      modalForm.style.display = "block";
      modalEdit.id = event.target.id;

      // CLOSE MODAL ON CLICK OUTSIDE
      modal.addEventListener("click", function () {
        modal.style.display = "none";
        modalForm.style.display = "none";
      });
    });

    // APPEND BUTTONS TO THE TRACK ELEMENT
    trackElement.appendChild(buttonContainer);
  });
};

// EVENT LISTENER FOR SEARCH BAR INPUT
searchBar.addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();

  // FILTER TRACKS BASED ON SEARCH TERM
  filteredTracks = tracks.filter((track) => {
    const lowerCaseName = track.name.toLowerCase();
    const lowerCaseAlbum = track.album.toLowerCase();
    const lowerCaseGenre = track.genre.toLowerCase();
    const lowerCaseArtist = track.artist.toLowerCase();

    return (
      lowerCaseName.includes(searchTerm) ||
      lowerCaseAlbum.includes(searchTerm) ||
      lowerCaseGenre.includes(searchTerm) ||
      lowerCaseArtist.includes(searchTerm)
    );
  });

  // CLEAR AND RENDER TRACKS BASED ON THE FILTERED LIST
  playerTracks.innerHTML = "";
  renderingTracks(filteredTracks);
});

// EVENT LISTENER FOR AUDIO INPUT CHANGE
importAudioInput.addEventListener("change", function () {
  searchBar.style.display = "block";
  playerTracks.innerHTML = "";

  // CLEAR AND RENDER TRACKS BASED ON THE FULL TRACK LIST
  renderingTracks(tracks);
});

// EVENT LISTENER FOR PLAYLIST IMPORT BUTTON
importPlaylistButton.addEventListener("click", function () {
  importPlaylistInput.click();
});

// EVENT LISTENER FOR PLAYLIST IMPORT INPUT
importPlaylistInput.addEventListener("change", function () {
  currentTrack = 0;
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const importedTracks = JSON.parse(e.target.result);

      // PLAY THE IMPORTED PLAYLIST
      playPlaylist(importedTracks);
    };

    reader.readAsText(file);
  }

  // SET BUTTON STATES FOR VISIBILITY
  playButton.classList.remove("fa-circle-play");
  playButton.classList.add("fa-pause");
  playlist.style.display = 'block';
  equalizer.style.display = 'block';
});

/**
 * FUNCTION TO PLAY A PLAYLIST
 * @param {json} playlist
 */
function playPlaylist(playlist) {
  if (playlist && playlist.length > 0) {
    // STOP THE CURRENT PLAYBACK IF ANY
    importAudioPlayer.pause();

    // CLEAR EXISTING TRACKS
    tracks = [];
    playlistTitle.innerHTML = playlist[0]["name"];
    playlistTitle.style.color = "#ff8232";
    playlistTitle.style.cursor = "pointer";

    // ADD IMPORTED TRACKS TO THE TRACKS ARRAY
    playlist[0]["tracks"].forEach((importedTrack) => {
      const track = {
        name: importedTrack.name,
        base64: importedTrack.base64,
        url: importedTrack.url,
        artist: importedTrack.artist,
        genre: importedTrack.genre,
        album: importedTrack.album,
      };

      tracks.push(track);
    });

    // RENDER THE IMPORTED TRACKS
    renderingTracks(tracks);

    // PLAY THE FIRST TRACK IN THE IMPORTED PLAYLIST
    const firstTrack = tracks[0];
    playBase64(firstTrack.base64);
  }
}

/**
 * FUNCTION TO PLAY A BASE64-ENCODED TRACK
 * @param {string} base64Data
 */
function playBase64(base64Data) {
  importAudioPlayer.src = "data:audio/mp3;base64," + base64Data;
  importAudioPlayer.load();
  importAudioPlayer.play();
}

/**
 * FUNCTION TO TOGGLE THE SELECTION OF A TRACK
 * @param {object} track
 */
function toggleTrackSelection(track) {
  const index = selectedTracks.findIndex(
    (selectedTrack) => selectedTrack.url === track.url
  );

  if (index === -1) {
    // TRACK NOT IN SELECTEDTRACKS, ADD IT
    selectedTracks.push({
      name: track.name,
      base64: track.base64,
      url: track.url,
      artist: track.artist,
      genre: track.genre,
      album: track.album,
    });
    console.log(`Track ${track.name} selected`);
  } else {
    // TRACK ALREADY IN SELECTEDTRACKS, REMOVE IT
    selectedTracks.splice(index, 1);
    console.log(`Track ${track.name} deselected`);
  }

  // SHOW/HIDE "EXPORT PLAYLIST" BUTTON BASED ON WHETHER ANY TRACK IS SELECTED
  exportPlaylistButton.style.display =
    selectedTracks.length > 0 ? "inline-block" : "none";
}

/**
 * FUNCTION TO DOWNLOAD JSON DATA AS A FILE
 * @param {Array} data
 * @param {string} filename
 */
function downloadJSON(data, filename) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// EVENT LISTENER FOR PLAYLIST TITLE CLICK TO TOGGLE PLAYLIST VISIBILITY
playlistTitle.addEventListener("click", togglePlaylistVisibility);

function togglePlaylistVisibility() {
  playerTracks.style.display =
    playerTracks.style.display === "none" ? "block" : "none";
}

// EVENT LISTENER FOR MODAL EDIT BUTTON
modalEdit.addEventListener("click", editButton);

function editButton(e) {
  // UPDATE THE TRACK DETAILS WITH EDITED DATA
  tracks[e.target.id]["genre"] = editData["genre"];
  tracks[e.target.id]["artist"] = editData["artist"];
  tracks[e.target.id]["album"] = editData["album"];
  

  // CLOSE THE MODAL
  modal.click();
}

// EVENT LISTENER FOR CREATE PLAYLIST BUTTON
createPlaylistButton.addEventListener("click", function () {
  // ASK FOR THE PLAYLIST NAME
  playlistName = prompt("Enter Playlist Name:");

  if (playlistName) {
    // TOGGLE THE VISIBILITY OF "SELECT" BUTTONS FOR ALL TRACKS
    const trackElements = document.querySelectorAll("#player__tracks div ");

    selectButtonsVisible = !selectButtonsVisible;

    trackElements.forEach((trackElement) => {
      const trackButton = trackElement.querySelectorAll("button");
      const selectButton = Array.from(trackButton).find(
        (button) => button.textContent === "Select"
      );
      selectButton.style.display = "block";
    });

    // SHOW/HIDE "EXPORT PLAYLIST" BUTTON BASED ON WHETHER ANY TRACK IS SELECTED
    exportPlaylistButton.style.display =
      selectedTracks.length > 0 ? "inline-block" : "none";
  }
});

// Event listener for export playlist button
exportPlaylistButton.addEventListener("click", function () {
  // Export selectedTracks to JSON and initiate download

  // CREATE AND STORE THE PLAYLIST OBJECT
  const playlistObject = {
    name: playlistName,
    tracks: selectedTracks.map((selectedTrack) => ({
      name: selectedTrack.name,
      base64: selectedTrack.base64,
      artist: selectedTrack.artist,
      genre: selectedTrack.genre,
      album: selectedTrack.album,
     
    })),
  };

  // ADD THE PLAYLIST TO THE JSONFILE ARRAY (IF NEEDED)
  jsonFile.push(playlistObject);

  // DOWNLOAD THE JSON FILE
  downloadJSON(jsonFile, "playlist.json");
});
