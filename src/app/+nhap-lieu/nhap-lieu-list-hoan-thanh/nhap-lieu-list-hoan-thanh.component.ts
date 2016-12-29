import { Component, OnInit, OnDestroy } from '@angular/core';
import { SuaChuaService } from '../../core/shared/sua-chua.service';
import { SuaChua, TrangThaiSuaChua } from '../../core/shared/sua-chua.model';
import { Subscription } from 'rxjs/Subscription';
import { ToastrService } from 'toastr-ng2';
import { dateTimeDisplayFormat } from '../../core/shared/date-time-format.model';

@Component({
  selector: 'sk-nhap-lieu-list-hoan-thanh',
  templateUrl: './nhap-lieu-list-hoan-thanh.component.html',
  styleUrls: ['./nhap-lieu-list-hoan-thanh.component.scss']
})
export class NhapLieuListHoanThanhComponent implements OnInit {

  subscriptions: { suachuasDoneToday?: Subscription, suachuasDonePast?: Subscription } = {}
  suachuasDoneToday: SuaChua[] = [];
  suachuasDonePast: SuaChua[] = [];
  
  trangThaiSuaChua: any;
  dateTimeDisplayFormat: string;

  constructor(
    private suaChuaService: SuaChuaService,
    private toastrService: ToastrService
  ) {
    this.trangThaiSuaChua = TrangThaiSuaChua;
    this.dateTimeDisplayFormat = dateTimeDisplayFormat;
  }

  ngOnInit() {
    this.subscriptions.suachuasDoneToday = this.suaChuaService.getSuaChuaDoneToday().subscribe(
      snapshots => {
        this.suachuasDoneToday = <SuaChua[]>snapshots;
      }, (error: Error) => this.toastrService.error(`Không thể truy vấn dữ liệu. ${error.message}`, 'Opps!')
    )
    this.subscriptions.suachuasDonePast = this.suaChuaService.getSuaChuaDonePast().subscribe(
      snapshots => {
        this.suachuasDonePast = <SuaChua[]>snapshots;
      }, (error: Error) => this.toastrService.error(`Không thể truy vấn dữ liệu. ${error.message}`, 'Opps!')
    )
  }

  ngOnDestroy() {
    this.subscriptions.suachuasDoneToday.unsubscribe();
    this.subscriptions.suachuasDonePast.unsubscribe();
  } 

  
}
