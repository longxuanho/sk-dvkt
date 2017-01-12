import { Component, OnInit, OnDestroy } from '@angular/core';

declare var moment: any;

@Component({
  selector: 'sk-dashboard-clock',
  templateUrl: './dashboard-clock.component.html',
  styleUrls: ['./dashboard-clock.component.scss']
})
export class DashboardClockComponent implements OnInit, OnDestroy {

  currentTime = {
    hour: '0',
    minute: '00',
    suffix: 'SA',
    display: ''  
  };
  showCollon: boolean = false;
  timer: NodeJS.Timer;

  constructor() { }

  ngOnInit() {
    this.timer = setInterval(() => {
      let now = moment();
      this.currentTime.hour = now.format('h');
      this.currentTime.minute = now.format('mm');
      this.currentTime.suffix = now.format('A');
      this.currentTime.display = now.format('dddd, [ngày] DD [tháng] MM [năm] YYYY');
      this.showCollon = !this.showCollon;
    }, 1500);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

}
