import { Howl, Howler } from 'howler';

export class HowlerUtil {
  howl: Howl;

  canvas;
  analyser;
  bufferLength;
  dataArray;
  constructor(name: string, canvas) {
    this.howl = new Howl({
      src: [name],
      autoplay: false,
      vaolume: 1.0,
      rate: 1.0,
      loop: true
    });

    // this.howl.on("load", () => {

    // });

    this.canvas = canvas;

    console.log(this.canvas);
    this.analayser();
  }

  play() {
    this.howl.play();
  }
  pause() {
    this.howl.fade(1, 0, 3000);
    // this.sound.pause();
  }
  stop() {
    this.howl.stop();
  }

  analayser() {
    const ctx = Howler.ctx;
    this.analyser = ctx.createAnalyser();
    Howler.masterGain.connect(this.analyser);
    this.analyser.connect(ctx.destination);

    this.play();

    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;

    this.dataArray = new Uint8Array(this.bufferLength);

    this.draw();

    // setInterval(function () {
    // analyser.getByteTimeDomainData(dataArray);
    // console.dir(dataArray);
    // }, 3000);

  }

  draw() {
    console.log("draw");
    const drawVisual = requestAnimationFrame(this.draw.bind(this));

    this.analyser.getByteTimeDomainData(this.dataArray);

    const canvasCtx = this.canvas.getContext("2d");

    canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(255, 255, 255)';
    canvasCtx.beginPath();

    const sliceWidth = this.canvas.width * 1.0 / this.bufferLength;
    let x = 0;
    for (let i = 0; i < this.bufferLength; i++) {

      var v = this.dataArray[i] / 128.0;
      var y = v * this.canvas.height / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }
    canvasCtx.lineTo(this.canvas.width, this.canvas.height / 2);
    canvasCtx.stroke();
  }
}