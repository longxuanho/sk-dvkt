import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class NavbarSearchService {

  private searchModeSource = new Subject<string>();
  private searchStringSource = new Subject<string>();
  private showMaThietBiFormSource = new Subject<boolean>();

  searchMode$ = this.searchModeSource.asObservable();
  searchString$ = this.searchStringSource.asObservable();
  showMaThietBiForm$ = this.showMaThietBiFormSource.asObservable();

  constructor() { }

  setSearchMode(mode: string) {
    this.searchModeSource.next(mode);
  }

  doSearch(searchString: string) {
    this.searchStringSource.next(searchString);
  }

  toggleMaThietBiForm(state: boolean) {
    this.showMaThietBiFormSource.next(state);
  }

}
