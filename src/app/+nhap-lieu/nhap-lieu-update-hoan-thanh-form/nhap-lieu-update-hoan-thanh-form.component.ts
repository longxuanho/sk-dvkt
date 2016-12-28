import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';

import { SuaChua, TrangThaiSuaChua, DataModelSuaChuaSimple, DataModelSuaChuaTrangThai } from '../../core/shared/sua-chua.model';
import { dateTimeDisplayFormat, dateTimeStringFormat } from '../../core/shared/date-time-format.model';
import { dateTimeValidator } from '../shared/date-time-validation.directive';
import { SuaChuaModelBuilderService } from '../../core/shared/sua-chua-model-builder.service';
import { SuaChuaService } from '../../core/shared/sua-chua.service';


declare var moment: any;

@Component({
  selector: 'sk-nhap-lieu-update-hoan-thanh-form',
  templateUrl: './nhap-lieu-update-hoan-thanh-form.component.html',
  styleUrls: ['./nhap-lieu-update-hoan-thanh-form.component.scss']
})
export class NhapLieuUpdateHoanThanhFormComponent implements OnInit {

  @Input() suaChua: SuaChua;

  hoanThanhForm: FormGroup;
  submitting: boolean = false;
  invalidTime: boolean = false;
  timeOverall: string = '-- giờ';

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private suaChuaModelBuilderService: SuaChuaModelBuilderService,
    private suaChuaService: SuaChuaService
  ) {
    this.buildForm();
    this.subscribeFormChanges();    
  }

  buildForm() {
    this.hoanThanhForm = this.formBuilder.group({
      thoi_gian_ket_thuc: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d\d\d\d (00|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]) (SA|CH)$/),
        dateTimeValidator(),        
      ])
    });
  }

  subscribeFormChanges() {
    this.hoanThanhForm.get('thoi_gian_ket_thuc').valueChanges.subscribe(
      newDateTime => {
        if (this.suaChua) {
          let from = moment(this.suaChua.thoi_gian_bat_dau, dateTimeDisplayFormat);
          let to = moment(newDateTime, dateTimeDisplayFormat);
          this.timeOverall = (from.isValid() && to.isValid()) ? `${moment.duration(to.diff(from)).asHours().toFixed(2)} giờ` : '-- giờ';
          this.invalidTime = (parseFloat(this.timeOverall) < 0);          
        }
      }
    );
  }

  resetForm() {
    this.hoanThanhForm.get('thoi_gian_ket_thuc').setValue(moment().format(dateTimeDisplayFormat));
  }

  resolveData(): SuaChua {
    let rawData = <SuaChua>Object.assign({}, this.suaChua);
    rawData.thoi_gian_ket_thuc = this.hoanThanhForm.get('thoi_gian_ket_thuc').value;
    rawData.thoi_gian_sua_chua = moment.duration( 
      moment(rawData.thoi_gian_ket_thuc, dateTimeDisplayFormat).diff( 
        moment(rawData.thoi_gian_bat_dau, dateTimeDisplayFormat)
      )).asMilliseconds();
    rawData.trang_thai = TrangThaiSuaChua.HoanThanh;

    this.suaChuaModelBuilderService.setMetadata(rawData);
    this.suaChuaModelBuilderService.setTimeStamp(rawData);

    return rawData;
  }

  onSubmit() {
    this.submitting = true;
    let fullData = <SuaChua>this.resolveData();
    let simpleData = this.suaChuaModelBuilderService.resolveSimpleData(fullData);
    let preparedData = this.suaChuaModelBuilderService.resolveTrangThaiData(fullData, { trang_thai: TrangThaiSuaChua.HoanThanh });

    this.suaChuaService.setTrangThai(this.suaChua.$key, preparedData)
      .then(success => this.suaChuaService.removeSyncTrangThai(this.suaChua.$key, { trang_thai: TrangThaiSuaChua.DangThucHien }))
      .then(success => this.suaChuaService.removeSyncTrangThai(this.suaChua.$key, { trang_thai: TrangThaiSuaChua.ChuanBiBanGiao }))
      .then(success => this.suaChuaService.syncTrangThai(this.suaChua.$key, simpleData, { trang_thai: TrangThaiSuaChua.HoanThanh }))
      .then(success => {
        this.submitting = false;
        this.toastrService.success(`Lượt sửa chữa phương tiện ${fullData.ma_thiet_bi} đã hoàn thành.`, 'Cập nhật thành công');
      })
      .catch((error: string) => {
        this.submitting = false;
        this.toastrService.error(error, 'Opps!');
      });
  }

  

  ngOnInit() {
    this.resetForm();
  }

}
