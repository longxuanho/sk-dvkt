import { Component, OnInit, OnDestroy } from '@angular/core';
import { SuaChuaService } from '../../core/shared/sua-chua.service';
import { SuaChua, TrangThaiSuaChua } from '../../core/shared/sua-chua.model';
import { Subscription } from 'rxjs/Subscription';
import { ToastrService } from 'toastr-ng2';

@Component({
  selector: 'sk-nhap-lieu-list-hoan-thanh',
  templateUrl: './nhap-lieu-list-hoan-thanh.component.html',
  styleUrls: ['./nhap-lieu-list-hoan-thanh.component.scss']
})
export class NhapLieuListHoanThanhComponent implements OnInit {

  subscriptions: { suachuas?: Subscription } = {}
  suachuas: SuaChua[] = [];
  trangThaiSuaChua: any;

  constructor(
    private suaChuaService: SuaChuaService,
    private toastrService: ToastrService
  ) {
    this.trangThaiSuaChua = TrangThaiSuaChua;
  }

  ngOnInit() {
    this.subscriptions.suachuas = this.suaChuaService.getSuaChuasDone().subscribe(
      snapshots => {
        this.suachuas = <SuaChua[]>snapshots;
      }, (error: Error) => this.toastrService.error(`Không thể truy vấn dữ liệu. ${error.message}`, 'Opps!')
    )
  }

  ngOnDestroy() {
    this.subscriptions.suachuas.unsubscribe();
  } 

  
}
