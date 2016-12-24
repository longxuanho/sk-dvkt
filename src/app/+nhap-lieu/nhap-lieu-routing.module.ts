import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NhapLieuComponent } from './nhap-lieu.component';
import { NavNhapLieuComponent } from './nav-nhap-lieu/nav-nhap-lieu.component';
import { NhapLieuAddNewComponent } from './nhap-lieu-add-new/nhap-lieu-add-new.component';


const routes: Routes = [
    {
        path: '',
        component: NhapLieuComponent,
        children: [
            { path: 'tao-moi', component: NhapLieuAddNewComponent },
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
    NhapLieuAddNewComponent
];