import { Component, OnInit, Input } from '@angular/core';
import { SuaChua, TrangThaiSuaChua } from '../../core/shared/sua-chua.model';
import { dateTimeDisplayFormat } from '../../core/shared/date-time-format.model';



@Component({
  selector: 'sk-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss']
})
export class DashboardTableComponent implements OnInit {

  @Input() suachuas: SuaChua[];
  dateTimeDisplayFormat;
  trangThaiSuaChua;

  constructor() {
    this.dateTimeDisplayFormat = dateTimeDisplayFormat;
    this.trangThaiSuaChua = TrangThaiSuaChua;
  }

  ngOnInit() {
  }

}
