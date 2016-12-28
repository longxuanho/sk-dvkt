import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';
import { CustomValidators } from 'ng2-validation';

import { dateTimeDisplayFormat, dateTimeStringFormat } from '../../core/shared/date-time-format.model';
import { SuaChuaService } from '../../core/shared/sua-chua.service';
import { SuaChua, TrangThaiSuaChua, DataModelTrangThaiChuanBiBG, DataModelTimeStamp } from '../../core/shared/sua-chua.model';
import { SuaChuaModelBuilderService } from '../../core/shared/sua-chua-model-builder.service';

declare var moment: any;

@Component({
  selector: 'sk-nhap-lieu-update-chuan-bi-ban-giao-form',
  templateUrl: './nhap-lieu-update-chuan-bi-ban-giao-form.component.html',
  styleUrls: ['./nhap-lieu-update-chuan-bi-ban-giao-form.component.scss']
})
export class NhapLieuUpdateChuanBiBanGiaoFormComponent implements OnInit {

  @Input() suaChua: SuaChua;

  chuanBiBanGiaoForm: FormGroup;
  submitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private suaChuaService: SuaChuaService,
    private suaChuaModelBuilderService: SuaChuaModelBuilderService
  ) {
    this.buildForm();
  }

  buildForm() {
    this.chuanBiBanGiaoForm = this.formBuilder.group({
      duration: this.formBuilder.control(20, [Validators.required, CustomValidators.min(0)])
    });
  }

  resolveData(): SuaChua {
    let rawData = Object.assign({}, this.suaChua);
    let duration = parseInt(this.chuanBiBanGiaoForm.get('duration').value);
    rawData.thoi_gian_ket_thuc_dk = moment().add(duration, 'minutes').format(dateTimeDisplayFormat);
    rawData.trang_thai = TrangThaiSuaChua.ChuanBiBanGiao;

    this.suaChuaModelBuilderService.setMetadata(rawData);
    this.suaChuaModelBuilderService.setTimeStamp(rawData);

    return rawData;
  }



  onSubmit() {
    this.submitting = true;
    let fullData = <SuaChua>this.resolveData();
    console.log('full Data: ', fullData);

    let preparedData = this.suaChuaModelBuilderService.resolveTrangThaiChuanBiBGData(fullData);
    console.log('preparedData: ', preparedData);
    this.suaChuaService.setTrangThaiChuanBiBanGiao(this.suaChua.$key, preparedData)
      .then(success => {
        let simpleData = this.suaChuaModelBuilderService.resolveSimpleData(fullData);
        this.suaChuaService.syncTrangThaiChuanBiBanGiao(this.suaChua.$key, simpleData)
      })
      .then(success => {
        this.submitting = false;
        this.toastrService.success(`Phương tiện ${this.suaChua.ma_thiet_bi} được dự kiến bàn giao trong ${this.chuanBiBanGiaoForm.get('duration').value} phút tới`, 'Cập nhật thành công');
      })
      .catch((error: string) => {
        this.submitting = false;
        this.toastrService.error(error, 'Opps!');
      });
  }

  resetTrangThai() {
    this.suaChuaService.setTrangThaiDangThucHien(this.suaChua.$key)
      .then(success => this.suaChuaService.syncTrangThaiDangThucHien(this.suaChua.$key))
      .then(success => this.toastrService.success('Trạng thái phương tiện trở về <Đang thực hiện>', 'Cập nhật thành công'))
      .catch((error: string) => this.toastrService.error(error, 'Opps!'));
  }

  ngOnInit() {
  }

}
