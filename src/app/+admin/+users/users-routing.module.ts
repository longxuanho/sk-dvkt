import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';

import { UserListComponent } from './user-list/user-list.component';
import { UserAddNewComponent } from './user-add-new/user-add-new.component';
import { UserAddNewFormComponent } from './user-add-new-form/user-add-new-form.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailBasicInfoComponent } from './user-detail-basic-info/user-detail-basic-info.component';
import { UserDetailNavComponent } from './user-detail-nav/user-detail-nav.component';
import { UserDetailRightsComponent } from './user-detail-rights/user-detail-rights.component';
import { UserDetailResetPasswordComponent } from './user-detail-reset-password/user-detail-reset-password.component';


const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        children: [
            { path: '', component: UserListComponent },
            { path: 'tao-moi', component: UserAddNewComponent },
            { path: ':id', component: UserDetailComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsersRoutingModule { }

export const routedComponents = [
    UsersComponent,
    UserListComponent,
    UserDetailComponent,
    UserAddNewComponent,
    UserAddNewFormComponent,
    UserDetailBasicInfoComponent,
    UserDetailNavComponent,
    UserDetailRightsComponent,
    UserDetailResetPasswordComponent
];