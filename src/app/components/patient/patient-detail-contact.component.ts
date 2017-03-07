import { Component } from '@angular/core';
import { PatientStore, PatientFormPage } from './PatientStore';
import 'rxjs/add/operator/switchMap';
@Component({
    selector: 'patient-detail-contact',
    templateUrl: 'patient-detail-contact.component.html'   
})

export class PatientDetailContactComponent {
    constructor(private patientStore: PatientStore) {
        this.patientStore.setPatientFormPage(PatientFormPage.Contact);
    }


}
