import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardTableComponent } from './dashboard-table/dashboard-table.component';
import { DashboardClockComponent } from './dashboard-clock/dashboard-clock.component';
import { DashboardStatusComponent } from './dashboard-status/dashboard-status.component';
import { DashboardStatisticsComponent } from './dashboard-statistics/dashboard-statistics.component'

const routes: Routes = [
    { 
        path: 'bang-tin', 
        component: DashboardComponent,
        // children: []
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule {}

export const routedComponents = [
    DashboardComponent,
    DashboardTableComponent,
    DashboardClockComponent,
    DashboardStatusComponent,
    DashboardStatisticsComponent
]