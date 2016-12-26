import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sk-user-detail-nav',
  templateUrl: './user-detail-nav.component.html',
  styleUrls: ['./user-detail-nav.component.scss']
})
export class UserDetailNavComponent implements OnInit {

  @Output() select: EventEmitter<string> = new EventEmitter<string>();
  userNavForm: FormGroup;
  subscriptions: {
    selectedForm?: Subscription
  } = {}

  constructor(
    private formBuilder: FormBuilder
  ) { }

  builForm() {
    this.userNavForm = this.formBuilder.group({
      selectedForm: this.formBuilder.control('basicInfo')
    });
    this.userNavForm.get('selectedForm').valueChanges
      .subscribe((value: string) => {
        this.select.emit(value);
      })
  }

  ngOnInit() {
    this.builForm();
  }

  ngOnDestroy() {
    this.subscriptions.selectedForm.unsubscribe();
  }

}
