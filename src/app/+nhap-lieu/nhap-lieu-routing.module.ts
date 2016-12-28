import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NhapLieuComponent } from './nhap-lieu.component';
import { NavNhapLieuComponent } from './nav-nhap-lieu/nav-nhap-lieu.component';
import { NhapLieuAddNewComponent } from './nhap-lieu-add-new/nhap-lieu-add-new.component';
import { NhapLieuListComponent } from './nhap-lieu-list/nhap-lieu-list.component';
import { NhapLieuUpdateComponent } from './nhap-lieu-update/nhap-lieu-update.component';
import { NhapLieuListStatusComponent } from './nhap-lieu-list-status/nhap-lieu-list-status.component';
import { NhapLieuUpdateBasicInfoFormComponent } from './nhap-lieu-update-basic-info-form/nhap-lieu-update-basic-info-form.component';
import { NhapLieuUpdateChuanBiBanGiaoFormComponent } from './nhap-lieu-update-chuan-bi-ban-giao-form/nhap-lieu-update-chuan-bi-ban-giao-form.component';
import { NhapLieuUpdateHoanThanhFormComponent } from './nhap-lieu-update-hoan-thanh-form/nhap-lieu-update-hoan-thanh-form.component';
import { NhapLieuUpdateHuyBoFormComponent } from './nhap-lieu-update-huy-bo-form/nhap-lieu-update-huy-bo-form.component';
import { NhapLieuUpdateDangThucHienFormComponent } from './nhap-lieu-update-dang-thuc-hien-form/nhap-lieu-update-dang-thuc-hien-form.component';


const routes: Routes = [
    {
        path: '',
        component: NhapLieuComponent,
        children: [
            { path: '', component: NhapLieuListComponent },
            { path: 'tao-moi', component: NhapLieuAddNewComponent },
            { path: ':id', component: NhapLieuUpdateComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NhapLieuRoutingModule { }

export const routedComponents = [
    NhapLieuComponent,
    NavNhapLieuComponent,
    NhapLieuAddNewComponent,
    NhapLieuListComponent,
    NhapLieuUpdateComponent,
    NhapLieuListStatusComponent,
    NhapLieuUpdateBasicInfoFormComponent,
    NhapLieuUpdateChuanBiBanGiaoFormComponent,
    NhapLieuUpdateHoanThanhFormComponent,
    NhapLieuUpdateHuyBoFormComponent,
    NhapLieuUpdateDangThucHienFormComponent
];