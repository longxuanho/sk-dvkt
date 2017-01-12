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
  showMaThietBiForm: boolean = false;

  navbarSearchModeSub: Subscription;
  showMaThietBiFormSub: Subscription;

  constructor(
    private navbarSearchService: NavbarSearchService
  ) { }

  onKey(event: any) {
    this.navbarSearchService.doSearch(event.target.value);
  }

  toggleMaThietBiForm() {
    this.showMaThietBiForm = !this.showMaThietBiForm;
    this.navbarSearchService.toggleMaThietBiForm(this.showMaThietBiForm)
  }


  ngOnInit() {
    this.navbarSearchModeSub = this.navbarSearchService.searchMode$.subscribe((searchMode: string) => {
      this.navbarSearchMode = searchMode? searchMode : '';
    });
    this.showMaThietBiFormSub = this.navbarSearchService.showMaThietBiForm$.subscribe((state: boolean) => {
      this.showMaThietBiForm = state ? state : false;
    });
  }

  ngOnDestroy() {
    if (this.navbarSearchModeSub)
      this.navbarSearchModeSub.unsubscribe();
    if (this.showMaThietBiFormSub)
      this.showMaThietBiFormSub.unsubscribe();
  }

}
