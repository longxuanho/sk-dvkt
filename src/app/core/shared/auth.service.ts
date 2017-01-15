import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { ToastrService } from 'toastr-ng2';
import { UserProfile } from './user-profile.model';

import { firebaseConfig } from './core.config';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  uid: string = '';
  auth: { data: UserProfile | null } = {
    data: null
  };

  constructor(
    private af: AngularFire,
    private toastrService: ToastrService,
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

  setUserProfile(profile: UserProfile) {
    return new Promise((resolve, reject) => {
      if (this.uid) {
        this.af.database.object(`/accounts/users/${this.uid}`).set({
          displayName: profile.displayName,
          description: profile.description,
          email: firebase.auth().currentUser.email
        })
          .then((success) => resolve())
          .catch((error: Error) => reject(`Cập nhật hồ sơ thất bại. ${error.message}`))
      } else {
        reject(`Người dùng không tồn tại.`)
      }
    });
  }

  syncUserOnlineStatus(uid: string, status: boolean) {
    console.log('set data: ', uid, status);

    this.setAuthOnlineStatus(uid, status)
      .then(success => this.setAuthPresenceStatus(uid, status))
      .catch((error: string) => this.toastrService.error(error, 'Opps!'));
  }

  updatePassword(oldPassword: string, newPassword: string) {
    const credential = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, oldPassword);
    return new Promise((resolve, reject) => {
      firebase.auth().currentUser.reauthenticate(credential)
        .then((success) => {
          firebase.auth().currentUser.updatePassword(newPassword)
            .then(success => resolve(success));
        })
        .catch((error: Error) => reject(`Xác thực mật khẩu thất bại. ${error.message}`));
    });
  }

  setAuthPresenceStatus(uid: string, status: boolean) {
    if (!uid)
      return new Promise((resolve, reject) => {
        reject('Người dùng chưa đăng nhập');
      });
    if (status && !!this.auth.data) {
      let userData = {
        email: this.auth.data.email,
        displayName: this.auth.data.displayName,
        description: this.auth.data.description,
        online: true
      };
      Object.keys(userData).forEach((key) => (userData[key] == null) && delete userData[key]);
      return new Promise((resolve, reject) => {
        this.af.database.object(`/accounts/userPresence/${uid}`).set(userData)
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
    return new Promise<string>((resolve, reject) => {
      this.af.auth.login({
        email: credential.email,
        password: credential.password
      })
        .then((success: FirebaseAuthState) => {
          resolve(success.uid);
        })
        .catch((error: Error) => reject(`Đăng nhập thất bại. ${error.message}`));
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
