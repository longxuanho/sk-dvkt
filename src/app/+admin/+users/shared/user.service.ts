import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuthState } from 'angularfire2';
import { User } from '../shared/user.model';

@Injectable()
export class UserService {
  
  constructor(
    private af: AngularFire
  ) {}

  getUsers(): FirebaseListObservable<any> {
    return this.af.database.list('/accounts/users');
  }

  getUserInfo(uid: string): FirebaseObjectObservable<User> {
    return this.af.database.object(`/accounts/users/${uid}`);
  }

  updateUserInfo(uid, userObject): firebase.Promise<void> {
    return this.af.database.object(`/accounts/users/${uid}`)
      .set({
        email: userObject.email,
        displayName: userObject.displayName,
        description: userObject.description,
        photoUrl: userObject.photoUrl,
        requireNewPassword: userObject.requireNewPassword
      });
  }
}
