import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarSearchService } from '../../core/shared/navbar-search.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'sk-navbar-search',
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.scss']
})
export class NavbarSearchComponent implements OnInit {

  navbarSearchMode: string;
  navbarSearchPlaceHolder: string = 'Lọc mã thiết bị';
  subscriptions: {
    navbarSearchMode?: Subscription
  } = {}

  constructor(
    private navbarSearchService: NavbarSearchService
  ) { }

  onKey(event: any) {
    this.navbarSearchService.doSearch(event.target.value);
  }


  ngOnInit() {
    this.subscriptions.navbarSearchMode = this.navbarSearchService.searchMode$.subscribe((searchMode: string) => {
      this.navbarSearchMode = searchMode? searchMode : '';
    })
  }

  ngOnDestroy() {
    this.subscriptions.navbarSearchMode.unsubscribe();
  }

}
