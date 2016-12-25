import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';

import { UserProfile } from './user-profile.model';

@Injectable()
export class AuthService {

  uid: string = '';
  auth: { data: UserProfile | null } = {
    data: null
  };

  constructor(private af: AngularFire) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.uid = this.af.auth.getAuth().uid;
        this.af.database.object(`/accounts/users/${this.uid}`).subscribe(data => {
          this.auth.data = <UserProfile>data;
          this.setAuthOnlineStatus(true);
          this.setAuthPresenceStatus(true);          
        });
      } else {
        this.setAuthOnlineStatus(false);
        this.setAuthPresenceStatus(false);
        this.uid = '';
        this.auth.data = null;
      }
    });
  }

  setAuthPresenceStatus(status: boolean) {
    if (this.uid) {
      if (status && !!this.auth.data) {
        this.af.database.object(`/accounts/userPresence/${this.uid}`).set({
          email: this.auth.data.email,
          displayName: this.auth.data.displayName,
          description: this.auth.data.description
        });
      } else {
        this.af.database.object(`/accounts/userPresence/${this.uid}`).remove();
      }
    }
  }

  setAuthOnlineStatus(status: boolean) {
    if (this.uid)
      this.af.database.object(`/accounts/users/${this.uid}/online`).set(status);
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
    this.af.auth.logout();
  }

  isAuth() {
    return !!this.auth.data;
  }

}
