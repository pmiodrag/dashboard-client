import { Component } from '@angular/core';
import { PatientStore, PatientFormPage } from './PatientStore';
import { ActivatedRoute, Router, Params  }  from '@angular/router';
import 'rxjs/add/operator/switchMap';
@Component({
    selector: 'patient-detail-health',
    templateUrl: 'patient-detail-health.component.html'
})

export class PatientDetailHealthComponent {
    constructor(public patientStore: PatientStore) {
        this.patientStore.setPatientFormPage(PatientFormPage.HealthInfo);
    }
   

}
