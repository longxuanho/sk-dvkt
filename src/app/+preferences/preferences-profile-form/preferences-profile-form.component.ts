import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';
import { AuthService } from '../../core/shared/auth.service';

@Component({
  selector: 'sk-preferences-profile-form',
  templateUrl: './preferences-profile-form.component.html',
  styleUrls: ['./preferences-profile-form.component.scss']
})
export class PreferencesProfileFormComponent implements OnInit {

  userProfileForm: FormGroup;
  submitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  buildForm() {
    this.userProfileForm = this.formBuilder.group({
      displayName: this.formBuilder.control('', Validators.required),
      description: this.formBuilder.control('', Validators.required),
      location_id: this.formBuilder.control('', Validators.required),
    });
  }

  resetForm() {
    this.userProfileForm.reset();
    this.userProfileForm.get('location_id').setValue('CLA_PXOTO');
  }

  onSubmit() {
    let userProfile = {
      displayName: this.userProfileForm.get('displayName').value,
      description: this.userProfileForm.get('description').value
    }
    this.submitting = true;    
    this.authService.setUserProfile(userProfile)
      .then(success => {
        this.submitting = false;        
        this.toastrService.success('Hồ sơ của bạn đã được cập nhật thành công', 'Cập nhật thành công');
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