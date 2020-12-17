import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  counterProgress: number;
  totalCountdown: number;

  constructor() {
    this.counterProgress = 0;
    this.totalCountdown = 15;
  }

  updateProgress($event) {
    this.counterProgress = (this.totalCountdown - $event) / this.totalCountdown * 100;
  }

  countdownFinished() {
    console.log('Countdown has finished');
  }

}
