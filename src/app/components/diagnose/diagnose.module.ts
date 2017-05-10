import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DiagnoseComponent } from './diagnose.component';
import { FilterTextboxComponent } from './filterTextbox.component';
import { SharedModule } from '../../shared/shared.module';
import { DiagnoseRoutingModule }   from './diagnose-routing.module';
import { DiagnoseStore } from './DiagnoseStore';
import { DiagnoseBackendService} from './diagnose.service';
import { MaterialModule } from '@angular/material';
@NgModule({
    imports: [SharedModule.forRoot(), MaterialModule, DiagnoseRoutingModule],
    declarations: [
        DiagnoseComponent,
        FilterTextboxComponent
    ],
    providers: [DiagnoseBackendService, DiagnoseStore],
    exports: [
        DiagnoseComponent
    ],    
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DiagnoseModule {
}
