import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { ToastrService } from 'toastr-ng2';
import { UserProfile } from './user-profile.model';

@Injectable()
export class AuthService {

  uid: string = '';
  auth: { data: UserProfile | null } = {
    data: null
  };

  constructor(
    private af: AngularFire,
    private toastrService: ToastrService
  ) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.uid = auth.uid;
        this.af.database.object(`/accounts/users/${this.uid}`).subscribe(data => {
          this.auth.data = <UserProfile>data;
          this.syncUserOnlineStatus(this.uid, true);
        });
      } else {
        this.uid = '';
        this.auth.data = null;
      }
    });
  }

  syncUserOnlineStatus(uid: string, status: boolean) {
    console.log('set data: ', uid, status);
    this.setAuthOnlineStatus(uid, status)
      .then(success => this.setAuthPresenceStatus(uid, status))
      .catch((error: string) => this.toastrService.error(error, 'Opps!'));
  }

  setAuthPresenceStatus(uid: string, status: boolean) {
    if (!uid)
      return new Promise((resolve, reject) => {
        reject('Người dùng chưa đăng nhập');
      });
    if (status && !!this.auth.data) {
      return new Promise((resolve, reject) => {
        this.af.database.object(`/accounts/userPresence/${uid}`).set({
          email: this.auth.data.email,
          displayName: this.auth.data.displayName,
          description: this.auth.data.description
        })
          .then(success => resolve())
          .catch((error: Error) => reject(`Ghi giá trị userPresence thất bại. ${error.message}`));
      });
    }
    return new Promise((resolve, reject) => {
      this.af.database.object(`/accounts/userPresence/${uid}`).remove()
        .then(success => resolve())
        .catch((error: Error) => reject(`Gỡ bỏ giá trị userPresence thất bại. ${error.message}`));
    });
  }

  setAuthOnlineStatus(uid: string, status: boolean) {
    if (!uid)
      return new Promise((resolve, reject) => {
        reject('Người dùng chưa đăng nhập');
      });
    return new Promise((resolve, reject) => {
      this.af.database.object(`/accounts/users/${uid}/online`).set(status)
        .then(success => resolve())
        .catch((error: Error) => reject(`Ghi giá trị userOnline thất bại. ${error.message}`));
    });
  }

  getAuthProfile() {
    return this.auth;
  }

  login(credential) {
    return this.af.auth.login({
      email: credential.email,
      password: credential.password
    });
  }

  logout() {
    this.syncUserOnlineStatus(this.uid, false);
    this.af.auth.logout();
  }

  isAuth() {
    return !!this.auth.data;
  }

}
