import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';

import { SuaChua } from '../../core/shared/sua-chua.model';
import { dateTimeDisplayFormat, dateTimeStringFormat } from '../../core/shared/date-time-format.model';

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
  timeOverall: string = '-- giờ';

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
  ) {
    this.buildForm();
    this.subscribeFormChanges();
    
  }

  buildForm() {
    this.hoanThanhForm = this.formBuilder.group({
      thoi_gian_ket_thuc: this.formBuilder.control('', [Validators.required])
    });
  }

  subscribeFormChanges() {
    this.hoanThanhForm.get('thoi_gian_ket_thuc').valueChanges.subscribe(
      newDateTime => {
        console.log('calculating...', newDateTime, this.suaChua)
        if (this.suaChua) {
          let from = moment(this.suaChua.thoi_gian_bat_dau, dateTimeDisplayFormat);
          let to = moment(newDateTime, dateTimeDisplayFormat);
          this.timeOverall = (from.isValid() && to.isValid()) ? `${moment.duration(to.diff(from)).asHours().toFixed(2)} giờ` : '-- giờ';
        }
      }
    );
  }

  resetForm() {
    this.hoanThanhForm.get('thoi_gian_ket_thuc').setValue(moment().format(dateTimeDisplayFormat));
  }



  onSubmit() {
    // const duration = parseInt(this.chuanBiBanGiaoForm.get('duration').value);
    // let rawData: DataModelTimeStamp = { thoi_gian_bat_dau: this.thoiGianBatDau };

    // this.suaChuaModelBuilderService.transformBeforeUpdateTrangThaiChuanBiBG(rawData, duration);

    // this.submitting = true;
    // this.suaChuaService.setTrangThaiChuanBiBanGiao(this.suaChuaId, <DataModelTrangThaiChuanBiBG>rawData)
    //   .then(success => this.suaChuaService.syncTrangThaiChuanBiBanGiao(this.suaChuaId, <DataModelTrangThaiChuanBiBG>rawData))
    //   .then(success => {
    //     this.submitting = false;
    //     this.toastrService.success(`Phương tiện được dự kiến bàn giao trong ${this.chuanBiBanGiaoForm.get('duration').value} phút tới`, 'Cập nhật thành công');
    //   })
    //   .catch((error: string) => {
    //     this.submitting = false;
    //     this.toastrService.warning(error, 'Opps!');
    //   })
  }

  

  ngOnInit() {
    this.resetForm();
  }

}
