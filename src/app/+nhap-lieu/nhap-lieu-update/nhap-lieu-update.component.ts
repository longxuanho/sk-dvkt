import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';

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
  formDisplay: string = 'Đang thực hiện';
  subscriptions: {
    suaChua?: Subscription
  } = {};

  constructor(
    private route: ActivatedRoute,
    private suaChuaService: SuaChuaService,
  ) { }

  setFormDisplay(formDisplayName: string) {
    this.formDisplay = formDisplayName;
  }

  ngOnInit() {
    this.subscriptions.suaChua = this.route.params
      .switchMap((params: Params) => this.suaChuaService.getSuaChua(params['id']))
      .subscribe((data: SuaChua) => {
        // Chú ý thứ tự set suaChuaId trước cloneSuaChua để trigger change trong nest component.
        // console.log('subscribe data: ', data);
        this.suaChuaId = data.$key;
        this.cloneSuaChua = Object.assign({}, data);
      });
  }

  ngOnDestroy() {
    this.subscriptions.suaChua.unsubscribe();
  }
}
