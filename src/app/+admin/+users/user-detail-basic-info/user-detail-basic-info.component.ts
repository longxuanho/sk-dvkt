import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../shared/user.service';

@Component({
  selector: 'sk-user-detail-basic-info',
  templateUrl: './user-detail-basic-info.component.html',
  styleUrls: ['./user-detail-basic-info.component.scss']
})
export class UserDetailBasicInfoComponent implements OnInit {

  userBasicInfoForm: FormGroup;
  userId: string;
  formError: string = '';
  submitting: boolean = false;
  subscriptions: {
    userProfile?: Subscription
  } = {}
  
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService
  ) { }

  buildForm() {
    this.userBasicInfoForm = this.formBuilder.group({
      email: this.formBuilder.control('thienlang06@gmail.com', [
        Validators.required,
        Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)]
      ),
      displayName: this.formBuilder.control('Thien Lang', Validators.required),
      description: this.formBuilder.control('Desc', Validators.required),
      photoUrl: this.formBuilder.control('Url'),
      requireNewPassword: this.formBuilder.control(true)
    });
  }

  onSubmit() {
    // reset form error (if any)
    this.formError = '';
    this.submitting = true;

    if (this.userId)
      this.userService.updateUserInfo(this.userId, Object.assign({}, this.userBasicInfoForm.value))
        .then(success => {
          this.submitting = false;
          this.toastrService.success('Thông tin người dùng đã được cập nhật vào hệ thống', 'Cập nhật thành công');
        })
        .catch(error => {
          this.submitting = false;
          this.formError = error.message;
          this.toastrService.error('Cập nhật thông tin người dùng thất bại', 'Opps!');
        });
  }

  ngOnInit() {
    this.buildForm();

    this.subscriptions.userProfile = this.route.params
      .switchMap((params: Params) => this.userService.getUserInfo(params['id']))
      .subscribe((data) => {
        this.userId = data.$key;
        this.userBasicInfoForm.reset();
        this.userBasicInfoForm.patchValue(Object.assign({}, data));
      });    
  }

  ngOnDestroy() {
    this.subscriptions.userProfile.unsubscribe();
  }

}
