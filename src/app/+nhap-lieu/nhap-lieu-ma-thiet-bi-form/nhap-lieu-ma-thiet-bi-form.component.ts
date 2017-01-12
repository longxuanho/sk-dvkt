import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';

import { NhapLieuHelperService } from '../shared/nhap-lieu-helper.service';
import { MaThietBi } from '../../core/shared/sua-chua.model';
import { NavbarSearchService } from '../../core/shared/navbar-search.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'sk-nhap-lieu-ma-thiet-bi-form',
  templateUrl: './nhap-lieu-ma-thiet-bi-form.component.html',
  styleUrls: ['./nhap-lieu-ma-thiet-bi-form.component.scss']
})
export class NhapLieuMaThietBiFormComponent implements OnInit, OnDestroy {

  maThietBiNewForm: FormGroup;
  submitting: boolean = false;
  dataHelper: any = {
    data: {}
  };

  formShowSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private nhapLieuHelperService: NhapLieuHelperService,
    private navbarSearchService: NavbarSearchService
  ) {
    this.buildForm();
  }

  buildForm() {
    this.maThietBiNewForm = this.formBuilder.group({
      loaiThietBi: this.formBuilder.control('', Validators.required),
      maThietBi: this.formBuilder.control('', Validators.required),
      hangSanXuat: this.formBuilder.control('', Validators.required),
      dvQuanLy: this.formBuilder.control('', Validators.required),
    });
  }

  resetForm() {
    this.maThietBiNewForm.reset();
  }

  resolveData(): MaThietBi {
    let rawData = Object.assign({}, this.maThietBiNewForm.value) as MaThietBi;
    rawData.maThietBi = rawData.maThietBi.toUpperCase();
    return rawData;
  }

  onSubmit() {
    // this.submitting = true;

    let rawData = this.resolveData();
    let maThietBis = this.nhapLieuHelperService.getDataHelper().data.maThietBis;
    if (maThietBis) {
      let target = maThietBis[rawData.loaiThietBi] as MaThietBi[];
      if (target) {
        target.unshift(rawData);
        // Đẩy giá trị này lên sever để admin cập nhật lên googlesheet sau...
        this.nhapLieuHelperService.addNewMaThietBi(rawData);
        this.toastrService.success('Mã phương tiện đã được thêm và chỉ có giá trị nhất thời', 'Tạo mới thành công');
      } else {
        this.toastrService.error('Có lỗi khi thêm mã phương tiện của bạn vào hệ thống', 'Tạo mới thất bại');
      }
    } else {
      this.toastrService.error('Có lỗi khi thêm mã phương tiện của bạn vào hệ thống', 'Tạo mới thất bại');
    }
  }

  ngOnInit() {
    this.dataHelper = this.nhapLieuHelperService.getDataHelper();
  }

  ngOnDestroy() {
    if (this.formShowSub)
      this.formShowSub.unsubscribe();
  }

}