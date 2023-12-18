let audioContext;
let source;
class AudioProcessor {
    constructor(audioElementId, importAudio,importPlaylist) {
      this.audioElement = document.getElementById(audioElementId);
      this.importAudio = document.getElementById(importAudio);
      this.importPlaylist = document.getElementById(importPlaylist);
      this.audioContext = null;
      this.biquadFilters = [];
      this.gainNodes = [];
      this.sliders = [];
      this.initialized = false;
      this.defaultQ = 0.707;
      this.frequencyBands = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000];
  
      // Bind event handlers
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    initializeAudioContext() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
       source = audioContext.createMediaElementSource(this.audioElement);
  
      for (let i = 0; i < 10; i++) {
        const biquadFilter = audioContext.createBiquadFilter();
        biquadFilter.type = "bandpass";
        biquadFilter.frequency.value = this.frequencyBands[i];
        biquadFilter.Q.value = this.defaultQ;
  
        const gainNode = audioContext.createGain();
  
        const slider = document.getElementById(`eq${i + 1}`);
        const label = document.querySelector(`label[for=eq${i + 1}]`);
  
        slider.addEventListener("input", () => this.handleSliderInput(i));
  
        this.biquadFilters.push(biquadFilter);
        this.gainNodes.push(gainNode);
        this.sliders.push(slider);
  
        source.connect(biquadFilter);
        biquadFilter.connect(gainNode);
        gainNode.connect(audioContext.destination);
      }
  
      this.audioElement.addEventListener("canplay", () => source.connect(this.biquadFilters[0]));
  
      this.audioElement.addEventListener("ended", () => audioContext.close());
  
      this.audioElement.addEventListener("loadeddata", () => source.connect(this.biquadFilters[0]));
    }
  
    handleSliderInput(index) {
      const gainNode = this.gainNodes[index];
      const slider = this.sliders[index];
      const gainValue = parseFloat(slider.value);
      gainNode.gain.value = gainValue === 0 ? 0.01 : gainValue;
    }
  
    handleInputChange() {
      if (!this.initialized) {
        this.initializeAudioContext();
        this.initialized = true;
      }
    }
  
    start() {
      this.importAudio.addEventListener("change", this.handleInputChange);
      this.importPlaylist.addEventListener("change", this.handleInputChange);
    }
  }
  
  // Usage
  const audioProcessor = new AudioProcessor("importAudioPlayer", "importAudioInput",'importPlaylistInput');
  audioProcessor.start();
  