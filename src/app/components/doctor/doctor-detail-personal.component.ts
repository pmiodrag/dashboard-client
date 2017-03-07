import { Component } from '@angular/core';
import { DoctorStore, DoctorFormPage } from './DoctorStore';
import 'rxjs/add/operator/switchMap';
@Component({
    selector: 'doctor-detail-personal',
    templateUrl: 'doctor-detail-personal.component.html'   
})

export class DoctorDetailPersonalComponent {
    constructor(private doctorStore: DoctorStore) {
        this.doctorStore.setDoctorFormPage(DoctorFormPage.Personal);
    }


}
