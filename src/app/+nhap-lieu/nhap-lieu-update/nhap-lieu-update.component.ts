import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { SuaChuaService } from '../../core/shared/sua-chua.service';
import { SuaChua } from '../../core/shared/sua-chua.model';

declare var moment: any;

@Component({
  selector: 'sk-nhap-lieu-update',
  templateUrl: './nhap-lieu-update.component.html',
  styleUrls: ['./nhap-lieu-update.component.scss']
})
export class NhapLieuUpdateComponent implements OnInit {

  suaChuaId: string;
  cloneSuaChua: SuaChua;

  constructor(
    private route: ActivatedRoute,
    private suaChuaService: SuaChuaService,
  ) { }

  setTrangThaiSuaChua(trangThai: string) {
    // this.suaChuaUpdateForm.get('trang_thai').setValue(trangThai);
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.suaChuaService.getSuaChua(params['id']))
      .subscribe((data: SuaChua) => {
        // Chú ý thứ tự set suaChuaId trước cloneSuaChua để trigger change trong nest component.
        this.suaChuaId = data.$key;
        this.cloneSuaChua = Object.assign({}, data);
      });
  }
}
