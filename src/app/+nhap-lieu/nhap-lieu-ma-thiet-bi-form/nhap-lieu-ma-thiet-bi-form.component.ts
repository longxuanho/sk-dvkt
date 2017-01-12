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
      maThietBi: this.formBuilder.control('addNew', Validators.required),
      hangSanXuat: this.formBuilder.control('addNew', Validators.required),
      dvQuanLy: this.formBuilder.control('addNew', Validators.required),
    });
  }

  resetForm() {
    this.maThietBiNewForm.reset();
  }

  onSubmit() {
    this.submitting = true;

    // this.suaChuaService.addNew(fullData)
    //   .then((newKey: string) => this.suaChuaService.syncTrangThai(newKey, simpleData, { trang_thai: TrangThaiSuaChua.DangThucHien }))
    //   .then(success => {
    //     this.submitting = false;
    //     this.toastrService.success('Dữ liệu đã được lưu vào hệ thống', 'Tạo mới thành công');
    //     this.resetForm();
    //     this.navbarSearchService.setSearchMode('');
    //   })
    //   .catch((error: string) => {
    //     this.submitting = false;
    //     this.toastrService.error(error, 'Opps!');
    //   });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.formShowSub)
      this.formShowSub.unsubscribe();
  }

}