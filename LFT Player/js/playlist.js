const playerTracks = document.getElementById("player__tracks");
const createPlaylistButton = document.getElementById("createPlaylistButton");
const exportPlaylistButton = document.getElementById("exportPlaylistButton");
const importPlaylistButton = document.getElementById("importPlaylistButton");
const importPlaylistInput = document.getElementById("importPlaylistInput");
const playlistTitle=document.getElementById("playlist__title");
const modal = document.querySelector('.modal');
const modalForm=document.querySelector('.modal__form')
const modalEdit=document.querySelector('.modal__edit')
const modalAlbum=document.querySelector('.modal__album')
const modalGenre=document.querySelector('.modal__genre')
const modalArtist=document.querySelector('.modal__artist')
const modalTitle=document.querySelector('.modal__title')
const srtFile=document.querySelector('#srtFile')
const searchBar=document.querySelector('.searchBar')
const selectDetails=document.getElementById('player__selectDetails');


let filteredTracks=[]
let selectedTracks = [];
let jsonFile=[]
let selectButtonsVisible = false;
let playlistName;

if(tracks.length==0){
  createPlaylistButton.style.display='none'
}
if(selectedTracks.length==0){
  exportPlaylistButton.style.display='none'
}

let renderingTracks=(tracks)=>{
  tracks.forEach((track,index)=>{
    
    const trackElement=document.createElement('div');
    const content = document.createElement("h5");
    content.textContent = track.name;
    trackElement.style.cursor = "pointer";
    trackElement.appendChild(content);
    playerTracks.appendChild(trackElement);
     
    content.addEventListener("click", function () {
      importAudioPlayer.src = track.url;
      importAudioPlayer.load();
      importAudioPlayer.play();
      playbarButton.innerHTML = "Pause";
    });

    
     var trackButton = document.createElement("button");
        trackButton.textContent = "Select";
        trackButton.style.display = "none";
        trackButton.style.background='#121212';
        trackButton.style.color="#389638"
        
  
        trackButton.addEventListener("click", function (event) {
          toggleTrackSelection(track);
        });
        const detailsButton = document.createElement("button");
        detailsButton.textContent = "Details";
        detailsButton.style.background='#121212';
        detailsButton.style.color="#FF8232"

        detailsButton.id=index;

       
  
        const buttonContainer=document.createElement('div');
        buttonContainer.appendChild(detailsButton);
        buttonContainer.appendChild(trackButton);
        buttonContainer.classList.add('player__button')

        detailsButton.addEventListener("click", function (event) {
       

          modalTitle.innerHTML=tracks[event.target.id]['name']
          modalAlbum.value=tracks[event.target.id]['album']
          modalGenre.value=tracks[event.target.id]['genre']
          modalArtist.value=tracks[event.target.id]['artist']
          

  
          modalAlbum.addEventListener('change',function(e){
            editData['album']=e.target.value;
          })
          modalGenre.addEventListener('change',function(e){
            editData['genre']=e.target.value;
  
          })
          modalArtist.addEventListener('change',function(e){
            editData['artist']=e.target.value;
  
          })
          
          srtFile.addEventListener('change', function (e) {
            var file = e.target.files[0];
        
            if (file) {
                var reader = new FileReader();
        
                reader.onload = function (event) {
                    var content = event.target.result;
                    console.log(content);
        
                    // Now you can work with the content of the SRT file
                    // For example, you can parse the SRT content or perform other operations
                };
        
                reader.readAsText(file, 'UTF-8');
            }
            editData['lyrics']=content;
        });

          modal.style.display='block';
  
          modalForm.style.display='block';
  
          modalEdit.id=event.target.id;
          modal.addEventListener('click',function(){
            modal.style.display='none';
            modalForm.style.display='none';
          })
  
        });
        
        console.log(tracks)
        trackElement.appendChild(buttonContainer);
        
        
  })
 
}

searchBar.addEventListener('input', function (e) {

  const searchTerm = e.target.value.toLowerCase(); 

  filteredTracks = tracks.filter((track) =>
    track.name.toLowerCase().includes(searchTerm)
  );
  playerTracks.innerHTML='';
  renderingTracks(filteredTracks)
});



importAudioInput.addEventListener("change", function () {
    searchBar.style.display='block';
    playerTracks.innerHTML='';
    
    renderingTracks(tracks);
  });

  
importPlaylistButton.addEventListener("click", function () {
  importPlaylistInput.click();
});

importPlaylistInput.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const importedTracks = JSON.parse(e.target.result);
      playPlaylist(importedTracks);
    };

    reader.readAsText(file);
  }
});

function playPlaylist(playlist) {
  console.log(playlist);
  if (playlist && playlist.length > 0) {
    // Stop the current playback if any
    importAudioPlayer.pause();

    // Clear existing tracks
    tracks = [];
    playerTracks.innerHTML = "";

   console.log(tracks)
    playlist[0]['tracks'].forEach((importedTrack,index,array) => {
 
        // if(index<array.length-1){
            const track = {
                name: importedTrack.name,
                base64: importedTrack.base64,
              };

              tracks.push(track);

              playlistTitle.innerHTML=playlist[playlist.length-1].name;

              const trackElement = document.createElement("p");
              trackElement.textContent = track.name;
              trackElement.style.cursor = "pointer";

              trackElement.addEventListener("click", function () {
                playBase64(track.base64);
              });

              const trackButton = document.createElement("button");
              trackButton.textContent = "Select";
              trackButton.style.display = "none";

              trackButton.addEventListener("click", function (event) {
                event.stopPropagation();
                toggleTrackSelection(track);
              });

              trackElement.appendChild(trackButton);
              playerTracks.appendChild(trackElement);
        // }

    });

    // Play the first track in the imported playlist
    const firstTrack = tracks[0];
    console.log(firstTrack)
    playBase64(firstTrack.base64);
  }
}

function playBase64(base64Data) {
  importAudioPlayer.src = "data:audio/mp3;base64," + base64Data;
  importAudioPlayer.load();
  importAudioPlayer.play();
  playbarButton.innerHTML = "Pause";
  // You may want to add event listeners for timeupdate and other functionality here
}

function toggleTrackSelection(track) {

  const index = selectedTracks.findIndex(
    (selectedTrack) => selectedTrack.url === track.url
  );
    console.log(track)
  if (index === -1) {
    // Track not in selectedTracks, add it
    selectedTracks.push({
      name: track.name,
      base64: track.base64,
      url:track.url,
      artist:track.artist,
      genre:track.genre,
      album:track.album,
      lyrics:track.lyrics
    });
    console.log(`Track ${track.name} selected`);
  } else {
    // Track already in selectedTracks, remove it
    selectedTracks.splice(index, 1);
    console.log(`Track ${track.name} deselected`);
  }
 
  // Show/Hide "Export Playlist" button based on whether any track is selected
  exportPlaylistButton.style.display = selectedTracks.length > 0 ? "inline-block" : "none";
}

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

playlistTitle.addEventListener("click", togglePlaylistVisibility);

function togglePlaylistVisibility() {
  playerTracks.style.display = playerTracks.style.display === "none" ? "block" : "none";
}

modalEdit.addEventListener('click',editButton);

function editButton(e){

    tracks[e.target.id]['genre']=editData['genre']
    tracks[e.target.id]['artist']=editData['artist']
    tracks[e.target.id]['album']=editData['album']
    tracks[e.target.id]['lyrics']=editData['lyrics']
    modal.click()
    
}
createPlaylistButton.addEventListener("click", function () {
  // Ask for the playlist name
   playlistName = prompt("Enter Playlist Name:");

  if (playlistName) {
    // Toggle the visibility of "Select" buttons for all tracks
    const trackElements = document.querySelectorAll("#player__tracks div ");
  

    selectButtonsVisible = !selectButtonsVisible;

    trackElements.forEach((trackElement) => {
      const trackButton = trackElement.querySelectorAll("button");
      const selectButton = Array.from(trackButton).find(button => button.textContent === 'Select');
      selectButton.style.display = 'block';
    });

   

    // Show/Hide "Export Playlist" button based on whether any track is selected
    exportPlaylistButton.style.display = selectedTracks.length > 0 ? "inline-block" : "none";
    
  }
});

exportPlaylistButton.addEventListener("click", function () {
  // Export selectedTracks to JSON and initiate download
  console.log(selectedTracks)
    // Create and store the playlist object
    const playlistObject = {
      name: playlistName,
      tracks: selectedTracks.map((selectedTrack) => ({
        name: selectedTrack.name,
        base64: selectedTrack.base64,
        artist:selectedTrack.artist,
        genre:selectedTrack.genre,
        album:selectedTrack.album,
        lyrics:selectedTrack.lyrics


      })),
    };
    
    // Add the playlist to the tracks array (if you need it)
    jsonFile.push(playlistObject);
  downloadJSON(jsonFile, "playlist.json");
});
