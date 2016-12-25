import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';

import { NhapLieuHelperService } from '../shared/nhap-lieu-helper.service';
import { SuaChua } from '../../core/shared/sua-chua.model';
import { SuaChuaService } from '../../core/shared/sua-chua.service';
import { DateTimeConverterService } from '../../core/shared/date-time-converter.service';
import { dateTimeDisplayFormat, dateTimeStringFormat } from '../../core/shared/date-time-format.model';
import { dateTimeValidator, dateTimeRangeValidator } from '../shared/date-time-validation.directive';
import { MetadataService } from '../shared/metadata.service';

declare var moment: any;

@Component({
  selector: 'sk-nhap-lieu-add-new',
  templateUrl: './nhap-lieu-add-new.component.html',
  styleUrls: ['./nhap-lieu-add-new.component.scss']
})
export class NhapLieuAddNewComponent implements OnInit {

  suaChuaNewForm: FormGroup;
  submitting: boolean = false;
  dataHelper: any = {
    data: {}
  };
  calcStartTimeRef: any = moment();
  calcThoiGianDK: string = '3.00 giờ';

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private nhapLieuHelperService: NhapLieuHelperService,
    private suaChuaService: SuaChuaService,
    private dateTimeConverterService: DateTimeConverterService,
    private metadataService: MetadataService
  ) { }

  buildForm() {
    this.suaChuaNewForm = this.formBuilder.group({
      location_id: this.formBuilder.control('CLA_PXOTO', Validators.required),
      loai_sua_chua: this.formBuilder.control('', Validators.required),
      loai_thiet_bi: this.formBuilder.control('', Validators.required),
      ma_thiet_bi: this.formBuilder.control('', Validators.required),
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
        dateTimeRangeValidator(this.calcStartTimeRef)
      ]),
      trang_thai: this.formBuilder.control('Đang sửa chữa', Validators.required)
    });
  }

  subscribeFormChanges() {
    this.suaChuaNewForm.get('loai_thiet_bi').valueChanges.subscribe(
      newValue => this.suaChuaNewForm.get('ma_thiet_bi').reset()
    );
    this.suaChuaNewForm.get('khu_vuc').valueChanges.subscribe(
      newValue => this.suaChuaNewForm.get('vi_tri').reset()
    );
    this.suaChuaNewForm.get('thoi_gian_ket_thuc_dk').valueChanges.subscribe(
      newDateTime => {
        this.calcStartTimeRef = moment(this.suaChuaNewForm.get('thoi_gian_bat_dau').value, dateTimeDisplayFormat);
        let from = moment(this.calcStartTimeRef, dateTimeDisplayFormat);
        let to = moment(newDateTime, dateTimeDisplayFormat);
        if (from.isValid() && to.isValid())
          this.calcThoiGianDK = `${moment.duration(to.diff(from)).asHours().toFixed(2)} giờ`;
      }
    );
  }

  resetForm() {
    this.suaChuaNewForm.reset();
    this.suaChuaNewForm.get('thoi_gian_bat_dau').setValue(moment().format(dateTimeDisplayFormat));
    this.suaChuaNewForm.get('thoi_gian_ket_thuc_dk').setValue(moment().add(3, 'h').format(dateTimeDisplayFormat));
  }


  transformBeforeSubmit(rawData: SuaChua): SuaChua {
    let result = Object.assign({}, rawData) as SuaChua;
    this.metadataService.setMetadata(result);
    result.thoi_gian_bat_dau_str = this.dateTimeConverterService.from(result.thoi_gian_bat_dau, dateTimeDisplayFormat).convertToString();
    result.thoi_gian_bat_dau_unix = this.dateTimeConverterService.convertToUnix();
    result.thoi_gian_ket_thuc_dk_str = this.dateTimeConverterService.from(result.thoi_gian_ket_thuc_dk, dateTimeDisplayFormat).convertToString();
    result.thoi_gian_ket_thuc_dk_unix = this.dateTimeConverterService.convertToUnix();
    return result;
  }

  transformBeforeSync(rawData: SuaChua): any {
    const { vi_tri, ma_thiet_bi, noi_dung, thoi_gian_bat_dau_str, thoi_gian_ket_thuc_dk_str } = rawData;
    return { vi_tri, ma_thiet_bi, noi_dung, thoi_gian_bat_dau_str, thoi_gian_ket_thuc_dk_str }
  }

  onSubmit() {
    this.submitting = true;
    this.suaChuaService.addNew(this.transformBeforeSubmit(this.suaChuaNewForm.value))
      .then(success => {
        this.suaChuaService.syncSuaChuasCurrent(success.key, this.transformBeforeSync(success.data))
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
        this.toastrService.error(`Tạo mới thông tin thất bại. ${error}`, 'Opps!');
      });
  }

  ngOnInit() {
    this.dataHelper = this.nhapLieuHelperService.getDataHelper();
    this.buildForm();
    this.subscribeFormChanges();
  }

}
