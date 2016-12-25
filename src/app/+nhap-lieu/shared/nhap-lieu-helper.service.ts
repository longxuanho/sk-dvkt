import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as _ from 'lodash';

import { GSheetsConfig } from './gsheets.config';
import { LoaiSuaChua, LoaiThietBi, KhuVuc, ViTri } from './nhap-lieu-helper.model';


@Injectable()
export class NhapLieuHelperService {

  apis = {
    loaiSuaChuas: GSheetsConfig.master + GSheetsConfig.root + GSheetsConfig.loaiSuaChuas,
    loaiThietBis: GSheetsConfig.master + GSheetsConfig.root + GSheetsConfig.loaiThietBis,
    khuVucs: GSheetsConfig.master + GSheetsConfig.root + GSheetsConfig.khuVucs,
    viTris: GSheetsConfig.master + GSheetsConfig.root + GSheetsConfig.viTris
  }

  dataHelper: any = {
    data: {
      loaiSuaChuas: [],
      loaiThietBis: [],
      khuVucs: [],
      viTris: {}
    }
  };

  constructor(private http: Http) { }

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

  private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
