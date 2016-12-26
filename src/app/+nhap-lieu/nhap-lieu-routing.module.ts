import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NhapLieuComponent } from './nhap-lieu.component';
import { NavNhapLieuComponent } from './nav-nhap-lieu/nav-nhap-lieu.component';
import { NhapLieuAddNewComponent } from './nhap-lieu-add-new/nhap-lieu-add-new.component';
import { NhapLieuListComponent } from './nhap-lieu-list/nhap-lieu-list.component';
import { NhapLieuUpdateComponent } from './nhap-lieu-update/nhap-lieu-update.component';
import { NhapLieuListStatusComponent } from './nhap-lieu-list-status/nhap-lieu-list-status.component';



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
];