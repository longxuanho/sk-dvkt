import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { SuaChua, refSuaChuas, TrangThaiSuaChua, DataModelSuaChuaSimple, DataModelTrangThaiChuanBiBG, DataModelTrangThaiHoanThanh, DataModelTrangThaiDangThucHien } from './sua-chua.model';

@Injectable()
export class SuaChuaService {

  suachuas: { data: SuaChua[] } = {
    data: []
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
    return new Promise<string>((resolve, reject) => {
      this.handles.suaChuasList.push(newSuaChua)
        .then((success: { key: string }) => resolve(success.key))
        .catch((error: Error) => reject('Tạo mới thất bại. ' + error.message));
    });
  }

  update(key: string, suaChua: SuaChua) {
    if (key)
      return new Promise<{}>((resolve, reject) => {
        this.af.database.object(`${refSuaChuas.suaChuasList}${refSuaChuas.zone}/${key}`).update(suaChua)
          .then(success => resolve())
          .catch((error: Error) => reject('Cập nhật thất bại. ' + error.message));
      });
    return new Promise((resolve, reject) => {
      reject('Khóa chính (key) không hợp lệ');
    });
  }

  syncSuaChuasCurrent(key, suaChua: DataModelSuaChuaSimple) {
    if (key)
      return new Promise((resolve, reject) => {
        this.af.database.object(`${refSuaChuas.suaChuasCurrent}${refSuaChuas.zone}/${key}`).set(suaChua)
          .then(success => resolve())
          .catch((error: Error) => reject(error.message));
      });
    return new Promise((resolve, reject) => {
      reject('Khóa chính (key) không hợp lệ');
    });
  }

  setTrangThaiChuanBiBanGiao(key: string, preparedData: DataModelTrangThaiChuanBiBG) {
    if (key)
      return new Promise((resolve, reject) => {
        this.af.database.object(`${refSuaChuas.suaChuasList}${refSuaChuas.zone}/${key}`).update(preparedData)
          .then(success => resolve())
          .catch((error: Error) => reject(`Cập nhật trạng thái thất bại. ${error.message}`));
      });
    return new Promise((resolve, reject) => {
      reject('Khóa chính (key) không hợp lệ');
    });
  }

  syncTrangThaiChuanBiBanGiao(key: string, preparedData: DataModelSuaChuaSimple) {
    if (key)
      return new Promise((resolve, reject) => {        
        this.af.database.object(`${refSuaChuas.suaChuasCurrent}${refSuaChuas.zone}/${key}`).set(preparedData)
          .then(success => resolve())
          .catch((error: Error) => reject(`Đồng bộ dữ liệu thất bại. ${error.message}`));
      });
    return new Promise((resolve, reject) => {
      reject('Khóa chính (key) không hợp lệ');
    });
  }

  removeTrangThaiChuanBiBanGiao(key: string) {
    if (key)
      return new Promise((resolve, reject) => {
        this.af.database.object(`${refSuaChuas.suaChuasCurrent}${refSuaChuas.zone}/${key}`).remove()
          .then(success => resolve())
          .catch((error: Error) => reject(`Đồng bộ dữ liệu thất bại. ${error.message}`));
      });
    return new Promise((resolve, reject) => {
      reject('Khóa chính (key) không hợp lệ');
    });
  }

  setTrangThaiHoanThanh(key: string, preparedData: DataModelTrangThaiHoanThanh) {
    if (key)
      return new Promise((resolve, reject) => {
        this.af.database.object(`${refSuaChuas.suaChuasList}${refSuaChuas.zone}/${key}`).update(preparedData)
          .then(success => resolve())
          .catch((error: Error) => reject(`Cập nhật trạng thái thất bại. ${error.message}`));
      });
    return new Promise((resolve, reject) => {
      reject('Khóa chính (key) không hợp lệ');
    });
  }

  syncTrangThaiHoanThanh(key: string, preparedData: DataModelSuaChuaSimple) {
    if (key)
      return new Promise((resolve, reject) => {
        this.af.database.object(`${refSuaChuas.suaChuasDone}${refSuaChuas.zone}/${key}`).set(preparedData)
          .then(success => resolve())
          .catch((error: Error) => reject(`Đồng bộ dữ liệu thất bại. ${error.message}`));
      });
    return new Promise((resolve, reject) => {
      reject('Khóa chính (key) không hợp lệ');
    });
  }

  setTrangThaiDangThucHien(key: string, preparedData: DataModelTrangThaiDangThucHien) {
     if (key)
      return new Promise((resolve, reject) => {
        this.af.database.object(`${refSuaChuas.suaChuasList}${refSuaChuas.zone}/${key}`).update(preparedData)
          .then(success => resolve())
          .catch((error: Error) => reject(`Cập nhật trạng thái thất bại. ${error.message}`));
      });
    return new Promise((resolve, reject) => {
      reject('Khóa chính (key) không hợp lệ');
    });
  }

  syncTrangThaiDangThucHien(key: string, preparedData: DataModelSuaChuaSimple) {
    if (key)
      return new Promise((resolve, reject) => {
        this.af.database.object(`${refSuaChuas.suaChuasCurrent}${refSuaChuas.zone}/${key}`).set(preparedData)
          .then(success => resolve())
          .catch((error: Error) => reject(`Đồng bộ dữ liệu thất bại. ${error.message}`));
      });
    return new Promise((resolve, reject) => {
      reject('Khóa chính (key) không hợp lệ');
    });
  }

  getSuaChuasCurrent() {
    return this.handles.suaChuasCurrent;
  }

  getSuaChua(key: string) {
    return this.af.database.object(`${refSuaChuas.suaChuasList}${refSuaChuas.zone}/${key}`);
  }

}