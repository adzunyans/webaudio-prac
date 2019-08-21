import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { HowlerUtil } from './HowlerUtil';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'webaudio Practice!';

  howler: HowlerUtil;

  private _el: HTMLElement;

  @ViewChild('canvas', { static: true }) canvas;

  constructor(el: ElementRef) {
    this._el = el.nativeElement;
  }
  ngOnInit() {
    const audioSrc: string = "/assets/Payday.mp3";
    this.howler = new HowlerUtil(audioSrc, this.canvas.nativeElement);

  }

  ngAfterViewInit() {
    // this.howler.play();

  }
}
