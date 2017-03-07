import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule }   from './dashboard-routing.module';
import { MaterialModule } from '@angular/material';
@NgModule({
    imports: [SharedModule.forRoot(), MaterialModule.forRoot(), DashboardRoutingModule],
    declarations: [
        DashboardComponent
    ],
    exports: [
        DashboardComponent
    ],    
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {
}
