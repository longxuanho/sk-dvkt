import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';

import { SuaChua, TrangThaiSuaChua } from '../../core/shared/sua-chua.model';
import { SuaChuaService } from '../../core/shared/sua-chua.service';
import { SuaChuaModelBuilderService } from '../../core/shared/sua-chua-model-builder.service';
import { NhapLieuHelperService } from '../shared/nhap-lieu-helper.service';
import { dateTimeDisplayFormat, dateTimeStringFormat } from '../../core/shared/date-time-format.model';
import { dateTimeValidator, dateTimeRangeValidator } from '../shared/date-time-validation.directive';

declare var moment: any;

@Component({
  selector: 'sk-nhap-lieu-update-basic-info-form',
  templateUrl: './nhap-lieu-update-basic-info-form.component.html',
  styleUrls: ['./nhap-lieu-update-basic-info-form.component.scss']
})
export class NhapLieuUpdateBasicInfoFormComponent implements OnInit {

  @Input() suaChua: SuaChua;

  suaChuaUpdateForm: FormGroup;
  submitting: boolean = false;
  display: { timeDiff: string } = {
    timeDiff: '0.00 giờ'
  }
  dataHelper: any = {
    data: {}
  };

  constructor(
    private formBuilder: FormBuilder,
    private suaChuaService: SuaChuaService,
    private nhapLieuHelperService: NhapLieuHelperService,
    private suaChuaModelBuilderService: SuaChuaModelBuilderService,
    private toastrService: ToastrService,
  ) {
    this.buildForm();
    this.subscribeFormChanges();
  }

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

  setFormValues(formValue) {
    this.suaChuaUpdateForm.reset();
    this.suaChuaUpdateForm.patchValue(formValue);
  }

  resolveData(): SuaChua {
    let rawData = Object.assign({}, this.suaChua);
    Object.assign(rawData, this.suaChuaUpdateForm.value);
    
    // Cập nhật thủ công các trường đã disable trong lúc tạo form.
    let { loai_sua_chua, loai_thiet_bi, ma_thiet_bi } = this.suaChua
    Object.assign(rawData, { loai_sua_chua, loai_thiet_bi, ma_thiet_bi })

    this.suaChuaModelBuilderService.setMetadata(rawData);
    this.suaChuaModelBuilderService.setTimeStamp(rawData);

    return <SuaChua>rawData;
  }

  onSubmit() {
    this.submitting = true;
    let fullData = this.resolveData();
    let simpleData = this.suaChuaModelBuilderService.resolveSimpleData(fullData);
    let preparedData = this.suaChuaModelBuilderService.resolveUpdateBasicInfoData(fullData);

    console.log('preparedData: ', preparedData);    

    this.suaChuaService.update(this.suaChua.$key, preparedData)
      .then(success => this.suaChuaService.syncTrangThai(this.suaChua.$key, simpleData, { trang_thai: this.suaChua.trang_thai }))
      .then(success => {
        this.submitting = false;
        this.toastrService.success('Dữ liệu của bạn đã được đồng bộ trên hệ thống', 'Cập nhật thành công');
      })
      .catch((error: string) => {
        this.submitting = false;
        this.toastrService.warning(`Đồng bộ dữ liệu thất bại. ${error}`, 'Opps!');
      });
  }

  ngOnInit() {
    this.dataHelper = this.nhapLieuHelperService.getDataHelper();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Chú ý ngOnChanges xảy ra trước ngOnInit!
    if (changes.hasOwnProperty('suaChua')) {
      if (changes['suaChua'].currentValue)
        this.setFormValues(changes['suaChua'].currentValue)
    }

  }

}
