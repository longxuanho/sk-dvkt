import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HttpModule } from '@angular/http';
import { NhapLieuRoutingModule, routedComponents } from './nhap-lieu-routing.module';

import { NhapLieuHelperService } from './shared/nhap-lieu-helper.service';
import { MaThietBiPipe } from './shared/ma-thiet-bi.pipe';


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
    routedComponents,
    MaThietBiPipe,
  ]
})
export class NhapLieuModule { }
