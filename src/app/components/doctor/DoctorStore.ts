import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Doctor, DoctorBackendService} from "../doctor/doctor.service";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {List} from 'immutable';
import {asObservable} from "../state/asObservable";
import {BehaviorSubject} from "rxjs/Rx";


export enum DoctorFormPage { Personal, Gallery, Contact, Education, Summary, Treatments}

@Injectable()
export class DoctorStore {
    private doctorList: Doctor[];
    private _doctors: BehaviorSubject<List<Doctor>> = new BehaviorSubject(List([]));
    private _selected : BehaviorSubject<Doctor> = new BehaviorSubject<Doctor>(null);
    private _doctorFormPage: BehaviorSubject<any> = new BehaviorSubject(DoctorFormPage.Personal);
    private _showCardView: BehaviorSubject<boolean> = new BehaviorSubject(true);
    private _startIndex: BehaviorSubject<number> = new BehaviorSubject(0);
    private _endIndex: BehaviorSubject<number> = new BehaviorSubject(3);
    private _doctorsSize: BehaviorSubject<number> = new BehaviorSubject(0);
    // this method should be supported in RXJS 2
    //    public doctors: Observable<List<Doctor>> =  this._doctors.asObservable();

    constructor(private doctorBackendService: DoctorBackendService) {        
        if(this.doctorList != null) {
            console.log("DoctorStore constructor");
         } else {
            console.log("DoctorStore constructor loadInitialData");
             this.loadInitialData();
         }        
    }
    
    get showCardView() {
        return  asObservable(this._showCardView);
    }
    get doctorFormPage() {
        return  asObservable(this._doctorFormPage);
    }
    setDoctorFormPage(page: DoctorFormPage){
        this._doctorFormPage.next(page);
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
   
    get doctors() {
        return asObservable(this._doctors);
    }
    
    get selected() {
        return asObservable(this._selected);
    }
    get doctorsSize(){
        return asObservable(this._doctorsSize);
    }
    
    set doctors(doctors: any) {
        this._doctors.next(doctors);
    }
    
    getDoctor(id) {
         this.doctorBackendService.getAllDoctors()
        .subscribe(
            people => this.doctorList = people,
            error => console.error('Error: '),
            () => { console.log('getDoctor by id!',  this.doctorList['content'].find(x => x.id == id)); 
            this._selected.next(<Doctor>this.doctorList['content'].find(x => x.id == id))}
        )
//       if(this.doctorList != null) {
//            return this._doctors.getValue().find(x => x.id == id);
//       } else {
//          console.log("this._doctors getDoctor()", this._doctors.getValue())
//       }
//      
    }
    getAllDoctors() {
        return this.doctorBackendService.getAllDoctors()
    }
    loadInitialData() {
        console.log("DoctorStore loadInitialData");
       this.doctorBackendService.getAllDoctors()
        .subscribe(
            people => this.doctorList = people,
            error => console.error('Error: '),
            () => { this._doctors.next(List( <Doctor[]>this.doctorList['content']))
             console.log('Completed!',  this.doctorList['content'])}
        )

    }
    filterData(data) {
        this.doctorBackendService.getAllDoctors()
        .subscribe(
            people => this.doctorList = people,
            error => console.error('Error: '),
            () => { this._doctors.next(List( <Doctor[]>this.doctorList['content'].filter(item => {
                let props = ['firstname', 'middlename', 'lastname', 'address', 'place'];
                let match = false;
                for (let prop of props) {
                     console.log("getFilteredDoctors item",  item);
                    if (item[prop] != null && item[prop].toString().toUpperCase().indexOf(data) > -1) {
                        match = true;
                        break;
                    }
                };
                return match;
            })))}
        )
    }
    addDoctor(newDoctor: Doctor) {
        console.log("addDoctor", newDoctor);
        this.doctorBackendService.saveDoctor(newDoctor).subscribe(
            res => {
                let newDoctor = (<Doctor>res.json()); 
                this._doctors.next(this._doctors.getValue().push(newDoctor));
            },
            err => console.log("Error saving Doctors")
        );
    }

    updateDoctor(updatedDoctor: Doctor): Observable<Response> {

        let obs = this.doctorBackendService.updateDoctor(updatedDoctor);

        obs.subscribe(
            res => {
                let doctors: List<Doctor> = this._doctors.getValue();
                let index = doctors.findIndex((doctor) => doctor.id === updatedDoctor.id);
                doctors[index] = updatedDoctor;
                this._doctors.next(doctors);
            });

        return obs;
    }


    deleteDoctor(deleted: Doctor) {
        let obs = this.doctorBackendService.deleteDoctor(deleted);

        obs.subscribe(
            res => {
                let doctors: List<Doctor> = this._doctors.getValue();
                let index = doctors.findIndex((doctor) => doctor.id === deleted.id);
                this._doctors.next(doctors.delete(index));

            }
        );
    }


}
