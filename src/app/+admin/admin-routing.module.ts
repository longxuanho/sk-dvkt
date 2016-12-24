import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

import { NavAdminComponent } from './nav-admin/nav-admin.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: 'nguoi-dung', loadChildren: 'app/+admin/+users/users.module#UsersModule' }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }

export const routedComponents = [
    AdminComponent,
    NavAdminComponent
];