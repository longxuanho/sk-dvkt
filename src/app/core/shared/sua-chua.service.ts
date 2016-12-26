import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { SuaChua, refSuaChuas } from './sua-chua.model';

@Injectable()
export class SuaChuaService {

  suachuas: { data: SuaChua[] | null } = {
    data: null
  }

  handles: {
    suaChuasList?: FirebaseListObservable<SuaChua[]>,
    suaChuasCurrent?: FirebaseListObservable<SuaChua[]>
  } = {}

  constructor(private af: AngularFire) {
    this.handles.suaChuasList = this.af.database.list(refSuaChuas.suaChuasList + refSuaChuas.zone);
    this.handles.suaChuasCurrent = this.af.database.list(refSuaChuas.suaChuasCurrent + refSuaChuas.zone);
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

  getSuaChuasCurrent() {
    return this.handles.suaChuasCurrent;
  }

  getSuaChua(key: string) {
    return this.af.database.object(`${refSuaChuas.suaChuasList}${refSuaChuas.zone}/${key}`);
  }

}