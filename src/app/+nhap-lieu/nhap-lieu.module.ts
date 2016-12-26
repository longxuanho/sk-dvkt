import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HttpModule } from '@angular/http';
import { NhapLieuRoutingModule, routedComponents } from './nhap-lieu-routing.module';

import { NhapLieuHelperService } from './shared/nhap-lieu-helper.service';



@NgModule({
  imports: [
    SharedModule,
    HttpModule,
    NhapLieuRoutingModule
  ],
  providers: [
    NhapLieuHelperService,
  ],
  declarations: [
    routedComponents
  ]
})
export class NhapLieuModule { }
