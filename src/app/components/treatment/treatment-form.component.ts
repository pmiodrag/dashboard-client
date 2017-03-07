import { Component, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Treatment, TreatmentBackendService} from "./treatment.service";
import { NotificationService  } from '../../core/notification.service';
import { ValidationService} from '../../shared/services/validation.service';
import { TreatmentStore } from './TreatmentStore';
import { Diagnose } from '../diagnose/diagnose.service';
import { DiagnoseStore } from '../diagnose/DiagnoseStore';
import { DoctorStore } from '../doctor/DoctorStore';
import { TypeaheadMatch } from 'ng2-bootstrap';
import { ActivatedRoute, Params  }  from '@angular/router';
//import {TimepickerComponent, DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
//import {Typeahead} from 'ng2-typeahead/ng2-typeahead'
//import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
@Component({
    selector: 'treatment-form',
    templateUrl: 'treatment-form.component.html'
})


export class TreatmentFormComponent {
    treatment: Treatment;
    submitAction: string;
    public treatmentForm: FormGroup; // our model driven form
    public submitted: boolean = false; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes
    private patientID: number;
    private diagnoseId : number;
    private doctorId : number;
    // Date and time propertiesTimepicker

    public selected: string = '';
    public typeaheadLoading: boolean = false;
    public typeaheadNoResults: boolean = false;
    
    constructor(private _fb: FormBuilder, private treatmentStore: TreatmentStore, private diagnoseStore: DiagnoseStore,  private doctorStore: DoctorStore, private treatmentService: TreatmentBackendService, 
        private notificationService: NotificationService, private route: ActivatedRoute) { }

   

    ngOnInit() {
         this.route.parent.parent.parent.params.subscribe(params => {
            console.log("Params", params)
            this.patientID = +params['id']; // (+) converts string 'id' to a number
            console.log("ngOnInit TreatmentFormComponent", this.patientID);
//            this.treatment = new Treatment(0, this.patientID, 1, new Date(), '', 1, '')
        });
        
//        this.subscription = this.notificationService.getFormActionChangeEmitter()
//            .subscribe(treatment => this.onFormActionChange(treatment));
        this.treatmentForm =this._fb.group({
            therapy: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(300)])],
            diagnose: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(300)
            ])],
            doctor: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(300)
            ])],
            price: ['', Validators.compose([
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(10)
            ])]
        });
        

    }
//    onFormActionChange(treatment: Treatment) {
//        console.log("onFormActionChange treatment", treatment);
//        this.treatment = treatment;
//        if (treatment.id == -1) {
//            this.formTitle = "Add Treatment";
//            this.submitAction = 'add';
//        } else {
//            this.selected = treatment.diagnose;
//            this.formTitle = "Edit Treatment";
//            this.submitAction = 'edit';
//        }
//    }
    ngOnDestroy() {
//        this.subscription.unsubscribe();
    }
    
    private dataToTreatment() : Treatment {
        let treatment = this.treatmentForm;
        return new Treatment(0, this.patientID, this.doctorId, new Date(), treatment.value.therapy, this.diagnoseId, treatment.value.price); 
    }
    
   
//    goBack() {
//        this.hidden = true;
//        this.treatmentlist.hidden = false;
//    }
    onSubmit() { 
        //        treatment.treatmentdate = this.date;
        //        treatment.treatmentdate.setHours(this.time.getHours());
        //        treatment.treatmentdate.setMinutes(this.time.getMinutes());
        //        console.log("Submit treatment datetime() ", treatment.treatmentdate);
        //        console.log("Submit treatment date() ", this.date );
        //        console.log("Submit treatment time() ", this.time, "this.time.getMinutes()", this.time.getMinutes() )   
        console.log("Submit treatment", this.dataToTreatment());
        this.addTreatment()
//        treatment.diagnose = this.selected;
//        if (this.submitAction == 'add') {
//            this.addTreatment(treatment);
//        } else {
//            this.updateTreatment(treatment);
//        }
//        this.submitted = true;
//        this.goBack();
    }
    // method to call Store action to create new treatment
    
    addTreatment() {
        this.treatmentStore.addTreatment(this.dataToTreatment());
//        this.goBack();
    }

    updateTreatment(treatment) {
        this.treatmentStore.updateTreatment(treatment)
            .subscribe(
            res => { },
            err => {
               // this.uiStateStore.endBackendAction();
            }
            );
//        this.goBack();
    }

    public changeTypeaheadLoading(e: boolean): void {
        this.typeaheadLoading = e;
    }

    public changeTypeaheadNoResults(e: boolean): void {
        this.typeaheadNoResults = e;
    }

//    public typeaheadOnSelect(e: any): void {
//        if (e != null) {
//            console.log(`Selected value: ${e.name}`);
//            this.selected = e.name;
//        }
//        
//    }
    
    public typeaheadOnDoctorSelect(e: TypeaheadMatch): void {
        console.log('Selected doctor value: ', e);
        if(e.item != null) {
           this.doctorId = +e.item.id; 
        }    
    }
     public typeaheadOnDiagnoseSelect(e: TypeaheadMatch): void {
        console.log('Selected value: ', e);
        if(e.item != null) {
           this.diagnoseId = +e.item.id; 
        }    
    }

}