import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';
import { CustomValidators } from 'ng2-validation';

import { dateTimeDisplayFormat, dateTimeStringFormat } from '../../core/shared/date-time-format.model';
import { SuaChuaService } from '../../core/shared/sua-chua.service';
import { TrangThaiSuaChua } from '../../core/shared/sua-chua.model';


declare var moment: any;

@Component({
  selector: 'sk-nhap-lieu-update-chuan-bi-ban-giao-form',
  templateUrl: './nhap-lieu-update-chuan-bi-ban-giao-form.component.html',
  styleUrls: ['./nhap-lieu-update-chuan-bi-ban-giao-form.component.scss']
})
export class NhapLieuUpdateChuanBiBanGiaoFormComponent implements OnInit {

  @Input() suaChuaId: string;

  chuanBiBanGiaoForm: FormGroup;
  submitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private suaChuaService: SuaChuaService
  ) {
    this.buildForm();
  }

  buildForm() {
    this.chuanBiBanGiaoForm = this.formBuilder.group({
      duration: this.formBuilder.control(20, [Validators.required, CustomValidators.min(0)])
    });
  }

  onSubmit() {
    this.submitting = true;
    console.log('submitting...');
    this.suaChuaService.setTrangThaiChuanBiBanGiao(this.suaChuaId)
      .then(success => {
        console.log('data level 1: ', success);
        return this.suaChuaService.syncTrangThaiChuanBiBanGiao(this.suaChuaId)
      })
      .then(success => {
        console.log('data level 2: ', success);
        this.submitting = false;
        this.toastrService.success('Phương tiện NB121 được dự kiến bàn giao trong 20 phút tới', 'Cập nhật thành công');
      })
      .catch((error: string) => {
        this.submitting = false;
        this.toastrService.warning(error, 'Opps!');
      })
  }

  ngOnInit() {
  }

}
