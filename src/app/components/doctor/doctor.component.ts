import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
//import { TreatmentService } from '../../services/treatmentService';
//import { Sorter } from '../../shared/sorter';
import { FilterTextboxComponent } from './filterTextbox.component';
import { SortByDirective } from '../../shared/directives/sortby.directive';
//import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';
//import { TrimPipe } from '../../shared/pipes/trim.pipe';
//import {MATERIAL_DIRECTIVES} from "ng2-material/index";
//import { DoctorFormComponent } from './doctor-form'
//import { DoctorList } from './doctor-list'
//import { DoctorHeaderComponent } from './doctor-header'
import { Doctor} from './doctor.service';
import { NotificationService  } from '../../core/notification.service';
import { AuthService } from '../auth/auth.service';
@Component({ 
  selector: 'doctors', 
  templateUrl: 'doctor.component.html',
  host: {'[hidden]': 'hidden'}
})

export class DoctorComponent {
    selectedDoctor: Doctor;
    subscription: any;
    @Input() doctors: Doctor[];
    
    
   // @Output() openForm = new EventEmitter<string>();
   // formAction : string;
    constructor( public authService: AuthService, private notificationService: NotificationService ) { }
//    ngOnInit() {
//        this.subscription = this.notificationService.getFormActionChangeEmitter()
//          .subscribe(formAction => this.onFormActionChange(formAction));
//    }
//    onFormActionChange(item: string) {
//        console.log("selectedNavItem doctor component item = ", item, "selectedDoctor", this.selectedDoctor);
//    }
//    ngOnDestroy() {
//        this.subscription.unsubscribe();
//    }
}

