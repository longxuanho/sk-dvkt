import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './core/login/login.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'bang-tin' },
    { path: 'dang-nhap', component: LoginComponent },
    { path: 'thiet-lap', loadChildren: 'app/+preferences/preferences.module#PreferencesModule' },
    { path: 'nhap-lieu', loadChildren: 'app/+nhap-lieu/nhap-lieu.module#NhapLieuModule'},   
    // { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}

export const routableComponents = []