import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';

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
    this.submitting = true;
    
  }

  ngOnInit() {
    this.resetForm();
  }

}