import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations'; 
import { DoctorStore, DoctorFormPage } from './DoctorStore';
import 'rxjs/add/operator/switchMap';
@Component({
    selector: 'doctor-detail-personal',
    templateUrl: 'doctor-detail-personal.component.html',
    animations: [
        trigger('flyInOut', [
            state('in', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('0.6s ease-in')
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'translateX(100%)' }))
            ])
        ])
    ]
})

export class DoctorDetailPersonalComponent {
    constructor(public doctorStore: DoctorStore) {
        this.doctorStore.setDoctorFormPage(DoctorFormPage.Personal);
    }


}
