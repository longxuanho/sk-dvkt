import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';
import { CustomValidators } from 'ng2-validation';

import { dateTimeDisplayFormat, dateTimeStringFormat } from '../../core/shared/date-time-format.model';
import { SuaChuaService } from '../../core/shared/sua-chua.service';
import { SuaChua, TrangThaiSuaChua, DataModelSuaChuaTrangThai, DataModelTimeStamp } from '../../core/shared/sua-chua.model';
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
      duration: this.formBuilder.control(0, [Validators.required, CustomValidators.min(0)])
    });
  }

  resolveData(options: { reset?: boolean } = {}): SuaChua {

    let rawData = Object.assign({}, this.suaChua);

    if (options.reset) {
      rawData.trang_thai = TrangThaiSuaChua.DangThucHien;
    } else {
      let duration = parseInt(this.chuanBiBanGiaoForm.get('duration').value);
      rawData.thoi_gian_ket_thuc_dk = moment().add(duration, 'minutes').format(dateTimeDisplayFormat);
      rawData.trang_thai = TrangThaiSuaChua.ChuanBiBanGiao;
    }

    this.suaChuaModelBuilderService.setMetadata(rawData);
    this.suaChuaModelBuilderService.setTimeStamp(rawData);

    return <SuaChua>rawData;
  }

  onSubmit() {
    this.submitting = true;
    let fullData = this.resolveData();
    let simpleData = this.suaChuaModelBuilderService.resolveSimpleData(fullData);
    let preparedData = this.suaChuaModelBuilderService.resolveTrangThaiData(fullData, { trang_thai: TrangThaiSuaChua.ChuanBiBanGiao });

    this.suaChuaService.setTrangThaiChuanBiBanGiao(this.suaChua.$key, preparedData)
      .then(success => this.suaChuaService.syncTrangThaiChuanBiBanGiao(this.suaChua.$key, simpleData))
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
    this.submitting = true;
    let fullData = this.resolveData({ reset: true });
    let simpleData = this.suaChuaModelBuilderService.resolveSimpleData(fullData);
    let preparedData = this.suaChuaModelBuilderService.resolveTrangThaiData(fullData, { trang_thai: TrangThaiSuaChua.DangThucHien });

    this.suaChuaService.setTrangThaiDangThucHien(this.suaChua.$key, preparedData)
      .then(success => this.suaChuaService.syncTrangThaiDangThucHien(this.suaChua.$key, simpleData))
      .then(success => {
        this.submitting = false;
        this.toastrService.success('Trạng thái phương tiện trở về <Đang thực hiện>', 'Cập nhật thành công');
      })
      .catch((error: string) => {
        this.submitting = false;
        this.toastrService.error(error, 'Opps!');
      });
  }

  resetForm() {
    this.chuanBiBanGiaoForm.get('duration').setValue(20);
  }

  ngOnInit() {
    this.resetForm();
  }

}
