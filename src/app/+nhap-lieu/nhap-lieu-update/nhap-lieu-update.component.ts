import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';

import 'rxjs/add/operator/switchMap';

import { SuaChuaService } from '../../core/shared/sua-chua.service';
import { SuaChua } from '../../core/shared/sua-chua.model';
import { dateTimeDisplayFormat, dateTimeStringFormat } from '../../core/shared/date-time-format.model';
import { dateTimeValidator, dateTimeRangeValidator } from '../shared/date-time-validation.directive';
import { SuaChuaModelBuilderService } from '../../core/shared/sua-chua-model-builder.service';
import { NhapLieuHelperService } from '../shared/nhap-lieu-helper.service';

declare var moment: any;

@Component({
  selector: 'sk-nhap-lieu-update',
  templateUrl: './nhap-lieu-update.component.html',
  styleUrls: ['./nhap-lieu-update.component.scss']
})
export class NhapLieuUpdateComponent implements OnInit {

  suaChuaUpdateForm: FormGroup;
  suaChuaId: string;
  formError: string = '';
  submitting: boolean = false;
  dataHelper: any = {
    data: {}
  };

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private suaChuaService: SuaChuaService,
    private toastrService: ToastrService,
    private nhapLieuHelperService: NhapLieuHelperService,
  ) { }

  buildForm() {
    this.suaChuaUpdateForm = this.formBuilder.group({
      location_id: this.formBuilder.control('CLA_PXOTO', Validators.required),
      loai_sua_chua: this.formBuilder.control({ value: '', disabled: true }, Validators.required),
      loai_thiet_bi: this.formBuilder.control({ value: '', disabled: true }, Validators.required),
      ma_thiet_bi: this.formBuilder.control({ value: '', disabled: true }, Validators.required),
      khu_vuc: this.formBuilder.control('', Validators.required),
      vi_tri: this.formBuilder.control('', Validators.required),
      ma_wo: this.formBuilder.control(''),
      noi_dung: this.formBuilder.control('', Validators.required),
      thoi_gian_bat_dau: this.formBuilder.control(moment().format(dateTimeDisplayFormat), [
        Validators.required,
        Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d\d\d\d (00|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]) (SA|CH)$/ig),
        dateTimeValidator()
      ]),
      thoi_gian_ket_thuc_dk: this.formBuilder.control(moment().add(3, 'h').format(dateTimeDisplayFormat), [
        Validators.required,
        Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d\d\d\d (00|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]) (SA|CH)$/ig),
        // dateTimeRangeValidator(this.calcStartTimeRef)
      ]),
      trang_thai: this.formBuilder.control('Đang sửa chữa', Validators.required)
    });
  }

  onSubmit() {

  }

  ngOnInit() {
    this.dataHelper = this.nhapLieuHelperService.getDataHelper();
    this.buildForm();

    this.route.params
      .switchMap((params: Params) => this.suaChuaService.getSuaChua(params['id']))
      .subscribe((data: SuaChua) => {
        this.suaChuaId = data.$key;
        console.log('suaChuaId: ', this.suaChuaId);
        console.log('data: ', data);
        
        this.suaChuaUpdateForm.reset();
        this.suaChuaUpdateForm.patchValue(data);
      });    
  }

}
