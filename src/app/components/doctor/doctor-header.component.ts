import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NotificationService  } from '../../core/notification.service';
import { Doctor} from './doctor.service';
import {ICON_CLASS, ICON_CLASS_BG} from '../../shared/constants/app.constants';
import { DoctorStore } from  './DoctorStore';
//import { FilterTextboxComponent } from './filterTextbox.component';
@Component({
    selector: 'doctor-header',
    templateUrl: 'doctor-header.component.html',
    host: { '[hidden]': 'hidden' }
})
export class DoctorHeaderComponent {
    pagination = {
        currentPage: 1,
        itemsPerPage: 5,
        totalItems: 24
    };
    start: number = 0;
    end: number = 3;
    availableLength: Array<number> = [5, 10, 20];
    iconClass: string = ICON_CLASS; 
    iconClassBg: string = ICON_CLASS_BG; 
    doctor: Doctor;
    listDisplayModeEnabled: boolean;

    constructor(private notificationService: NotificationService, private doctorStore: DoctorStore) {
    }


    addDoctor() {
//        this.hidden = true;
//        this.doctorlist.hidden = true;
//        this.doctorform.hidden = false;
          
        this.doctor = new Doctor(-1, '', '', '', '', '', '', 'M', '', '', new Date(), '', '', '', '');
//        this.formAction(this.doctor);
    }
    filterChanged(data: string) {
        console.log("filterChanged data", data);
        if (data) {
            data = data.toUpperCase();
            this.doctorStore.filterData(data);
        }
    }
}
