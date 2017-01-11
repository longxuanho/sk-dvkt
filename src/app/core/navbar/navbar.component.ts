import { Component, OnInit, OnDestroy } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToastrService } from 'toastr-ng2';
import { AuthService } from '../shared/auth.service';
import { NavbarSearchService } from '../../core/shared/navbar-search.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sk-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  navbarSearchMode: string = '';
  subscriptions: {
    navbarSearchMode?: Subscription
  } = {}

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private navbarSearchService: NavbarSearchService
  ) { }

  onLogOut() {
    this.authService.logout();
    this.toastrService.info('Bạn đã đăng xuất khỏi hệ thống', 'Bye : )');
  }

  ngOnInit() {
    this.subscriptions.navbarSearchMode = this.navbarSearchService.searchMode$.subscribe((searchMode: string) => {
      this.navbarSearchMode = searchMode ? searchMode : '';
    })
  }

  ngOnDestroy() {
    this.subscriptions.navbarSearchMode.unsubscribe();
  }

  

}
