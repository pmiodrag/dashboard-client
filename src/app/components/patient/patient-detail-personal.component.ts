import { Component, AUTO_STYLE, trigger, state, style, animate, transition } from '@angular/core';
import { PatientStore, PatientFormPage } from './PatientStore';
import 'rxjs/add/operator/switchMap';
@Component({
    selector: 'patient-detail-personal',
    templateUrl: 'patient-detail-personal.component.html' ,
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
        ]),
        trigger('heroState', [
            state('inactive', style({
                backgroundColor: '#eee',
                transform: 'scale(1)'
            })),
            state('active', style({
                backgroundColor: '#cfd8dc',
                transform: 'scale(1.1)'
            })),
            transition('inactive => active', animate('100ms ease-in')),
            transition('active => inactive', animate('100ms ease-out'))
        ]),
        trigger('openClose', [
            state('collapsed, void',
                style({ height: '0px', color: 'lightgreen' })),
            state('expanded',
                style({ height: AUTO_STYLE, color: 'red' })),
            transition('collapsed <=> expanded', [
                animate(1000)
            ])
        ])
    ] 
})

export class PatientDetailPersonalComponent {
    constructor(public patientStore: PatientStore) {
        this.patientStore.setPatientFormPage(PatientFormPage.Personal);
    }


}
