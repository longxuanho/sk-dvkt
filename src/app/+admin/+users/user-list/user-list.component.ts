import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'toastr-ng2';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'sk-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  subscriptions: {
    users?: Subscription;
  } = {}
  
  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) { }

  getUsers() {
    this.users = [];
    this.subscriptions.users = this.userService.getUsers().subscribe(
      snapshots => {
        this.users = <User[]>snapshots;
      }, error => {
        this.toastrService.error('Không thể truy vấn dữ liệu.', 'Opps!');
        console.log('Opps, ', error);
      });
  }

  ngOnInit() {
    this.getUsers();
  }

  ngOnDestroy() {
    this.subscriptions.users.unsubscribe();
  }

}
