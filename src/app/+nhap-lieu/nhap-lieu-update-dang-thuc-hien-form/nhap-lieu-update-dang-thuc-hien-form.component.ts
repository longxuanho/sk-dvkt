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
  selector: 'sk-nhap-lieu-update-dang-thuc-hien-form',
  templateUrl: './nhap-lieu-update-dang-thuc-hien-form.component.html',
  styleUrls: ['./nhap-lieu-update-dang-thuc-hien-form.component.scss']
})
export class NhapLieuUpdateDangThucHienFormComponent implements OnInit {

  @Input() suaChua: SuaChua;

  dangThucHienForm: FormGroup;
  submitting: boolean = false;
  timeOverall: string = '-- giờ';

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private suaChuaModelBuilderService: SuaChuaModelBuilderService,
    private suaChuaService: SuaChuaService
  ) {
    this.buildForm();
  }

  resolveData(): SuaChua {
    let rawData = <SuaChua>Object.assign({}, this.suaChua);

     // Trường hợp chuyển trạng thái từ Hoàn thành -> Đang thực hiện hoặc Chuẩn bị bàn giao
    let omitKeys = ['thoi_gian_ket_thuc', 'thoi_gian_ket_thuc_str', 'thoi_gian_ket_thuc_unix', 'thoi_gian_sua_chua'];
    omitKeys.forEach(omitKey => {
      delete rawData[omitKey];
    });

    console.log('rawData after delete keys: ', rawData);

    rawData.trang_thai = TrangThaiSuaChua.DangThucHien;

    this.suaChuaModelBuilderService.setMetadata(rawData);
    this.suaChuaModelBuilderService.setTimeStamp(rawData);

    return rawData;
  }

  buildForm() {
    this.dangThucHienForm = this.formBuilder.group({
    });
  }

  onSubmit() {
    this.submitting = true;
    let fullData = <SuaChua>this.resolveData();
    let simpleData = this.suaChuaModelBuilderService.resolveSimpleData(fullData);
    let preparedData = this.suaChuaModelBuilderService.resolveTrangThaiData(fullData, { trang_thai: TrangThaiSuaChua.DangThucHien });

    this.suaChuaService.setTrangThai(this.suaChua.$key, preparedData)
      .then(success => this.suaChuaService.removeSyncTrangThai(this.suaChua.$key, { trang_thai: TrangThaiSuaChua.HoanThanh }))
      .then(success => this.suaChuaService.removeSyncTrangThai(this.suaChua.$key, { trang_thai: TrangThaiSuaChua.ChuanBiBanGiao }))
      .then(success => this.suaChuaService.syncTrangThai(this.suaChua.$key, simpleData, { trang_thai: TrangThaiSuaChua.DangThucHien }))
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
  }

}
