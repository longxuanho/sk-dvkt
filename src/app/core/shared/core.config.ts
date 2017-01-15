import { AuthProviders, AuthMethods } from 'angularfire2';

export const firebaseConfig = {
  apiKey: 'AIzaSyCJIxpdJdkwDpLV9OfJkcNS09P7Whvr0-U',
  authDomain: 'dvkt-sk.firebaseapp.com',
  databaseURL: 'https://dvkt-sk.firebaseio.com',
  storageBucket: 'dvkt-sk.appspot.com'
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

export const displayConfig = {
  nhapLieuList_pastItemDoneCount: 6
}