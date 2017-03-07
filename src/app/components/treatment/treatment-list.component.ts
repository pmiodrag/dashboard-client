import { Component, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Treatment, TreatmentBackendService} from "../treatment/treatment.service";
import { TreatmentStore } from './TreatmentStore';
import { NotificationService  } from '../../core/notification.service';
import {ICON_CLASS} from '../../shared/constants/app.constants';
import {DOCTOR_OWNER} from '../../shared/constants/app.constants';
import {PATIENT_OWNER} from '../../shared/constants/app.constants';
import * as Rx from "rxjs/Rx";
import {List} from 'immutable';
import {asObservable} from "../state/asObservable";
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
@Component({ 
  selector: 'treatment-list',
  providers: [TreatmentBackendService],
  templateUrl: 'treatment-list.component.html',
})
export class TreatmentListComponent {
    iconClass: string = ICON_CLASS;
    filteredTreatments: Treatment[] = [];
    owner: string;
    doctorID: number;
    patientID: number;
    private _treatments: Rx.BehaviorSubject<List<Treatment>> = new Rx.BehaviorSubject(List([]));
    constructor(private notificationService: NotificationService, mdIconRegistry: MdIconRegistry, private sanitizer: DomSanitizer, private route: ActivatedRoute, private treatmentService: TreatmentBackendService, private treatmentStore: TreatmentStore) {
        mdIconRegistry.addSvgIcon('account-remove', sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/account-remove.svg'));
    }   
    
    
    deleteTreatment(treatment: Treatment) {
        this.treatmentStore.deleteTreatment(treatment);
    }
    editTreatment(treatment: Treatment) {
        this.formAction(treatment);
    }
    
    formAction(treatment: Treatment) {
        console.log('TreatmentListComponent formAction treatment', treatment);
        this.notificationService.emitFormActionChangeEvent(treatment);
    }
  
}
