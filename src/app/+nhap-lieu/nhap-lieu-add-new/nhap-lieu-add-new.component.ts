import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';

import { NhapLieuHelperService } from '../shared/nhap-lieu-helper.service';
import { SuaChua, MaThietBi, TrangThaiSuaChua } from '../../core/shared/sua-chua.model';
import { SuaChuaService } from '../../core/shared/sua-chua.service';
import { dateTimeDisplayFormat, dateTimeStringFormat } from '../../core/shared/date-time-format.model';
import { dateTimeValidator, dateTimeRangeValidator } from '../shared/date-time-validation.directive';
import { SuaChuaModelBuilderService } from '../../core/shared/sua-chua-model-builder.service';

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
    private suaChuaModelBuilderService: SuaChuaModelBuilderService
  ) {
    this.buildForm();
    this.subscribeFormChanges();
  }

  buildForm() {
    this.suaChuaNewForm = this.formBuilder.group({
      location_id: this.formBuilder.control('', Validators.required),
      loai_sua_chua: this.formBuilder.control('', Validators.required),
      loai_thiet_bi: this.formBuilder.control('', Validators.required),
      ma_thiet_bi: this.formBuilder.control('', Validators.required),
      khu_vuc: this.formBuilder.control('', Validators.required),
      vi_tri: this.formBuilder.control('', Validators.required),
      ma_wo: this.formBuilder.control(''),
      noi_dung: this.formBuilder.control('', Validators.required),
      thoi_gian_bat_dau: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d\d\d\d (00|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]) (SA|CH)$/),
        dateTimeValidator()
      ]),
      thoi_gian_ket_thuc_dk: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d\d\d\d (00|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]) (SA|CH)$/),
        dateTimeValidator()
      ]),
      trang_thai: this.formBuilder.control('', Validators.required)
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
    this.suaChuaNewForm.get('location_id').setValue('CLA_PXOTO');    
    this.suaChuaNewForm.get('thoi_gian_bat_dau').setValue(moment().format(dateTimeDisplayFormat));
    this.suaChuaNewForm.get('thoi_gian_ket_thuc_dk').setValue(moment().add(3, 'h').format(dateTimeDisplayFormat));
    this.suaChuaNewForm.get('trang_thai').setValue(TrangThaiSuaChua.DangThucHien);
  }

  resolveData(): SuaChua {
    this.submitting = true;
    let rawData = Object.assign({}, this.suaChuaNewForm.value);
    this.suaChuaModelBuilderService.flattenFields(rawData as { ma_thiet_bi: MaThietBi });
    this.suaChuaModelBuilderService.setMetadata(rawData, { addNew: true });
    this.suaChuaModelBuilderService.setTimeStamp(rawData);

    rawData.trang_thai = TrangThaiSuaChua.DangThucHien;

    return <SuaChua>rawData;
  }

  onSubmit() {
    this.submitting = true;
    let fullData = this.resolveData(); 

    this.suaChuaService.addNew(fullData)
      .then((newKey: string) => {
        let syncData = this.suaChuaModelBuilderService.resolveSimpleData(fullData);
        this.suaChuaService.syncTrangThaiDangThucHien(newKey, syncData)
      })
      .then(success => {
        this.submitting = false;
        this.toastrService.success('Dữ liệu đã được lưu vào hệ thống', 'Tạo mới thành công');
      })
      .catch((error: string) => {
        this.submitting = false;
        this.toastrService.error(error, 'Opps!');
      });
  }

  ngOnInit() {
    this.dataHelper = this.nhapLieuHelperService.getDataHelper();
    this.resetForm();
  }

}
