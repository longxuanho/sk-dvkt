import { Injectable } from '@angular/core';
import { firebaseConfig } from './core.config';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

    constructor() {
        firebase.initializeApp(firebaseConfig);
    }

    getFirebaseInstance() {
        return firebase;
    }


}
