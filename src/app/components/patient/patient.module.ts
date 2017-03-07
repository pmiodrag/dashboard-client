import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PatientComponent } from './patient.component';
import { FilterTextboxComponent } from './filterTextbox.component';
import { PatientHeaderComponent } from './patient-header.component';
import { PatientDetailComponent } from './patient-detail.component';
import { PatientListComponent } from './patient-list.component';
import { PatientFormComponent } from './patient-form.component';
import { PatientDetailPersonalComponent } from './patient-detail-personal.component';
import { PatientDetailContactComponent } from './patient-detail-contact.component';
import { PatientDetailGalleryComponent } from './patient-detail-gallery.component';
import { PatientDetailHealthComponent } from './patient-detail-health.component';
import { PatientRoutingModule }   from './patient-routing.module';
import { SharedModule }        from '../../shared/shared.module';
import { PatientBackendService} from './patient.service';
import { PatientStore } from './PatientStore';
import { MaterialModule } from '@angular/material';
import {CalendarModule} from 'primeng/primeng';
import { Md2Module }  from 'md2';
@NgModule({
    imports: [ SharedModule.forRoot(), MaterialModule.forRoot(),PatientRoutingModule, CalendarModule, Md2Module.forRoot() ],
    declarations: [
        PatientComponent,
        PatientHeaderComponent,
        PatientListComponent,
        PatientDetailComponent,
        PatientDetailPersonalComponent,
        PatientDetailContactComponent,
        PatientDetailGalleryComponent,
        PatientDetailHealthComponent,
        PatientFormComponent,
        FilterTextboxComponent
    ],
    providers: [PatientBackendService, PatientStore],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
//    exports: [
//        PatientsComponent
//    ],
//    imports: [MaterialModule.forRoot()],
//    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PatientModule {
}
