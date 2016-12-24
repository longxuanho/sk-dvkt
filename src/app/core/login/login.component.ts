import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'sk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
      ]],
      password: ['', Validators.required],
      rememberMe: [true]
    });
  }

  onLogIn(): void {
    this.authService.login(Object.assign({}, this.loginForm.value)).then(
      success => {
        this.toastrService.success('Welcome back!', 'Đăng nhập thành công');
        this.loginForm.reset();
      }
    ).catch(
      error => this.toastrService.error(`Đăng nhập thất bại: ${error.message}`, 'Opps!')
    );
  }

}
