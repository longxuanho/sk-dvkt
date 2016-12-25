import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sk-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  selectedForm: string = 'basicInfo';

  constructor() { }

  onSelect(message: string) {
    this.selectedForm = message;
  }

  ngOnInit() {
  }

}
