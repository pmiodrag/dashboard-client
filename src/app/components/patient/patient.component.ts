import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Patient} from './patient.service';
import { NotificationService  } from '../../core/notification.service';
import { AuthService } from '../auth/auth.service';
import { PatientStore } from './PatientStore';
@Component({ 
  selector: 'patients', 
  templateUrl: 'patient.component.html',
})

export class PatientComponent {
    selectedPatient: Patient;
    
    constructor( public patientStore: PatientStore, public authService: AuthService, public notificationService: NotificationService ) {
        console.log("PatientComponent patientStore", patientStore);
     }
}

