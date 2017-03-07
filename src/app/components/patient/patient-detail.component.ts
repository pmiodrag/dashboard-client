import { AUTO_STYLE, Component, Input, Output, EventEmitter, trigger, state, style, animate, transition  } from '@angular/core';
import { Patient, PatientBackendService} from './patient.service';
import { PatientStore, PatientFormPage } from './PatientStore';
import {ICON_CLASS, ICON_CLASS_BG} from '../../shared/constants/app.constants';
import {PATIENT_OWNER} from '../../shared/constants/app.constants';
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { ActivatedRoute, Router, Params  }  from '@angular/router';

@Component({
    selector: 'patient-detail',
    providers: [MdIconRegistry],
    templateUrl: 'patient-detail.component.html',
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
export class PatientDetailComponent {
    /**
    * True to show the source code for the example
    */
    private patientID: number;
    animationState: string;
//    private patientList: Patient[];
//    patient: Patient;
    public patientFormPage = PatientFormPage;
    iconClass: string = ICON_CLASS;
    iconClassBg: string = ICON_CLASS_BG;
    owner: string = PATIENT_OWNER;
    constructor(private patientStore: PatientStore, private router: Router, private route: ActivatedRoute, private mdIconRegistry: MdIconRegistry, private sanitizer: DomSanitizer) {
        mdIconRegistry.addSvgIcon('M', sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/human-male.svg'));
        mdIconRegistry.addSvgIcon('F', sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/human-female.svg'));
    }
   
    ngOnInit() {
//         this.patientID = parseInt(this.route.snapshot.params['id'], 10);
        this.route.params.subscribe(params => {
            console.log("Params", params)
            this.patientID = +params['id']; // (+) converts string 'id' to a number
            console.log("ngOnInit PatientDetailComponent", this.patientID);
            this.patientStore.getPatient(this.patientID);
            // By default open personal info tab.
            this.navigateTo('personal');
        });
        
    }

    private navigateTo(page: string) {
        
        if (page == 'treatments') {
            this.router.navigate(['/patients', this.patientID, this.owner, page] );
            this.patientStore.setPatientFormPage(PatientFormPage.Treatments);
        } else {
            this.router.navigate(['/patients', this.patientID, page] );
        }
    }

}
