import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

declare var $: any;

@Component({
  selector: 'sk-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('body').addClass("bg-dashboard");
  }

  ngOnDestroy() {
    $('body').removeClass("bg-dashboard")
  }

}
