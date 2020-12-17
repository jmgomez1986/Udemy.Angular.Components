import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnChanges, OnDestroy {
  @Input() init = null;
  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();
  public counter = 0;
  private countdownTimerRef: any = null;
  
  constructor() { }

  ngOnInit() {
    this.startCountdown();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.init.currentValue);
    this.startCountdown();    
  }

  ngOnDestroy(): void {
    this.clearTimeOut();    
  }

  startCountdown() {
    if (this.init && this.init > 0) {
      this.clearTimeOut();
      this.counter = this.init;
      this.doCountdown();
    }
  }

  private clearTimeOut() {
    if (this.countdownTimerRef) {
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }

  doCountdown() {
    this.countdownTimerRef = setTimeout(() => {
      this.counter--;
      this.processCountdown();
    }, 1000);

  }

  processCountdown() {
    this.onDecrease.emit(this.counter);
    // console.log('Count Is: ', this.counter);

    if (this.counter === 0) {
      this.onComplete.emit();
      // console.log('Count End!!!!');
    } else {
      this.doCountdown();
    }
  }

}
