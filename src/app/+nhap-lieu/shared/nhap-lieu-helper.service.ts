import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as _ from 'lodash';

import { GSheetsConfig } from './gsheets.config';
import { LoaiSuaChua, LoaiThietBi, KhuVuc, ViTri, MaThietBi, currentZone } from '../../core/shared/sua-chua.model';


@Injectable()
export class NhapLieuHelperService {

  apis = {
    loaiSuaChuas: GSheetsConfig.master + GSheetsConfig.root + GSheetsConfig.loaiSuaChuas,
    loaiThietBis: GSheetsConfig.master + GSheetsConfig.root + GSheetsConfig.loaiThietBis,
    maThietBis: GSheetsConfig.master + GSheetsConfig.root + GSheetsConfig.maThietBis,
    khuVucs: GSheetsConfig.master + GSheetsConfig.root + GSheetsConfig.khuVucs,
    viTris: GSheetsConfig.master + GSheetsConfig.root + GSheetsConfig.viTris
  }

  dataHelper: any = {
    data: {
      loaiSuaChuas: [],
      loaiThietBis: [],
      maThietBis: {},
      khuVucs: [],
      viTris: {}
    }
  };

  constructor(
    private http: Http,
    private af: AngularFire
  ) { }

  getLoaiSuaChuas() {
    return this.http.get(this.apis.loaiSuaChuas)
      .map((res: Response) => res.json().loaiSuaChuas)
      .map((data: LoaiSuaChua[]) => data.map(item => item.loaiSuaChua))
      .catch(this.handleError);
  }

  getLoaiThietBis() {
    return this.http.get(this.apis.loaiThietBis)
      .map((res: Response) => res.json().loaiThietBis)
      .map((data: LoaiThietBi[]) => data.map(item => item.loaiThietBi))
      .catch(this.handleError);
  }

  getMaThietBis() {
    return this.http.get(this.apis.maThietBis)
      .map((res: Response) => res.json().maThietBis)
      .map((res: any) => _.groupBy(res, 'loaiThietBi'))
      .catch(this.handleError);
  }


  getKhuVucs() {
    return this.http.get(this.apis.khuVucs)
      .map((res: Response) => res.json().khuVucs)
      .map((data: KhuVuc[]) => data.map(item => item.khuVuc))
      .catch(this.handleError);
  }

  getViTris() {
    return this.http.get(this.apis.viTris)
      .map((res: Response) => res.json().viTris)
      .map((res: any) => _.groupBy(res, 'khuVuc'))
      .catch(this.handleError);
  }

  setDataHelper(newDataHelper: any) {
    Object.assign(this.dataHelper.data, newDataHelper);
  }

  getDataHelper() {
    return this.dataHelper;
  }

  resetDataHelper() {
    this.dataHelper.data = {}
  }

  addNewMaThietBi(newMaThietBi: MaThietBi) {
    return new Promise<string>((resolve, reject) => {
      this.af.database.list(`sua-chuas/sua-chua-helpers/${currentZone}/ma-thiet-bis/`).push(newMaThietBi)
        .then((success: { key: string }) => resolve(success.key))
        .catch((error: Error) => reject('Tạo mới thất bại. ' + error.message));
    });
  }

  private handleError(error: any) {
    console.log(error);
    if (error instanceof Response) {
      return Observable.throw(error.json().error || 'Không thể truy vấn từ backend server.');
      // if you're using lite-server, use the following line
      // instead of the line above:
      //return Observable.throw(err.text() || 'Không thể truy vấn từ backend server.');
    }
    return Observable.throw(error || 'Không thể truy vấn từ backend server.');
  }
}
