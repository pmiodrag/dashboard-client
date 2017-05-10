import { Component } from '@angular/core';
import { Doctor} from './doctor.service';
import { NotificationService  } from '../../core/notification.service';
import { AuthService } from '../auth/auth.service';
@Component({ 
  selector: 'doctors', 
  templateUrl: 'doctor.component.html',  
  host: {'[hidden]': 'hidden'}
})

export class DoctorComponent {
    constructor( public authService: AuthService ) { }
}

