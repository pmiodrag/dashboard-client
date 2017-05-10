import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Treatment, TreatmentBackendService} from "./treatment.service";
import { NotificationService  } from '../../core/notification.service';
import { TreatmentStore } from './TreatmentStore';
import { Diagnose } from '../diagnose/diagnose.service';
import { DiagnoseStore } from '../diagnose/DiagnoseStore';
import { DoctorStore } from '../doctor/DoctorStore';
import { Doctor} from "../doctor/doctor.service";
import { ActivatedRoute }  from '@angular/router';
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

    public selected: string = '';
    public typeaheadLoading: boolean = false;
    public typeaheadNoResults: boolean = false;
    doctorCtrl: FormControl;
    diagnoseCtrl: FormControl;
    constructor(private _fb: FormBuilder, public treatmentStore: TreatmentStore, public diagnoseStore: DiagnoseStore,  public doctorStore: DoctorStore, private treatmentService: TreatmentBackendService, 
        private notificationService: NotificationService, private route: ActivatedRoute) { }   

    ngOnInit() {
         this.route.parent.parent.parent.params.subscribe(params => {
            console.log("Params", params)
            this.patientID = +params['id']; // (+) converts string 'id' to a number
            console.log("ngOnInit TreatmentFormComponent", this.patientID);
//            this.treatment = new Treatment(0, this.patientID, 1, new Date(), '', 1, '')
        });
         this.doctorCtrl = new FormControl();
         this.diagnoseCtrl = new FormControl();
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
    
    private dataToTreatment() : Treatment {
        let treatment = this.treatmentForm;
        console.log("doctorCtrl", this.doctorCtrl.value);
        return new Treatment(0, this.patientID, this.doctorCtrl.value.id, new Date(), treatment.value.therapy, this.diagnoseCtrl.value.id, treatment.value.price); 
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

   

    public displayDoctor(doctor: Doctor): any {
        return doctor ? "Dr." + doctor.lastname + doctor.firstname : doctor;
    }
    public displayDiagnose(diagnose: Diagnose): any {
        return diagnose ? diagnose.name : diagnose;
    }

}