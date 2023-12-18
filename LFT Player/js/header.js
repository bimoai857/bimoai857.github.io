const importAudioButton=document.getElementById('importAudioButton');
const importAudioInput=document.getElementById('importAudioInput');
const displayLyricsVisualizer=document.getElementById('displayLyricsVisualizer');
const visualizerCanvas=document.getElementById('canvas1');
const lyricsCanvas=document.getElementById('lyricsCanvas');
let toggleVisualizer=true;

importAudioButton.addEventListener('click',function(){
    importAudioInput.click();

})

displayLyricsVisualizer.addEventListener('click',function(){
    if(toggleVisualizer){
       
        visualizerCanvas.style.display='none';
        lyricsCanvas.style.display='block'
        displayLyricsVisualizer.innerText='Display Visualizer'
        toggleVisualizer=!toggleVisualizer
    }
    else{
        visualizerCanvas.style.display='block';
        lyricsCanvas.style.display='none'
        displayLyricsVisualizer.innerText='Display Lyrics'
        toggleVisualizer=!toggleVisualizer
    }
  
   
})
