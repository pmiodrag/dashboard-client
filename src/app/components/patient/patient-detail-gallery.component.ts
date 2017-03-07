import { Component } from '@angular/core';
import { PatientStore, PatientFormPage } from './PatientStore';
import 'rxjs/add/operator/switchMap';
@Component({
    selector: 'patient-detail-gallery',
    templateUrl: 'patient-detail-gallery.component.html'   
})

export class PatientDetailGalleryComponent {
    constructor(private patientStore: PatientStore) {
        this.patientStore.setPatientFormPage(PatientFormPage.Gallery);
    }


}
