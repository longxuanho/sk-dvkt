import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UsersRoutingModule, routedComponents } from './users-routing.module';

import { UserService } from './shared/user.service';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  providers: [
    UserService
  ],
  declarations: [
    routedComponents
  ]
})
export class UsersModule { }
