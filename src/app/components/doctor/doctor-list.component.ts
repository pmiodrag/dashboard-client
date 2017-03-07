import { ChangeDetectionStrategy, AUTO_STYLE, Component, Input, Output, EventEmitter, trigger, state, style, animate, transition  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Doctor, DoctorBackendService} from './doctor.service';
import { NotificationService  } from '../../core/notification.service';
import { Sorter } from '../../shared/sorter';
import { FilterTextboxComponent } from './filterTextbox.component';
//import { DoctorFormComponent } from './doctor-form.component'
import { DoctorStore, DoctorFormPage } from  './DoctorStore';
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
    selector: 'doctor-list', 
    providers: [MdIconRegistry],
    templateUrl: 'doctor-list.component.html',
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


export class DoctorListComponent {
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
    public doctorFormPage = DoctorFormPage; 
    iconClass: string = ICON_CLASS; 
    iconClassBg: string = ICON_CLASS_BG; 
    owner: string = PATIENT_OWNER;
    title: string;
    toggleID: number;
    filterText: string;
//    @Input() listDisplayModeEnabled: boolean;
    filteredDoctors: Doctor[] = [];
    sorter: Sorter;
    doctor: Doctor;
    @Input() hidden: boolean = false;
//    @Input() doctors: Doctor[];
//    @Input() selected: Doctor;
//    @Input() doctorheader: any;
//    @Input() doctorform: any;
    @Output() selectedChange: EventEmitter<any> = new EventEmitter();
//    selection: string;
//    count: number;
//     collection = [];
    private _doctors: Rx.BehaviorSubject<List<Doctor>> = new Rx.BehaviorSubject(List([]));
    constructor(private router: Router, mdIconRegistry: MdIconRegistry, private sanitizer: DomSanitizer, private doctorService: DoctorBackendService, private notificationService: NotificationService, private doctorStore: DoctorStore) {
//        this.refreshDoctors();
//        this.collapse();
        mdIconRegistry.addSvgIcon('M', sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/human-male.svg'));
        mdIconRegistry.addSvgIcon('F', sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/human-female.svg'));
        mdIconRegistry.addSvgIcon('account-remove', sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/account-remove.svg'));
//         for (let i = 1; i <= 100; i++) {
//            this.collection.push(`item ${i}`);
//        }
    }

    ngOnInit() {
        this.title = 'Doctors';
        this.filterText = 'Filter Doctors:';
//        this.listDisplayModeEnabled = false;
        this.sorter = new Sorter();
    }
    setDoctorFormPage(page: DoctorFormPage) {
        this.doctorStore.setDoctorFormPage(page);
    }

    goToDoctorDetails(doctorID: string){
        this.router.navigate(['/doctors/' + doctorID]);
    }
    
        
    listDoctorTreatments(doctor: Doctor){
        console.log("listDoctorTreatments"+doctor.id);
        this.notificationService.emitFormActionChangeEvent(doctor);
    }

//    deleteDoctor(doctor: Doctor) {
//        this.doctorStore.deleteDoctor(doctor);
//    }
    addDoctor() {
//        this.hideElements();
        this.doctor = new Doctor(-1, '', '', '', '', '', '', 'M', '', '', new Date(), '', '', '', '');
//        this.formAction(this.doctor);
    }
    editDoctor(doctor: Doctor) {
        this.selectedChange.next(doctor);
//        this.hideElements();
//        this.formAction(doctor);
    }
   

    showCardView(show: boolean) {
        this.doctorStore.changeView(show);
    }

    sort(prop: string) {
        //Check for complex type such as 'state.name'
        if (prop && prop.indexOf('.')) {

        }
        this.sorter.sort(this.filteredDoctors, prop);
    }


  
  removeAccount(doctor: Doctor) {
      this.doctorStore.deleteDoctor(doctor);
  }

}
