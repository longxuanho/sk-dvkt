import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';
import { CustomValidators } from 'ng2-validation';

import { dateTimeDisplayFormat, dateTimeStringFormat } from '../../core/shared/date-time-format.model';
import { SuaChuaService } from '../../core/shared/sua-chua.service';
import { TrangThaiSuaChua, DataModelTrangThaiChuanBiBG, DataModelTimeStamp } from '../../core/shared/sua-chua.model';
import { SuaChuaModelBuilderService } from '../../core/shared/sua-chua-model-builder.service';

declare var moment: any;

@Component({
  selector: 'sk-nhap-lieu-update-chuan-bi-ban-giao-form',
  templateUrl: './nhap-lieu-update-chuan-bi-ban-giao-form.component.html',
  styleUrls: ['./nhap-lieu-update-chuan-bi-ban-giao-form.component.scss']
})
export class NhapLieuUpdateChuanBiBanGiaoFormComponent implements OnInit {

  @Input() suaChuaId: string;
  @Input() thoiGianBatDau: string;

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



  onSubmit() {
    const duration = parseInt(this.chuanBiBanGiaoForm.get('duration').value);
    let rawData: DataModelTimeStamp = { thoi_gian_bat_dau: this.thoiGianBatDau };

    this.suaChuaModelBuilderService.transformBeforeUpdateTrangThaiChuanBiBG(rawData, duration);

    this.submitting = true;
    this.suaChuaService.setTrangThaiChuanBiBanGiao(this.suaChuaId, <DataModelTrangThaiChuanBiBG>rawData)
      .then(success => this.suaChuaService.syncTrangThaiChuanBiBanGiao(this.suaChuaId, <DataModelTrangThaiChuanBiBG>rawData))
      .then(success => {
        this.submitting = false;
        this.toastrService.success(`Phương tiện được dự kiến bàn giao trong ${this.chuanBiBanGiaoForm.get('duration').value} phút tới`, 'Cập nhật thành công');
      })
      .catch((error: string) => {
        this.submitting = false;
        this.toastrService.warning(error, 'Opps!');
      })
  }

  resetTrangThai() {
    this.suaChuaService.setTrangThaiDangThucHien(this.suaChuaId)
      .then(success => this.suaChuaService.syncTrangThaiDangThucHien(this.suaChuaId))
      .then(success => this.toastrService.success('Trạng thái phương tiện trở về <Đang thực hiện>', 'Cập nhật thành công'))
      .catch((error: string) => this.toastrService.warning(error, 'Opps!'));
  }

  ngOnInit() {
  }

}
