import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UsersRoutingModule, routedComponents } from './users-routing.module';

import { UserService } from './shared/user.service';
import { UserDetailDeactivateComponent } from './user-detail-deactivate/user-detail-deactivate.component';



@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  providers: [
    UserService
  ],
  declarations: [
    routedComponents,
    UserDetailDeactivateComponent
  ]
})
export class UsersModule { }
