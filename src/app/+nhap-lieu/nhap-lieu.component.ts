import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NhapLieuHelperService } from './shared/nhap-lieu-helper.service';
import { ToastrService } from 'toastr-ng2';
import { MaThietBi } from '../core/shared/sua-chua.model';


@Component({
  selector: 'sk-nhap-lieu',
  templateUrl: './nhap-lieu.component.html',
  styleUrls: ['./nhap-lieu.component.scss']
})
export class NhapLieuComponent implements OnInit {

  loaiSuaChuasSub: Subscription;
  loaiThietBisSub: Subscription;
  maThietBisSub: Subscription;
  khuVucsSub: Subscription;
  viTrisSub: Subscription;

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
    this.loaiSuaChuasSub = this.nhapLieuHelperService.getLoaiSuaChuas().subscribe(
      loaiSuaChuas => this.nhapLieuHelperService.setDataHelper({ loaiSuaChuas }),
      error => this.toastrService.error(`Lỗi: ${<any>error}`, 'Opps!')
    );
  }

  getLoaiThietBis() {
    this.loaiThietBisSub = this.nhapLieuHelperService.getLoaiThietBis().subscribe(
      loaiThietBis => this.nhapLieuHelperService.setDataHelper({ loaiThietBis }),
      error => this.toastrService.error(`Lỗi: ${<any>error}`, 'Opps!')
    );
  }

  getMaThietBis() {
    this.maThietBisSub = this.nhapLieuHelperService.getMaThietBis().subscribe(
      (maThietBis: MaThietBi[]) => {
        this.nhapLieuHelperService.setDataHelper({ maThietBis });
      },
      error => this.toastrService.error(`Lỗi: ${<any>error}`, 'Opps!')
    );
  }

  getKhuVucs() {
    this.khuVucsSub = this.nhapLieuHelperService.getKhuVucs().subscribe(
      khuVucs => this.nhapLieuHelperService.setDataHelper({ khuVucs }),
      error => this.toastrService.error(`Lỗi: ${<any>error}`, 'Opps!')
    );
  }

  getViTris() {
    this.viTrisSub = this.nhapLieuHelperService.getViTris().subscribe(
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
    if (this.loaiSuaChuasSub)
      this.loaiSuaChuasSub.unsubscribe();
    if (this.loaiThietBisSub)
      this.loaiThietBisSub.unsubscribe();
    if (this.maThietBisSub)
      this.maThietBisSub.unsubscribe();
    if (this.khuVucsSub)
      this.khuVucsSub.unsubscribe();
    if (this.viTrisSub)
      this.viTrisSub.unsubscribe();
  }
}
