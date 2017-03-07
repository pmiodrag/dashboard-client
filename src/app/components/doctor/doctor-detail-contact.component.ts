import { Component } from '@angular/core';
import { DoctorStore, DoctorFormPage } from './DoctorStore';
import 'rxjs/add/operator/switchMap';
@Component({
    selector: 'doctor-detail-contact',
    templateUrl: 'doctor-detail-contact.component.html'   
})

export class DoctorDetailContactComponent {
    constructor(private doctorStore: DoctorStore) {
        this.doctorStore.setDoctorFormPage(DoctorFormPage.Contact);
    }


}
