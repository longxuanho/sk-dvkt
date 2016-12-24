import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToastrService } from 'toastr-ng2';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'sk-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

  onLogOut() {
    this.authService.logout();
    this.toastrService.info('Bạn đã đăng xuất khỏi hệ thống', 'Bye : )');
  }

}
