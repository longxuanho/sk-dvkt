import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'toastr-ng2';

import { SuaChuaService } from '../../core/shared/sua-chua.service';
import { SuaChua, TrangThaiSuaChua } from '../../core/shared/sua-chua.model';


@Component({
  selector: 'sk-nhap-lieu-update-huy-bo-form',
  templateUrl: './nhap-lieu-update-huy-bo-form.component.html',
  styleUrls: ['./nhap-lieu-update-huy-bo-form.component.scss']
})
export class NhapLieuUpdateHuyBoFormComponent implements OnInit {

  @Output() goBack = new EventEmitter<boolean>();
  @Input() suaChua: SuaChua;

  removing: boolean = false;

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private suaChuaService: SuaChuaService
  ) { }

  onGoBack() {
    this.goBack.emit(true);
  }

  onRemove() {
    this.removing = true;
    this.suaChuaService.removeSuaChua(this.suaChua.$key)
      .then(success => this.suaChuaService.removeSyncTrangThai(this.suaChua.$key, { trang_thai: TrangThaiSuaChua.DangThucHien }))
      .then(success => this.suaChuaService.removeSyncTrangThai(this.suaChua.$key, { trang_thai: TrangThaiSuaChua.ChuanBiBanGiao }))
      .then(success => this.suaChuaService.removeSyncTrangThai(this.suaChua.$key, { trang_thai: TrangThaiSuaChua.HoanThanh }))
      .then(success => {
        this.removing = false;
        this.toastrService.info('Tất cả dữ liệu về lượt sửa chữa đã được gỡ bỏ khỏi hệ thống.', 'Gỡ bỏ thành công');
        this.router.navigate(['/nhap-lieu']);
      })
      .catch((error: string) => {
        this.removing = false;
        this.toastrService.error(error, 'Opps!');
      });      
  }

  ngOnInit() {
  }

}
