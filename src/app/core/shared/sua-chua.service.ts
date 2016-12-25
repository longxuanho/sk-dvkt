import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { SuaChua, refSuaChuas } from './sua-chua.model';

@Injectable()
export class SuaChuaService {

  handles: {
    suaChuasList?: FirebaseListObservable<SuaChua[]>,
    suaChuasCurrent?: FirebaseObjectObservable<SuaChua>
  } = {}

  constructor(private af: AngularFire) {
    this.handles.suaChuasList = this.af.database.list(refSuaChuas.suaChuasList + refSuaChuas.zone);
  }

  addNew(newSuaChua: SuaChua) {
    
    return new Promise<{ key: string, data: SuaChua }>((resolve, reject) => {
      this.handles.suaChuasList.push(newSuaChua)
        .then(success => resolve({
          key: success.key,
          data: newSuaChua
        }))
        .catch((error: Error) => reject(error.message));
    });

  }

  syncSuaChuasCurrent(key, newSuaChua) {
    return new Promise((resolve, reject) => {
      this.af.database.object(`${refSuaChuas.suaChuasCurrent}${refSuaChuas.zone}/${key}`).set(newSuaChua)
        .then(success => {
          resolve({
            key: success,
            data: newSuaChua
          })
        })
        .catch((error: Error) => reject(error.message));
    });
  }

  getSuaChuas() {
    // this.items = this._af.database.list('/items') as FirebaseListObservable<Item[]>;
    // return this.items;
  }

}