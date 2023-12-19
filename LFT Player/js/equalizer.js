// VARIABLES FOR AUDIO CONTEXT AND AUDIO SOURCE
let audioContext;
let audioSource;

// CLASS DEFINITION FOR AUDIOPROCESSOR
class AudioProcessor {
  /**
   * CONSTRUCTOR FOR AUDIOPROCESSOR CLASS.
   * @param {string} audioElementId 
   * @param {string} importAudio 
   * @param {string} importPlaylist 
   */
  constructor(audioElementId, importAudio, importPlaylist) {
    // DOM ELEMENTS
    this.audioElement = document.getElementById(audioElementId);
    this.importAudio = document.getElementById(importAudio);
    this.importPlaylist = document.getElementById(importPlaylist);

    // AUDIO PROCESSING VARIABLES
    this.audioContext = null;
    this.biquadFilters = [];
    this.gainNodes = [];
    this.sliders = [];
    this.initialized = false;
    this.defaultQ = 0.707;
    this.frequencyBands = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000];

    // EVENT HANDLER BINDING
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * INITIALIZES THE AUDIO CONTEXT AND SETS UP AUDIO PROCESSING NODES.
   */
  initializeAudioContext() {
    // CREATE AUDIO CONTEXT
    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // CREATE AUDIO SOURCE FROM THE AUDIO ELEMENT
    audioSource = audioContext.createMediaElementSource(this.audioElement);

    // CREATE AND CONFIGURE BIQUAD FILTERS, GAIN NODES, AND SLIDERS FOR EQUALIZER BANDS
    for (let i = 0; i < 10; i++) {
      const biquadFilter = audioContext.createBiquadFilter();
      biquadFilter.type = "bandpass";
      biquadFilter.frequency.value = this.frequencyBands[i];
      biquadFilter.Q.value = this.defaultQ;

      const gainNode = audioContext.createGain();

      const slider = document.getElementById(`eq${i + 1}`);
      const label = document.querySelector(`label[for=eq${i + 1}]`);

      // EVENT LISTENER FOR SLIDER INPUT
      slider.addEventListener("input", () => this.handleSliderInput(i));

      // STORE REFERENCES TO CREATED NODES AND ELEMENTS
      this.biquadFilters.push(biquadFilter);
      this.gainNodes.push(gainNode);
      this.sliders.push(slider);

      // CONNECT AUDIO NODES IN THE PROCESSING CHAIN
      audioSource.connect(biquadFilter);
      biquadFilter.connect(gainNode);
      gainNode.connect(audioContext.destination);
    }

    // EVENT LISTENERS FOR AUDIO ELEMENT EVENTS
    this.audioElement.addEventListener("canplay", () => audioSource.connect(this.biquadFilters[0]));
    this.audioElement.addEventListener("ended", () => audioContext.close());
    this.audioElement.addEventListener("loadeddata", () => audioSource.connect(this.biquadFilters[0]));
  }

  /**
   * ADJUSTS THE GAIN OF THE CORRESPONDING BAND.
   * @param {number} index 
   */
  handleSliderInput(index) {
    const gainNode = this.gainNodes[index];
    const slider = this.sliders[index];
    const gainValue = parseFloat(slider.value);
    // SET GAIN VALUE, ENSURING IT'S NOT ZERO TO AVOID AUDIO ISSUES
    gainNode.gain.value = gainValue === 0 ? 0.01 : gainValue;
  }

  /**
   * EVENT HANDLER FOR INPUT CHANGE. INITIALIZES THE AUDIO CONTEXT IF NOT ALREADY DONE.
   */
  handleInputChange() {
    if (!this.initialized) {
      this.initializeAudioContext();
      this.initialized = true;
    }
  }

  /**
   * STARTS THE AUDIO PROCESSOR BY ADDING EVENT LISTENERS TO INPUT ELEMENTS.
   */
  start() {
    this.importAudio.addEventListener("change", this.handleInputChange);
    this.importPlaylist.addEventListener("change", this.handleInputChange);
  }
}

// USAGE
const audioProcessor = new AudioProcessor("importAudioPlayer", "importAudioInput", 'importPlaylistInput');
audioProcessor.start();
