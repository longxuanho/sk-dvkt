import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sk-nav-preferences',
  templateUrl: './nav-preferences.component.html',
  styleUrls: ['./nav-preferences.component.scss']
})
export class NavPreferencesComponent implements OnInit {

  @Input() selectedNav;

  constructor() { }

  onSelect(event: Event, navName: string) {
    event.preventDefault();
    if (this.selectedNav)
      this.selectedNav.name = navName;
  }

  ngOnInit() {
  }

}
