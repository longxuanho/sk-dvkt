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
  cloneSuaChua: SuaChua;
  display: { timeDiff: string } = {
    timeDiff: '0.00 giờ'
  }

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private suaChuaService: SuaChuaService,
    private toastrService: ToastrService,
    private nhapLieuHelperService: NhapLieuHelperService,
    private suaChuaModelBuilderService: SuaChuaModelBuilderService
  ) { }

  buildForm() {
    this.suaChuaUpdateForm = this.formBuilder.group({
      location_id: this.formBuilder.control('CLA_PXOTO', Validators.required),
      loai_sua_chua: this.formBuilder.control({ value: '', disabled: true }, Validators.required),
      loai_thiet_bi: this.formBuilder.control({ value: '', disabled: true }, Validators.required),
      ma_thiet_bi: this.formBuilder.control({ value: '', disabled: true }, Validators.required),
      dv_quan_ly: this.formBuilder.control(''),
      hang_san_xuat: this.formBuilder.control(''),
      khu_vuc: this.formBuilder.control('', Validators.required),
      vi_tri: this.formBuilder.control('', Validators.required),
      ma_wo: this.formBuilder.control(''),
      noi_dung: this.formBuilder.control('', Validators.required),
      thoi_gian_bat_dau: this.formBuilder.control(moment().format(dateTimeDisplayFormat), [
        Validators.required,
        Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d\d\d\d (00|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]) (SA|CH)$/),
        dateTimeValidator()
      ]),
      thoi_gian_ket_thuc_dk: this.formBuilder.control(moment().add(3, 'h').format(dateTimeDisplayFormat), [
        Validators.required,
        Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d\d\d\d (00|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]) (SA|CH)$/),
        dateTimeValidator()
      ]),
      trang_thai: this.formBuilder.control('', Validators.required),
      ghi_chu: this.formBuilder.control(''),
    });
  }

  subscribeFormChanges() {
    this.suaChuaUpdateForm.get('khu_vuc').valueChanges.subscribe(
      newValue => this.suaChuaUpdateForm.get('vi_tri').reset()
    );
    this.suaChuaUpdateForm.get('thoi_gian_ket_thuc_dk').valueChanges.subscribe(
      newDateTime => {
        this.display.timeDiff = moment(this.suaChuaUpdateForm.get('thoi_gian_bat_dau').value, dateTimeDisplayFormat);
        let from = moment(this.display.timeDiff, dateTimeDisplayFormat);
        let to = moment(newDateTime, dateTimeDisplayFormat);
        if (from.isValid() && to.isValid())
          this.display.timeDiff = `${moment.duration(to.diff(from)).asHours().toFixed(2)} giờ`;
      }
    );
  }

  onSubmit() {

    let rawData = Object.assign({}, this.suaChuaUpdateForm.value);
    // Cập nhật thủ công các trường đã disable trong lúc tạo form.
    let { loai_sua_chua, loai_thiet_bi, ma_thiet_bi } = this.cloneSuaChua
    Object.assign(rawData, { loai_sua_chua, loai_thiet_bi, ma_thiet_bi })

    this.suaChuaModelBuilderService.transformBeforeUpdate(rawData as SuaChua);
    this.submitting = true;
    this.suaChuaService.update(this.suaChuaId, rawData as SuaChua)
      .then(success => {
        console.log('rawData: ', rawData)
        let syncData = this.suaChuaModelBuilderService.transformBeforeSync(rawData as SuaChua);
        console.log('key and syncData: ', this.suaChuaId, syncData);
        this.suaChuaService.syncSuaChuasCurrent(this.suaChuaId, syncData)
          .then(success => {
            this.submitting = false;
            this.toastrService.success('Dữ liệu đã được lưu vào hệ thống', 'Tạo mới thành công');
            this.resetForm();
          })
          .catch(error => {
            this.submitting = false;
            this.toastrService.warning(`Đồng bộ dữ liệu thất bại. ${error}`, 'Opps!');
          });
      })
      .catch((error) => {
        this.submitting = false;
        this.toastrService.error(`Cập nhật thất bại. ${error}`, 'Opps!');
      });
  }

  setTrangThaiSuaChua(trangThai: string) {
    this.suaChuaUpdateForm.get('trang_thai').setValue(trangThai);
  }

  resetForm() {
    this.suaChuaUpdateForm.reset();
    this.suaChuaUpdateForm.patchValue(this.cloneSuaChua);
  }

  ngOnInit() {
    this.dataHelper = this.nhapLieuHelperService.getDataHelper();
    this.buildForm();
    this.subscribeFormChanges();

    this.route.params
      .switchMap((params: Params) => this.suaChuaService.getSuaChua(params['id']))
      .subscribe((data: SuaChua) => {
        this.cloneSuaChua = Object.assign({}, data);
        this.suaChuaId = data.$key;
        console.log('data: ', this.cloneSuaChua);

        this.resetForm();
      });
  }

}
