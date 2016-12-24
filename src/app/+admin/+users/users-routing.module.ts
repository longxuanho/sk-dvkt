import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';

import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';


const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        children: [
            { path: '', component: UserListComponent },
            // { path: 'tao-moi', component: UserAddNewComponent },
            // { path: ':id', component: UserDetailComponent }
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
    UserDetailComponent
];