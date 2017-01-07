import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sk-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  // Navs available: userProfile, changePassword, logout
  selectedNav = {
    name: 'userProfile' 
  };

  constructor() { }

  ngOnInit() {
  }

}
