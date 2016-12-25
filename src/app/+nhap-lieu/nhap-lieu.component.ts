import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NhapLieuHelperService } from './shared/nhap-lieu-helper.service';
import { ToastrService } from 'toastr-ng2';

@Component({
  selector: 'sk-nhap-lieu',
  templateUrl: './nhap-lieu.component.html',
  styleUrls: ['./nhap-lieu.component.scss']
})
export class NhapLieuComponent implements OnInit {

  subscriptions: any = {};
  dataHelper: any = {
    loaiSuaChuas: [],
    loaiThietBis: [],
    maThietBis: {},
    khuVucs: [],
    viTris: {}
  };

  constructor(
    private nhapLieuHelperService: NhapLieuHelperService,
    private toastrService: ToastrService
  ) { }

  getLoaiSuaChuas() {
    this.subscriptions.loaiSuaChuas = this.nhapLieuHelperService.getLoaiSuaChuas().subscribe(
      loaiSuaChuas => this.nhapLieuHelperService.setDataHelper({ loaiSuaChuas }),
      error => this.toastrService.error(`Lỗi: ${<any>error}`, 'Opps!')      
    );
  }

  getLoaiThietBis() {
    this.subscriptions.loaiThietBis = this.nhapLieuHelperService.getLoaiThietBis().subscribe(
      loaiThietBis => this.nhapLieuHelperService.setDataHelper({ loaiThietBis }),
      error => this.toastrService.error(`Lỗi: ${<any>error}`, 'Opps!') 
    );
  }

  getMaThietBis() {
    this.subscriptions.maThietBis = this.nhapLieuHelperService.getMaThietBis().subscribe(
      maThietBis => this.nhapLieuHelperService.setDataHelper({ maThietBis }),
      error => this.toastrService.error(`Lỗi: ${<any>error}`, 'Opps!') 
    );
  }

  getKhuVucs() {
    this.subscriptions.khuVucs = this.nhapLieuHelperService.getKhuVucs().subscribe(
      khuVucs => this.nhapLieuHelperService.setDataHelper({ khuVucs }),
      error => this.toastrService.error(`Lỗi: ${<any>error}`, 'Opps!') 
    );
  }

  getViTris() {
    this.subscriptions.viTris = this.nhapLieuHelperService.getViTris().subscribe(
      viTris => this.nhapLieuHelperService.setDataHelper({ viTris }),
      error => this.toastrService.error(`Lỗi: ${<any>error}`, 'Opps!') 
    );
  }

  ngOnInit() {
    this.getLoaiSuaChuas();
    this.getLoaiThietBis();
    this.getMaThietBis();
    this.getKhuVucs();
    this.getViTris();
  }

  ngOnDestroy() {
    this.subscriptions.loaiSuaChuas.unsubscribe();
    this.subscriptions.loaiThietBis.unsubscribe();
    this.subscriptions.maThietBis.unsubscribe();
    this.subscriptions.khuVucs.unsubscribe();
    this.subscriptions.viTris.unsubscribe();
  }
}
