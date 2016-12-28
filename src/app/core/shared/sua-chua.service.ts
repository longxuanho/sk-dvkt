import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { SuaChua, refSuaChuas, TrangThaiSuaChua, DataModelSuaChuaSimple, DataModelSuaChuaTrangThai } from './sua-chua.model';

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

  setTrangThai(key: string, preparedData: DataModelSuaChuaTrangThai) {
    if (key) {
      return new Promise((resolve, reject) => {
        this.af.database.object(`${refSuaChuas.suaChuasList}${refSuaChuas.zone}/${key}`).update(preparedData)
          .then(success => resolve())
          .catch((error: Error) => reject(`Cập nhật trạng thái thất bại. ${error.message}`));
      });
    }
    return new Promise((resolve, reject) => {
      reject('Khóa chính (key) không hợp lệ');
    });
  }

  syncTrangThai(key: string, preparedData: DataModelSuaChuaSimple, options: { trang_thai?: number }) {
    if (key) {
      let ref = '';
      if (options.trang_thai === TrangThaiSuaChua.DangThucHien)
        ref = `${refSuaChuas.suaChuasCurrent}${refSuaChuas.zone}/${key}`;
      if (options.trang_thai === TrangThaiSuaChua.ChuanBiBanGiao)
        ref = `${refSuaChuas.suaChuasCurrent}${refSuaChuas.zone}/${key}`;
      if (options.trang_thai === TrangThaiSuaChua.HoanThanh)
        ref = `${refSuaChuas.suaChuasDone}${refSuaChuas.zone}/${key}`;

      if (ref)
        return new Promise((resolve, reject) => {
          this.af.database.object(ref).set(preparedData)
            .then(success => resolve())
            .catch((error: Error) => reject(`Đồng bộ dữ liệu thất bại. ${error.message}`));
        });
    }
    return new Promise((resolve, reject) => {
      reject('Khóa chính (key) hoặc trạng thái không hợp lệ');
    });
  }

  removeSyncTrangThai(key: string, options: { trang_thai?: number } = {}) {
    if (key) {
      let ref: string = '';

      if (options.trang_thai === TrangThaiSuaChua.ChuanBiBanGiao)
        ref = `${refSuaChuas.suaChuasCurrent}${refSuaChuas.zone}/${key}`;
      if (options.trang_thai === TrangThaiSuaChua.DangThucHien)
        ref = `${refSuaChuas.suaChuasCurrent}${refSuaChuas.zone}/${key}`;
      if (options.trang_thai === TrangThaiSuaChua.HoanThanh)
        ref = `${refSuaChuas.suaChuasDone}${refSuaChuas.zone}/${key}`;

      if (ref)
        return new Promise((resolve, reject) => {
          this.af.database.object(ref).remove()
            .then(success => resolve())
            .catch((error: Error) => reject(`Đồng bộ dữ liệu thất bại. ${error.message}`));
        });
    }
    return new Promise((resolve, reject) => {
      reject('Khóa chính (key) hoặc trạng thái không hợp lệ');
    });
  }



  getSuaChuasCurrent() {
    return this.handles.suaChuasCurrent;
  }

  getSuaChua(key: string) {
    return this.af.database.object(`${refSuaChuas.suaChuasList}${refSuaChuas.zone}/${key}`);
  }

}