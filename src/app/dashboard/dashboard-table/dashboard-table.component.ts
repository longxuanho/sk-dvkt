import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { SuaChua, TrangThaiSuaChua } from '../../core/shared/sua-chua.model';
import { dateTimeDisplayFormat } from '../../core/shared/date-time-format.model';
import { DashboardConfigurations } from '../shared/dashboard.config';


@Component({
  selector: 'sk-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss']
})
export class DashboardTableComponent implements OnInit, OnChanges {

  @Input() suachuas: SuaChua[];

  suaChuaCurrentPage: SuaChua[] = [];
  currentPage: number = 1;
  timer: any;
  dateTimeDisplayFormat;
  trangThaiSuaChua;

  constructor() {
    this.dateTimeDisplayFormat = dateTimeDisplayFormat;
    this.trangThaiSuaChua = TrangThaiSuaChua;
  }

  resolveCurrentPage() {
    if (this.suachuas && this.suachuas.length) {
      let maxIndex = this.suachuas.length - 1;
      let start = DashboardConfigurations.itemsPerPage * (this.currentPage - 1);
      if (start > maxIndex) {
        this.currentPage = 1;
        start = 0;
      }
      let end = start + DashboardConfigurations.itemsPerPage - 1;
      if (end > maxIndex)
        end = maxIndex;
      this.suaChuaCurrentPage = this.suachuas.slice(start, end + 1);
      this.currentPage++;      
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Chú ý ngOnChanges xảy ra trước ngOnInit!
    if (changes.hasOwnProperty('suachuas')) {
      if (changes['suachuas'].currentValue) {
        this.resolveCurrentPage();
      }
    }
  }

  ngOnInit() {
    this.resolveCurrentPage();
    this.timer = setInterval(() => {
      this.resolveCurrentPage();
    }, DashboardConfigurations.transitionTime);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

}
