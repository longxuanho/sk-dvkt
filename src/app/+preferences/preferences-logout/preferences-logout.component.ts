import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/shared/auth.service';
import { ToastrService } from 'toastr-ng2';
import { Router } from '@angular/router';


@Component({
  selector: 'sk-preferences-logout',
  templateUrl: './preferences-logout.component.html',
  styleUrls: ['./preferences-logout.component.scss']
})
export class PreferencesLogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  onSubmit() {
    this.authService.logout();
    this.toastrService.info('Bạn đã đăng xuất khỏi hệ thống', 'Bye : )');
    setTimeout(() => {
      this.router.navigate(['/dang-nhap']);
    }, 1000);
  }

  ngOnInit() {
  }

}
