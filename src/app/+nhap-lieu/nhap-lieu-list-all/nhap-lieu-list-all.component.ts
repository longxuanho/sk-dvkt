import { Component, OnInit, OnDestroy } from '@angular/core';
import { SuaChuaService } from '../../core/shared/sua-chua.service';
import { SuaChua, TrangThaiSuaChua } from '../../core/shared/sua-chua.model';
import { dateTimeDisplayFormat } from '../../core/shared/date-time-format.model';
import { Subscription } from 'rxjs/Subscription';
import { ToastrService } from 'toastr-ng2';

@Component({
  selector: 'sk-nhap-lieu-list-all',
  templateUrl: './nhap-lieu-list-all.component.html',
  styleUrls: ['./nhap-lieu-list-all.component.scss']
})
export class NhapLieuListAllComponent implements OnInit {

  subscriptions: { suachuasCurrent?: Subscription, suachuasDone?: Subscription } = {}
  suachuasCurrent: SuaChua[] = [];
  suachuasDone: SuaChua[] = [];
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
    this.subscriptions.suachuasCurrent = this.suaChuaService.getSuaChuasCurrent().subscribe(
      snapshots => {
        this.suachuasCurrent = <SuaChua[]>snapshots;
      }, (error: Error) => this.toastrService.error(`Không thể truy vấn dữ liệu. ${error.message}`, 'Opps!')
    )
    this.subscriptions.suachuasDone = this.suaChuaService.getSuaChuaDoneToday().subscribe(
      snapshots => {
        this.suachuasDone = <SuaChua[]>snapshots;
      }, (error: Error) => this.toastrService.error(`Không thể truy vấn dữ liệu. ${error.message}`, 'Opps!')
    )
  }

  ngOnDestroy() {
    this.subscriptions.suachuasCurrent.unsubscribe();
    this.subscriptions.suachuasDone.unsubscribe();
  }
  

}
