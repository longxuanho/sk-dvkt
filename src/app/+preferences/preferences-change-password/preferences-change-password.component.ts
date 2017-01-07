import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';

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
  ) {
    this.buildForm();
  }

  buildForm() {
    this.userChangePasswordForm = this.formBuilder.group({
      newPassword: this.formBuilder.control('', Validators.required),
      repeatNewPassword: this.formBuilder.control('', Validators.required),
    });
  }

  resetForm() {
    this.userChangePasswordForm.reset();
  }

  onSubmit() {
    this.submitting = true; 
  }

  ngOnInit() {
     this.resetForm();
  }

}
