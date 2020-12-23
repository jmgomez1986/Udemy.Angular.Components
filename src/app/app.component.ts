import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit, AfterViewInit {
  public isAddTimerVisible: boolean = false;
  public time: number = 0;
  public timers: Array<number> = [];
  public simpleAlert: ComponentRef<SimpleAlertViewComponent> = null;
  // @ViewChildren(SimpleAlertViewComponent) alerts: QueryList<SimpleAlertViewComponent>;
  @ViewChild('timerInput') timeInput: ElementRef;
  @ViewChild('alert', {read: ViewContainerRef}) alertContainer: ViewContainerRef;

  constructor(
    private renderer: Renderer2,
    private cdRef: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver) {
    this.timers = [3, 20, 185];
  }

  ngAfterViewInit(): void {
    console.log(this.timeInput);
    this.renderer.setAttribute(this.timeInput.nativeElement, "placeholder", "enter seconds");
    this.renderer.addClass(this.timeInput.nativeElement, 'time-in');

    // this.alerts.forEach(item => {
    //   if (!item.title) {
    //     item.title = 'Hi';
    //     item.message = 'Hello world!!!';
    //     item.show();
    //   }
    //   console.log(item);
    // });

    // this.cdRef.detectChanges();
  }

  ngAfterContentInit(): void { }

  logCountdownEnd() {
    console.log('The Countdown Has Finished!!!')
  }

  public showAddTimer() {
    this.isAddTimerVisible = true;
    setTimeout(()=>{
      this.renderer.selectRootElement(this.timeInput.nativeElement).focus();
    });
  }

  public hideAddTimer() {
    this.isAddTimerVisible = false;
  }

  public showEndTimerAlert() {
    // this.alerts.first.show();

    const alertViewFactory = this.resolver.resolveComponentFactory(SimpleAlertViewComponent);

    this.simpleAlert = this.alertContainer.createComponent(alertViewFactory);

    this.simpleAlert.instance.title = 'Timer ended';
    this.simpleAlert.instance.message= 'Your countdown has finished!!!';
    this.simpleAlert.instance.onDismiss.subscribe(()=>{
      this.simpleAlert.destroy();
      console.log('Dismissed!!!');
    });
    console.log(this.simpleAlert.instance);

    this.simpleAlert.instance.show();

  }

  public submitAddTimer() {
    this.timers.push(this.time);
    this.hideAddTimer();
  }

}
