import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Patient, PatientBackendService} from "./patient.service";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {List} from 'immutable';
import {asObservable} from "../state/asObservable";
import {BehaviorSubject} from "rxjs/Rx";


export enum PatientFormPage { Personal, Gallery, Contact, HealthInfo, Treatments, Summary}

@Injectable()
export class PatientStore {
    private patientList: Patient[];
    private _patients: BehaviorSubject<List<Patient>> = new BehaviorSubject(List([]));
    private _selected : BehaviorSubject<Patient> = new BehaviorSubject<Patient>(null);
    private _patientFormPage: BehaviorSubject<any> = new BehaviorSubject(PatientFormPage.Personal);
    private _showCardView: BehaviorSubject<boolean> = new BehaviorSubject(true);
    private _startIndex: BehaviorSubject<number> = new BehaviorSubject(0);
    private _endIndex: BehaviorSubject<number> = new BehaviorSubject(3);
    private _patientsSize: BehaviorSubject<number> = new BehaviorSubject(0);
    // this method should be supported in RXJS 2
    //    public patients: Observable<List<Patient>> =  this._patients.asObservable();
    static counter = 0;
    id = 0
    constructor(private patientBackendService: PatientBackendService) {
        this.id= PatientStore.counter++;
         console.log("PatientStore constructor this.id", this.id);
//         console.log("PatientStore constructor this._patients.getValue()", this._patients.getValue());
          if(this._patients != null && this._patients.getValue().size != 0) {
//        console.log("PatientStore constructor");
         } else {
         console.log("PatientStore constructor loadInitialData");
             this.loadInitialData();
         }
        
    }
    
    get showCardView() {
        return  asObservable(this._showCardView);
    }
    get patientFormPage() {
        return  asObservable(this._patientFormPage);
    }
    setPatientFormPage(page: PatientFormPage){
        this._patientFormPage.next(page);
    }
    //Pagination properties getter and setter
    get startIndex() {
        return  asObservable(this._startIndex);
    }    
    get endIndex() {
        return  asObservable(this._endIndex);
    }    
    setIndexes(start: number, end: number) {
        this._startIndex.next(start);
        this._endIndex.next(end);
    }
    
    changeView(show: boolean){
        this._showCardView.next(show);
    }
   
    get patients() {
        return asObservable(this._patients);
    }
    
    get selected() {
        return asObservable(this._selected);
    }
    get patientsSize(){
        return asObservable(this._patientsSize);
    }
    
    set patients(patients: any) {
        this._patients.next(patients);
    }
    
    getPatient(id) {
        console.log("this._selected111",  this._selected.getValue());
        console.log("this._patients getPatient()  _selected value",  this._patients.getValue(), "id", id);
        if(this._patients != null && this._patients.getValue().size != 0) {
             this._selected.next(<Patient>this._patients.getValue().find(x => x.id == id));
            console.log("this._selected 2222",  this._selected.getValue());
        } else {
            this.getPatientById (id) ;
        }

    }
    getAllPatients() {
        return this.patientBackendService.getAllPatients()
    }
    getPatientById (id) {
         return this.patientBackendService.getAllPatients()
         .subscribe(
            people => this.patientList = people,
            error => console.error('Error: '),
            () => { this._selected.next(this.patientList['content'].find(p => p.id = id))
                console.log('Selected!', this._selected.getValue())}
        )
    }
    loadInitialData() {
        console.log("PatientStore loadInitialData",  this._patients.getValue());
       this.patientBackendService.getAllPatients()
        .subscribe(
            people => this.patientList = people,
            error => console.error('Error: '),
            () => { this._patients.next(List( <Patient[]>this.patientList['content']))
             console.log('Completed!',  this.patientList['content'])}
        )

    }
    filterData(data) {
        this.patientBackendService.getAllPatients()
        .subscribe(
            people => this.patientList = people,
            error => console.error('Error: '),
            () => { this._patients.next(List( <Patient[]>this.patientList['content'].filter(item => {
                let props = ['firstname', 'middlename', 'lastname', 'address', 'place'];
                let match = false;
                for (let prop of props) {
                     console.log("getFilteredPatients item",  item);
                    if (item[prop] != null && item[prop].toString().toUpperCase().indexOf(data) > -1) {
                        match = true;
                        break;
                    }
                };
                return match;
            })))}
        )
    }
    
    addPatient(newPatient: Patient) {
        this.patientBackendService.savePatient(newPatient).subscribe(
            res => {
                let newPatient = (<Patient>res.json()); 
                this._patients.next(this._patients.getValue().push(newPatient));
            },
            err => console.log("Error saving Patients")
        );
    }

    updatePatient(updatedPatient: Patient): Observable<Response> {

        let obs = this.patientBackendService.updatePatient(updatedPatient);

        obs.subscribe(
            res => {
                let patients: List<Patient> = this._patients.getValue();
                let index = patients.findIndex((patient) => patient.id === updatedPatient.id);
                patients[index] = updatedPatient;
                this._patients.next(patients);
            });

        return obs;
    }


    deletePatient(deleted: Patient) {
        let obs = this.patientBackendService.deletePatient(deleted);

        obs.subscribe(
            res => {
                let patients: List<Patient> = this._patients.getValue();
                let index = patients.findIndex((patient) => patient.id === deleted.id);
                this._patients.next(patients.delete(index));

            }
        );
    }


}
