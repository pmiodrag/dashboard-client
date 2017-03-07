import { Component } from '@angular/core';
import { DoctorStore, DoctorFormPage } from './DoctorStore';
import { Router }  from '@angular/router';
import 'rxjs/add/operator/switchMap';
@Component({
    selector: 'doctor-education-health',
    templateUrl: 'doctor-detail-education.component.html'
})

export class DoctorDetailEducationComponent {
    constructor(private doctorStore: DoctorStore) {
        this.doctorStore.setDoctorFormPage(DoctorFormPage.Education);
    }
   

}
