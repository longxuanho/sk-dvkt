import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PreferencesRoutingModule, routedComponents } from './preferences-routing.module';

@NgModule({
  imports: [
    SharedModule,
    PreferencesRoutingModule
  ],
  declarations: [
    routedComponents
  ]
})
export class PreferencesModule { }
