import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';
import { AuthService } from '../../core/shared/auth.service';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'sk-preferences-change-password',
  templateUrl: './preferences-change-password.component.html',
  styleUrls: ['./preferences-change-password.component.scss']
})
export class PreferencesChangePasswordComponent implements OnInit {

  userChangePasswordForm: FormGroup;
  submitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  buildForm() {
    let oldPassword = this.formBuilder.control('', [Validators.required]);
    let newPassword = this.formBuilder.control('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let repeatNewPassword = this.formBuilder.control('', [Validators.required, CustomValidators.equalTo(newPassword)]);
    this.userChangePasswordForm = this.formBuilder.group({ oldPassword, newPassword, repeatNewPassword });
  }

  resetForm() {
    this.userChangePasswordForm.reset();
  }

  onSubmit() {
    this.submitting = true;
    this.authService.updatePassword(this.userChangePasswordForm.get('oldPassword').value, this.userChangePasswordForm.get('newPassword').value)
      .then(success => {
        this.submitting = false;        
        this.toastrService.success('Mật khẩu của bạn đã được thay đổi thành công', 'Cập nhật thành công');
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
