import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreferencesComponent } from './preferences.component';
import { NavPreferencesComponent } from './nav-preferences/nav-preferences.component';
import { PreferencesProfileComponent } from './preferences-profile/preferences-profile.component';
import { PreferencesLogoutComponent } from './preferences-logout/preferences-logout.component';
import { PreferencesChangePasswordComponent } from './preferences-change-password/preferences-change-password.component';
import { PreferencesProfileFormComponent } from './preferences-profile-form/preferences-profile-form.component';


const routes: Routes = [
    {
        path: '',
        component: PreferencesComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PreferencesRoutingModule { }

export const routedComponents = [
    PreferencesComponent,
    NavPreferencesComponent,
    PreferencesProfileComponent,
    PreferencesLogoutComponent,
    PreferencesChangePasswordComponent,
    PreferencesProfileFormComponent,    
];