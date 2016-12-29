import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';

import { firebaseConfig, firebaseAuthConfig } from './shared/core.config';
import { ToastrModule } from 'toastr-ng2';
import { AuthService } from './shared/auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SuaChuaService } from './shared/sua-chua.service';
import { DateTimeConverterService } from './shared/date-time-converter.service';
import { SuaChuaModelBuilderService } from './shared/sua-chua-model-builder.service';

import { throwIfAlreadyLoaded } from './shared/module-import-guard';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({progressBar: false}),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
  ],
  declarations: [
    NavbarComponent, 
    LoginComponent,
    LogoutComponent,
  ],
  providers: [
    AuthService,
    DateTimeConverterService,
    SuaChuaService,    
    SuaChuaModelBuilderService
  ],
  exports: [
    NavbarComponent,
    LoginComponent,
    ToastrModule,
    AngularFireModule,
  ]
})
export class CoreModule { 
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}