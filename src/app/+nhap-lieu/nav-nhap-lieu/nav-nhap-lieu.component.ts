import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'sk-nav-nhap-lieu',
  templateUrl: './nav-nhap-lieu.component.html',
  styleUrls: ['./nav-nhap-lieu.component.scss']
})
export class NavNhapLieuComponent implements OnInit {

  subscriptions: { routeEvent?: Subscription } = {};
  currentUrl: string;
  currentUrlText: string;
  textRefs = {
    '/nhap-lieu': 'Danh sách',
    '/nhap-lieu/tao-moi': 'Tạo mới'
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.subscriptions.routeEvent = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.urlAfterRedirects;
      this.currentUrlText = this.textRefs[this.currentUrl];
    });
  }

  ngOnDestroy() {
    this.subscriptions.routeEvent.unsubscribe();
  }

   

}
