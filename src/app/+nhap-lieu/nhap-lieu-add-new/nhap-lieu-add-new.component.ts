import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';

import { NhapLieuHelperService } from '../shared/nhap-lieu-helper.service';
import { dateTimeValidator } from '../shared/date-time-validation.directive';

declare var moment: any;

@Component({
  selector: 'sk-nhap-lieu-add-new',
  templateUrl: './nhap-lieu-add-new.component.html',
  styleUrls: ['./nhap-lieu-add-new.component.scss']
})
export class NhapLieuAddNewComponent implements OnInit {
  
  suaChuaNewForm: FormGroup;
  submitting: false;
  dataHelper: any = {
    data: {}
  };

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private nhapLieuHelperService: NhapLieuHelperService,
  ) {}

  buildForm() {
    this.suaChuaNewForm = this.formBuilder.group({
      location_id: this.formBuilder.control('CLA_PXOTO', Validators.required),
      loai_sua_chua: this.formBuilder.control('Sửa chữa cụm', Validators.required),
      loai_thiet_bi: this.formBuilder.control('Đầu kéo chạy ngoài', Validators.required),
      ma_thiet_bi: this.formBuilder.control('2', Validators.required),
      khu_vuc: this.formBuilder.control('Khu A', Validators.required),
      vi_tri: this.formBuilder.control('A1:01', Validators.required),
      ma_wo: this.formBuilder.control('12345'),
      noi_dung: this.formBuilder.control('Noi dung - Test', Validators.required),
      thoi_gian_bat_dau: this.formBuilder.control(moment().format('DD/MM/YYYY hh:mm A'), [
        Validators.required,
        // Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d\d\d\d (00|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]) (SA|CH)$/ig),
        dateTimeValidator()
      ]),
      thoi_gian_ket_thuc_dk: this.formBuilder.control(moment().add(3, 'h').format('DD/MM/YYYY hh:mm A'),  [
        Validators.required,
        // Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d\d\d\d (00|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]) (SA|CH)$/ig),
        dateTimeValidator()
      ]),
      trang_thai: this.formBuilder.control('Đang sửa chữa', Validators.required)
    });
  }

  onSubmit() {
    
  }

  ngOnInit() {
    this.dataHelper = this.nhapLieuHelperService.getDataHelper();
    this.buildForm();    
  }

}
