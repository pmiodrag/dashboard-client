import { ChangeDetectionStrategy, AUTO_STYLE, Component, Input, Output, EventEmitter, trigger, state, style, animate, transition  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Patient, PatientBackendService} from './patient.service';
import { NotificationService  } from '../../core/notification.service';
import { Sorter } from '../../shared/sorter';
import { FilterTextboxComponent } from './filterTextbox.component';
import { PatientStore, PatientFormPage } from './PatientStore';
import {List} from 'immutable';
import {asObservable} from "../state/asObservable";
import * as Rx from "rxjs/Rx";
import {ICON_CLASS, ICON_CLASS_BG} from '../../shared/constants/app.constants';
import {PATIENT_OWNER} from '../../shared/constants/app.constants';
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { Router } from '@angular/router';
//import {IPaginationInstance} from 'ng2-pagination';
@Component({
    selector: 'patient-list', 
    providers: [MdIconRegistry],
    templateUrl: 'patient-list.component.html',
    host: { '[hidden]': 'hidden' },
    changeDetection: ChangeDetectionStrategy.OnPush,
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
                animate(100, style({transform: 'translateX(100%)'}))
            ])
        ]),
        trigger('heroState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
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


export class PatientListComponent {
//    pagination = {
//        currentPage: 1,
//        itemsPerPage: 5,
//        totalItems: 0
//    };
//    public config: IPaginationInstance = {
//        id: 'custom',
//        itemsPerPage: 10,
//        currentPage: 1
//    };
//    start: number = 0;
//    end: number = 3;
//    availableLength: Array<number> = [5, 10, 20];
    /**
    * True to show the source code for the example
    */
    public showSource: boolean = false;
    private showTabs: boolean = false;
    animationState: string;
    private src: string = "";
    public patientFormPage = PatientFormPage; 
    iconClass: string = ICON_CLASS; 
    iconClassBg: string = ICON_CLASS_BG; 
    owner: string = PATIENT_OWNER;
    title: string;
    toggleID: number;
    filterText: string;
//    @Input() listDisplayModeEnabled: boolean;
    filteredPatients: Patient[] = [];
    sorter: Sorter;
    patient: Patient;
    @Input() hidden: boolean = false;
//    @Input() patients: Patient[];
//    @Input() selected: Patient;
//    @Input() patientheader: any;
//    @Input() patientform: any;
    @Output() selectedChange: EventEmitter<any> = new EventEmitter();
//    selection: string;
//    count: number;
//     collection = [];
    private _patients: Rx.BehaviorSubject<List<Patient>> = new Rx.BehaviorSubject(List([]));
    constructor(private router: Router, mdIconRegistry: MdIconRegistry, private sanitizer: DomSanitizer, private patientService: PatientBackendService, private notificationService: NotificationService, private patientStore: PatientStore) {
//        this.refreshPatients();
//        this.collapse();
//        patientStore.loadInitialData();
        mdIconRegistry.addSvgIcon('M', sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/human-male.svg'));
        mdIconRegistry.addSvgIcon('F', sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/human-female.svg'));
        mdIconRegistry.addSvgIcon('account-remove', sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/account-remove.svg'));
//         for (let i = 1; i <= 100; i++) {
//            this.collection.push(`item ${i}`);
//        }
    }

    ngOnInit() {
        this.title = 'Patients';
        this.filterText = 'Filter Patients:';
//        this.listDisplayModeEnabled = false;
        this.sorter = new Sorter();
    }
    setPatientFormPage(page: PatientFormPage) {
        this.patientStore.setPatientFormPage(page);
    }

    goToPatientDetails(patientID: string){
        this.router.navigate(['/patients/' + patientID]);
    }
    
        
    listPatientTreatments(patient: Patient){
        console.log("listPatientTreatments"+patient.id);
        this.notificationService.emitFormActionChangeEvent(patient);
    }

//    deletePatient(patient: Patient) {
//        this.patientStore.deletePatient(patient);
//    }
    addPatient() {
//        this.hideElements();
        this.patient = new Patient(-1, '', '', '', 'M', '', '', new Date(), '', '', '', '', '', '');
//        this.formAction(this.patient);
    }
    editPatient(patient: Patient) {
        this.selectedChange.next(patient);
//        this.hideElements();
//        this.formAction(patient);
    }
   

    showCardView(show: boolean) {
        this.patientStore.changeView(show);
    }

    sort(prop: string) {
        //Check for complex type such as 'state.name'
        if (prop && prop.indexOf('.')) {

        }
        this.sorter.sort(this.filteredPatients, prop);
    }


  
  removeAccount(patient: Patient) {
      this.patientStore.deletePatient(patient);
  }

}
