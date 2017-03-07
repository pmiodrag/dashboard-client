import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Patient, PatientBackendService} from './patient.service';
import { NotificationService  } from '../../core/notification.service';
import {ValidationService} from '../../shared/services/validation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
//import {MyDatePicker} from 'mydatepicker/src/index';
//import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload/ng2-file-upload';
import { PatientFormPage, PatientStore } from './PatientStore';
//import { UiStateStore } from '../state/UiStateStore';
import {ICON_CLASS, ICON_CLASS_BG} from '../../shared/constants/app.constants';
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
//import * as moment from 'moment';

@Component({
    selector: 'patient-form',
    templateUrl: 'patient-form.component.html',
    //host: { '[hidden]': 'hidden' }
})


export class PatientFormComponent  implements OnInit {
    iconClass: string = ICON_CLASS;
    
    iconClassBg: string = ICON_CLASS_BG; 
    public patientFormPage = PatientFormPage;     
//    public uploader: FileUploader = new FileUploader({ url: '/patient/upload' });
//    patientForm: ControlGroup;
    @Input() patient: Patient;
    @Input() hidden: boolean = true;
    @Input() patientheader: any;
    @Input() patientlist: any;
    formTitle: string;
    submitAction: string;
    subscription: any;
    public patientForm: FormGroup; // our model driven form
    public submitted: boolean = false; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes

    avatarData: any[] = [{
        id: 'M',
        title: 'M',
        value: 'M',
        color: 'md-primary'
    }, {
            id: 'F',
            title: 'F',
            value: 'F',
            color: 'md-warn'
        }];

  disabled: boolean = true;
//  date: Date = new Date(2016, 9, 15);
//  time: Date = new Date(1, 1, 1, 12, 10);
//  datetime: Date = new Date(2016, 9, 15, 12, 10);
//  minDate: Date = new Date(2016, 7, 15);
//  maxDate: Date = new Date(2016, 12, 15);
 

    constructor(private router: Router, private _fb: FormBuilder, private patientStore: PatientStore, mdIconRegistry: MdIconRegistry, private sanitizer: DomSanitizer, private patientService: PatientBackendService, private notificationService: NotificationService) {
        
        mdIconRegistry.addSvgIcon('F', 'assets/images/svg/human-female.svg');
        mdIconRegistry.addSvgIcon('M', 'assets/images/svg/human-male.svg');
        mdIconRegistry.addSvgIcon('identification-card', 'assets/images/svg/account-card-details.svg');
      
    }
    handleChange(value: any) {
        console.log('Changed data: ', value);
    }

    ngOnInit() {
        this.patient = new Patient(0, '', '', '', 'M', '', '', new Date(), '', '', '', '', '', '');
        this.patientForm = this._fb.group({
            personal: this._fb.group({
                firstname: ['', Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(30)])],
                lastname: ['', Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(30)
                ])],
                middlename: [''],
                gender:[''],
                photo:[''],
                birthdate:['']
            }),
            additional: this._fb.group({
                allergies: [''],
                notes: ['']
            }),
            contact: this._fb.group({
                email: ['', ValidationService.emailValidator],
                street: ['', <any>Validators.required],
                place: [''],
                phone: [''],
                mobilephone: ['']
            })
        });
        this.setPatientFormPage(PatientFormPage.Personal);
        this.subscription = this.notificationService.getFormActionChangeEmitter()
            .subscribe(patient => this.onFormActionChange(patient));
    }
    onFormActionChange(patient: Patient) {
        this.patient = patient;
        if (patient.id == -1) {
            this.formTitle = "Add Patient";
            this.submitAction = 'add';
        } else {
            this.formTitle = "Edit Patient";
            this.submitAction = 'edit';
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    addPatient(patient) {
//        if(this.uploader.queue && this.uploader.queue.length > 0) {
//           patient.photo = this.uploader.queue[0].file.name;
//        } else {
//           patient.photo = "";
//        }      
        this.patientStore.addPatient(patient)
        this.goBack();
    }

    updatePatient(patient) {
//        if(this.uploader.queue && this.uploader.queue.length > 0) {
//           patient.photo = this.uploader.queue[0].file.name;
//        } else {
//           patient.photo = "";
//        }
        
        this.patientStore.updatePatient(patient)
            .subscribe(
            res => { },
            err => {
                console.log("Error");
               // this.uiStateStore.endBackendAction();
            }
            );
        this.goBack();
    }

    goBack() {
            this.router.navigate(['/patients']);
//        this.hidden = true;
//        this.patientheader.hidden = false;
//        this.patientlist.hidden = false;
    }

    onSubmit() { 
      
//        if (this.submitAction == 'add') {
//            this.addPatient(patient);
//        } else {
//            this.updatePatient(patient);
//        }
        let patient = this.dataToPatient();
        patient.birthdate.setHours(12);
        this.addPatient(patient);
        this.submitted = true;
        this.goBack();
    }
    private dataToPatient() : Patient {
        let patient = this.patientForm;
         return new Patient
         (0, patient.value.personal.firstname, patient.value.personal.lastname, patient.value.personal.middlename,
        patient.value.personal.gender, patient.value.contact.street, patient.value.contact.place, new Date(), patient.value.contact.email,
        patient.value.contact.phone, patient.value.contact.mobilephone, patient.value.contact.photo, patient.value.additional.allergies, patient.value.additional.notes); 
    }
    setPatientFormPage(page: PatientFormPage) {
        this.patientStore.setPatientFormPage(page);
    }
    


}