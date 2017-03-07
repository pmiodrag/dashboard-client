import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TreatmentComponent } from './treatment.component';
import { TreatmentListComponent }    from './treatment-list.component';
import { TreatmentFormComponent }    from './treatment-form.component';
import { FilterTextboxComponent } from './filterTextbox.component';
import { SharedModule } from '../../shared/shared.module';
import { TreatmentRoutingModule }   from './treatment-routing.module';
import { TreatmentStore } from './TreatmentStore';
import { TreatmentBackendService} from './treatment.service';
import { DiagnoseStore } from '../diagnose/DiagnoseStore';
import { DiagnoseBackendService } from '../diagnose/diagnose.service';
import { DoctorStore } from '../doctor/DoctorStore';
import { DoctorBackendService } from '../doctor/doctor.service';
import { MaterialModule } from '@angular/material';
import { TypeaheadModule } from 'ng2-bootstrap/typeahead';
@NgModule({
    imports: [SharedModule.forRoot(), MaterialModule.forRoot(), TypeaheadModule.forRoot(), TreatmentRoutingModule],
    declarations: [
        TreatmentComponent,        
        TreatmentListComponent,
        TreatmentFormComponent,
        FilterTextboxComponent
    ],
    providers: [TreatmentBackendService, TreatmentStore, DiagnoseBackendService, DiagnoseStore, DoctorBackendService, DoctorStore],
    schemas:   [ CUSTOM_ELEMENTS_SCHEMA ],
    exports: [
        TreatmentComponent,
    ],    
})
export class TreatmentModule {
}
