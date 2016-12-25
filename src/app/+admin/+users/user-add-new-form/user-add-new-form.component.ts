import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';

import { UserService } from '../shared/user.service';

@Component({
  selector: 'sk-user-add-new-form',
  templateUrl: './user-add-new-form.component.html',
  styleUrls: ['./user-add-new-form.component.scss']
})
export class UserAddNewFormComponent implements OnInit {

  userAddNewForm: FormGroup;
  formError: string = '';
  submitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService
  ) { }

  buildForm() {
    this.userAddNewForm = this.formBuilder.group({
      email: this.formBuilder.control('thienlang06@gmail.com', [
        Validators.required, 
        Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)]
      ),
      password: this.formBuilder.control('12345678', [
        Validators.required,
        Validators.minLength(8)]
      ),
      displayName: this.formBuilder.control('Thien Lang', Validators.required),
      description: this.formBuilder.control('Desc', Validators.required),
      photoUrl: this.formBuilder.control('Url')
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    // // reset form error (if any)
    // this.formError = '';
    // this.submitting = true;

    // if (this.userAddNewForm.valid) {  
    //   // do Submit actions
    //   this.userService.createUser(Object.assign({}, this.userAddNewForm.value))
    //     .then(success => {
    //       this.userService.createUserProfile(success.uid, this.userAddNewForm.value)
    //         .then(success => {
    //           this.submitting = false;
    //           this.toastrService.success('Người dùng đã được thêm vào hệ thống', 'Tạo mới thành công');
    //         })
    //         .catch(error => {
    //           this.submitting = false;           
    //           this.formError = error.message;
    //           this.toastrService.error('Có lỗi khi đồng bộ thông tin người dùng', 'Opps!');
              
    //         });
    //     })
    //     .catch(error => {
    //       this.submitting = false;
    //       this.formError = error.message;
    //       this.toastrService.error('Tạo mới người dùng thất bại', 'Opps!');
    //     });
        
    // }
  }


}
