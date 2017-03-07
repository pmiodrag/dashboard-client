import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Doctor, DoctorBackendService} from './doctor.service';
import { NotificationService  } from '../../core/notification.service';
import {ValidationService} from '../../shared/services/validation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorFormPage, DoctorStore } from './DoctorStore';
import {ICON_CLASS, ICON_CLASS_BG} from '../../shared/constants/app.constants';
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
//import * as moment from 'moment';

@Component({
    selector: 'doctor-form',
    templateUrl: 'doctor-form.component.html',
    //host: { '[hidden]': 'hidden' }
})


export class DoctorFormComponent  implements OnInit {
    iconClass: string = ICON_CLASS;
    
    iconClassBg: string = ICON_CLASS_BG; 
    public doctorFormPage = DoctorFormPage;   
    @Input() doctor: Doctor;
    @Input() hidden: boolean = true;
    @Input() doctorheader: any;
    @Input() doctorlist: any;
    formTitle: string;
    submitAction: string;
    subscription: any;
    public doctorForm: FormGroup; // our model driven form
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
  date: Date = new Date(2016, 9, 15);
  time: Date = new Date(1, 1, 1, 12, 10);
  datetime: Date = new Date(2016, 9, 15, 12, 10);
  minDate: Date = new Date(2016, 7, 15);
  maxDate: Date = new Date(2016, 12, 15);
 

    constructor(private router: Router, private _fb: FormBuilder, private doctorStore: DoctorStore, mdIconRegistry: MdIconRegistry, private sanitizer: DomSanitizer, private doctorService: DoctorBackendService, private notificationService: NotificationService) {
        
        mdIconRegistry.addSvgIcon('F', sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/human-female.svg'));
        mdIconRegistry.addSvgIcon('M', sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/human-male.svg'));
        mdIconRegistry.addSvgIcon('identification-card', sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/account-card-details.svg'));
      
    }
 handleChange(value: any) {
    console.log('Changed data: ', value);
  }
//  id: number;
//    firstname: string;
//    lastname: string;
//    middlename: string;
//    title: string;
//    degreeyear: string;
//    degreeplace: string;
//    gender: string,
//    address: string;
//    place: string;
//    birthdate: Date;
//    email: string;
//    phone: string;
//    mobilephone: string;
//    photo: string;
    ngOnInit() {
        this.doctor =  new Doctor(0, '', '', '', '', '', '', 'M', '', '', new Date(), '', '', '', '');
        this.doctorForm = this._fb.group({
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
            education: this._fb.group({                
                title: [''],
                degreeyear: [''],
                degreeplace: ['']
            }),
            contact: this._fb.group({
                email: ['', ValidationService.emailValidator],
                street: ['', <any>Validators.required],
                place: [''],
                phone: [''],
                mobilephone: ['']
            })
        });

        this.subscription = this.notificationService.getFormActionChangeEmitter()
            .subscribe(doctor => this.onFormActionChange(doctor));
    }
    onFormActionChange(doctor: Doctor) {
        this.doctor = doctor;
        if (doctor.id == -1) {
            this.formTitle = "Add Doctor";
            this.submitAction = 'add';
        } else {
            this.formTitle = "Edit Doctor";
            this.submitAction = 'edit';
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    addDoctor(doctor) {
//        if(this.uploader.queue && this.uploader.queue.length > 0) {
//           doctor.photo = this.uploader.queue[0].file.name;
//        } else {
//           doctor.photo = "";
//        }      
        this.doctorStore.addDoctor(doctor)
        this.goBack();
    }

    updateDoctor(doctor) {
//        if(this.uploader.queue && this.uploader.queue.length > 0) {
//           doctor.photo = this.uploader.queue[0].file.name;
//        } else {
//           doctor.photo = "";
//        }
        
        this.doctorStore.updateDoctor(doctor)
            .subscribe(
            res => { },
            err => {
                console.log("Error");
            }
            );
        this.goBack();
    }

    goBack() {
            this.router.navigate(['/doctors']);
    }

    onSubmit() { 
      
//        if (this.submitAction == 'add') {
//            this.addDoctor(doctor);
//        } else {
//            this.updateDoctor(doctor);
//        }
        let doctor = this.dataToDoctor();
        console.log("On Submit", doctor)
        doctor.birthdate.setHours(12);
        this.addDoctor(doctor);
        this.submitted = true;
        this.goBack();
    }
    private dataToDoctor() : Doctor {
        let doctor = this.doctorForm;
         return new Doctor
         (0, doctor.value.personal.firstname, doctor.value.personal.lastname, doctor.value.personal.middlename, doctor.value.education.title, 
        doctor.value.education.degreeyear, doctor.value.education.degreeplace, doctor.value.personal.gender, doctor.value.contact.street, doctor.value.contact.place, new Date(), doctor.value.contact.email,
        doctor.value.contact.phone, doctor.value.contact.mobilephone, doctor.value.contact.photo); 
    }
    setDoctorFormPage(page: DoctorFormPage) {
        this.doctorStore.setDoctorFormPage(page);
    }


}