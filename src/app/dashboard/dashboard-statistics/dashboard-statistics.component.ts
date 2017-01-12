import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sk-dashboard-statistics',
  templateUrl: './dashboard-statistics.component.html',
  styleUrls: ['./dashboard-statistics.component.scss']
})
export class DashboardStatisticsComponent implements OnInit {

  @Input() statistics;

  constructor() { }

  ngOnInit() {
  }

}
