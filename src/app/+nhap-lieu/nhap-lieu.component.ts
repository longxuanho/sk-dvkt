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
    khuVucs: [],
    viTris: []
  };
  errorMessage: string = '';

  constructor(private nhapLieuHelperService: NhapLieuHelperService) { }

  getLoaiSuaChuas() {
    this.subscriptions.loaiSuaChuas = this.nhapLieuHelperService.getLoaiSuaChuas().subscribe(
      loaiSuaChuas => this.nhapLieuHelperService.setDataHelper({ loaiSuaChuas }),
      error => this.errorMessage = <any>error
    );
  }

  getLoaiThietBis() {
    this.subscriptions.loaiThietBis = this.nhapLieuHelperService.getLoaiThietBis().subscribe(
      loaiThietBis => this.nhapLieuHelperService.setDataHelper({ loaiThietBis }),
      error => this.errorMessage = <any>error
    );
  }

  getKhuVucs() {
    this.subscriptions.khuVucs = this.nhapLieuHelperService.getKhuVucs().subscribe(
      khuVucs => this.nhapLieuHelperService.setDataHelper({ khuVucs }),
      error => this.errorMessage = <any>error
    );
  }

  getViTris() {
    this.subscriptions.viTris = this.nhapLieuHelperService.getViTris().subscribe(
      viTris => this.nhapLieuHelperService.setDataHelper({ viTris }),
      error => this.errorMessage = <any>error
    );
  }

  ngOnInit() {
    this.getLoaiSuaChuas();
    this.getLoaiThietBis();
    this.getKhuVucs();
    this.getViTris();
  }

  ngOnDestroy() {
    this.subscriptions.loaiSuaChuas.unsubscribe();
    this.subscriptions.loaiThietBis.unsubscribe();
    this.subscriptions.khuVucs.unsubscribe();
    this.subscriptions.viTris.unsubscribe();
  }
}
