import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Patient} from './patient.service';
import {ICON_CLASS, ICON_CLASS_BG} from '../../shared/constants/app.constants';
import { PatientStore } from './PatientStore';
//import { FilterTextboxComponent } from './filterTextbox.component';
@Component({
    selector: 'patient-header',
    templateUrl: 'patient-header.component.html'
})
export class PatientHeaderComponent {
    iconClass: string = ICON_CLASS; 
    iconClassBg: string = ICON_CLASS_BG; 
//    @Input() hidden: boolean = false;
//    @Input() patientform: any;
//    @Input() patientlist: any;
    patient: Patient;

    constructor(private patientStore: PatientStore) {
     //   this.refreshPatients();
    }

//    refreshPatients() {
//        this.start = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
//        this.end = this.start + this.pagination.itemsPerPage;
//        this.patientStore.setIndexes(this.start, this.end);
//    }
//    detectChange(event) {
//        if (event !== undefined && event.name === 'pagination_changed' && event.pagination !== undefined) {
//            this.pagination = event.pagination;
//            this.refreshPatients();
//        }
//    }


    addPatient() {
//        this.hidden = true;
//        this.patientlist.hidden = true;
//        this.patientform.hidden = false;
        this.patient = new Patient(-1, '', '', '', 'M', '', '', new Date(), '', '', '', '', '', '');
//        this.formAction(this.patient);
    }
//    formAction(patient: Patient) {
//        this.notificationService.emitFormActionChangeEvent(patient);
//    }
//    showCardView(show: boolean) {
//        this.patientStore.changeView(show);
//    }

    filterChanged(data: string) {
        console.log("filterChanged data", data);
        if (data) {
            data = data.toUpperCase();
            this.patientStore.filterData(data);
        }
    }
}
