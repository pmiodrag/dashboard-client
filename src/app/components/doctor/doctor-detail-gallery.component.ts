import { Component } from '@angular/core';
import { DoctorStore, DoctorFormPage } from './DoctorStore';
import 'rxjs/add/operator/switchMap';
@Component({
    selector: 'doctor-detail-gallery',
    templateUrl: 'doctor-detail-gallery.component.html'   
})

export class DoctorDetailGalleryComponent {
    constructor(private doctorStore: DoctorStore) {
        this.doctorStore.setDoctorFormPage(DoctorFormPage.Gallery);
    }


}
