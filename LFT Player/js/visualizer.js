window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  const importAudioPlayer = document.getElementById('importAudioPlayer');
  const visualizerSelect = document.getElementById('visualizerSelect');

  let fftSize = 512;
  let bars = [];
  let softVolume = 0;
  let audioPlayer;

  class Bar {
    constructor(x, y, width, height, color, index, visualizer) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.index = index;
      this.visualizer = visualizer;
    }

    update(audioInput) {
      const sound = audioInput * 1000;
      if (sound > this.height) {
        this.height = sound;
      } else {
        this.height -= this.height * 0.03;
      }
    }

    draw(context) {
      context.strokeStyle = this.color;
      context.lineWidth = this.width;
      context.save();

      switch (this.visualizer) {
        case 1:
          context.rotate(this.index * 0.043);
          context.beginPath();
          context.bezierCurveTo(
            this.x / 2,
            this.y / 2,
            this.height,
            this.height,
            this.x,
            this.y
          );
          context.stroke();
          context.restore();
          break;
        case 2:
          context.rotate(this.index);
          context.beginPath();
          context.bezierCurveTo(
            this.x / 2,
            this.y / 2,
            this.height,
            this.height,
            this.x,
            this.y
          );
          context.stroke();
          context.restore();
          break;
        case 3:
          context.rotate(this.index);
          context.beginPath();
          context.bezierCurveTo(
            this.x,
            this.y,
            this.height,
            this.height * 3,
            this.x,
            this.y
          );
          context.stroke();
          context.restore();
          break;
        case 4:
          context.translate(0, 0);
          context.rotate(this.index * 0.03);
          context.scale(0.8, 1 * 0.2);

          context.beginPath();
          context.bezierCurveTo(
            this.x,
            this.y,
            this.height * 2,
            this.height,
            this.x + 2,
            this.y * 2
          );
          context.stroke();
          context.rotate(this.index * 0.02);
          context.beginPath();
          context.stroke();
          context.restore();
          break;
      }
    }
  }

  class AudioPlayer {
    constructor(audioElement, fftSize, audioContext, source) {
      this.audioElement = audioElement;
      this.audioContext = audioContext;
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = fftSize;
      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
      this.source = source;
      this.source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
    }

    getSamples() {
      this.analyser.getByteTimeDomainData(this.dataArray);
      let normSamples = [...this.dataArray].map((e) => e / 128 - 1);
      return normSamples;
    }

    getVolume() {
      this.analyser.getByteTimeDomainData(this.dataArray);
      let normSamples = [...this.dataArray].map((e) => e / 128 - 1);
      let sum = 0;
      for (let i = 0; i < normSamples.length; i++) {
        sum += normSamples[i] * normSamples[i];
      }
      let volume = Math.sqrt(sum / normSamples.length);
      return volume;
    }
  }

  function createBars(selectedValue) {
    for (let i = 1; i < fftSize / 2; i++) {
      let color = 'hsl(' + 100 + i * 2 + ',100%,50%)';
      bars.push(new Bar(0, i * 0.9, 1, 0, color, i, selectedValue));
    }
  }

  function clearBars() {
    bars = [];
  }

  function init(selectedValue) {
    clearBars();
    createBars(selectedValue);

    importAudioPlayer.addEventListener('loadeddata', function () {
      audioPlayer = new AudioPlayer(
        importAudioPlayer,
        fftSize,
        audioContext,
        source
      );
      animate();
    });

    window.addEventListener('resize', function () {
      // Handle window resize if needed
      // canvas.width = window.innerWidth;
      // canvas.height = window.innerHeight;
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (audioPlayer) {
      const samples = audioPlayer.getSamples();
      const volume = audioPlayer.getVolume();

      ctx.save();
      ctx.translate(canvas.width / 2 - 70, canvas.height / 2 + 50);

      bars.forEach(function (bar, i) {
        bar.update(samples[i]);
        bar.draw(ctx);
      });

      ctx.restore();
      softVolume = softVolume * 0.0 + volume * 0.1;

      requestAnimationFrame(animate);
    }
  }

  init(1);

  visualizerSelect.addEventListener('change', function () {
    let selectedValue = visualizerSelect.value;
    init(Number(selectedValue));
  });
});