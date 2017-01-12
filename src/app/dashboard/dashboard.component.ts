import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SuaChuaService } from '../core/shared/sua-chua.service';
import { SuaChua, TrangThaiSuaChua } from '../core/shared/sua-chua.model';
import { dateTimeDisplayFormat } from '../core/shared/date-time-format.model';
import { Subscription } from 'rxjs/Subscription';
import { ToastrService } from 'toastr-ng2';

import * as _ from 'lodash';

declare var $: any;

@Component({
  selector: 'sk-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  suachuasCurrentSub: Subscription;
  suachuasDoneSub: Subscription;

  suachuas: SuaChua[] = [];
  suachuasCurrent: SuaChua[] = [];
  suachuasDone: SuaChua[] = [];
  dateTimeDisplayFormat: string;
  statistics = { hoanThanh: 0, chuanBiBanGiao: 0, dangThucHien: 0 }

  constructor(
    private suaChuaService: SuaChuaService,
    private toastrService: ToastrService
  ) {
    this.dateTimeDisplayFormat = dateTimeDisplayFormat;
  }

  mixSuaChuas(suachuasCurrent: SuaChua[], suachuasDone: SuaChua[]) {
    return _.orderBy(_.union(suachuasCurrent, suachuasDone), 'trang_thai', 'desc');
  }

  resolveStatistics(suachuas: SuaChua[]) {
    let statistics = {
      hoanThanh: 0,
      dangThucHien: 0,
      chuanBiBanGiao: 0
    };

    if (suachuas.length) {
      let result = _.groupBy(suachuas, 'trang_thai');
      statistics.hoanThanh = result[TrangThaiSuaChua.HoanThanh] ? result[TrangThaiSuaChua.HoanThanh].length : 0;
      statistics.dangThucHien = result[TrangThaiSuaChua.DangThucHien] ? result[TrangThaiSuaChua.DangThucHien].length : 0;
      statistics.chuanBiBanGiao = result[TrangThaiSuaChua.ChuanBiBanGiao] ? result[TrangThaiSuaChua.ChuanBiBanGiao].length : 0;      
    }

    return statistics;
  }

  ngOnInit() {
    this.suachuasCurrentSub = this.suaChuaService.getSuaChuasCurrent().subscribe(
      snapshots => {
        this.suachuasCurrent = <SuaChua[]>snapshots;
        this.suachuas = this.mixSuaChuas(this.suachuasCurrent, this.suachuasDone);
        this.statistics = this.resolveStatistics(this.suachuas);
      }, (error: Error) => this.toastrService.error(`Không thể truy vấn dữ liệu. ${error.message}`, 'Opps!')
    )
    this.suachuasDoneSub = this.suaChuaService.getSuaChuaDoneToday().subscribe(
      snapshots => {
        this.suachuasDone = <SuaChua[]>snapshots;
        this.suachuas = this.mixSuaChuas(this.suachuasCurrent, this.suachuasDone);
        this.statistics = this.resolveStatistics(this.suachuas);
      }, (error: Error) => this.toastrService.error(`Không thể truy vấn dữ liệu. ${error.message}`, 'Opps!')
    )
  }

  ngAfterViewInit() {
    $('body').addClass("bg-dashboard");
  }

  ngOnDestroy() {
    $('body').removeClass("bg-dashboard");
    this.suachuasCurrentSub.unsubscribe();
    this.suachuasDoneSub.unsubscribe();
  }

}
