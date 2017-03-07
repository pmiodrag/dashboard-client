import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Diagnose, DiagnoseBackendService} from "../diagnose/diagnose.service";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {List} from 'immutable';
import {asObservable} from "../state/asObservable";
import {BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class DiagnoseStore {

    private diagnoseList: Diagnose[];
    private _diagnoses: BehaviorSubject<List<Diagnose>> = new BehaviorSubject(List([]));
    private _selected : BehaviorSubject<Diagnose> = new BehaviorSubject<Diagnose>(null);
    private _showCardView: BehaviorSubject<boolean> = new BehaviorSubject(true);
    private _startIndex: BehaviorSubject<number> = new BehaviorSubject(0);
    private _endIndex: BehaviorSubject<number> = new BehaviorSubject(3);
    private _diagnosesSize: BehaviorSubject<number> = new BehaviorSubject(0);

    constructor(private diagnoseBackendService: DiagnoseBackendService) {
        this.loadInitialData();
    }

    get diagnoses() {
        return asObservable(this._diagnoses);
    }
    
    get diagnosesSubject() {
       return this.diagnoseBackendService.getAllDiagnoses()
    }
//    getAllDiagnoses() {
//        return this.diagnoseBackendService.getAllDiagnoses()
//    }
    loadInitialData() {
        console.log("DiagnoseStore loadInitialData");
        this.diagnoseBackendService.getAllDiagnoses()
            .subscribe(
                people => this.diagnoseList = people,
                error => console.error('Error: '),
                () => { this._diagnoses.next(List( <Diagnose[]>this.diagnoseList['content']))
                 console.log('Completed!',  this.diagnoseList['content'])}
            )
    }
    
    filterData(data) {
        this.diagnoseBackendService.getAllDiagnoses()
        .subscribe(
            diagnose => this.diagnoseList = diagnose,
            error => console.error('Error: '),
            () => { this._diagnoses.next(List( <Diagnose[]>this.diagnoseList['content'].filter(item => {
                let props = ['name', 'description'];
                let match = false;
                for (let prop of props) {
                    if (item[prop] != null && item[prop].toString().toUpperCase().indexOf(data) > -1) {
                        match = true;
                        break;
                    }
                };
                return match;
            })))}
        )
    }  
    
    addDiagnose(newDiagnose: Diagnose) {
        this.diagnoseBackendService.saveDiagnose(newDiagnose).subscribe(
            res => {
                  let newDiagnose = (<Diagnose>res.json()); 
                this._diagnoses.next(this._diagnoses.getValue().push(newDiagnose));
             },
            err => console.log("Error saving Patients")
        );
    }

    updateDiagnose(updatedDiagnose: Diagnose): Observable<Response> {

        let obs = this.diagnoseBackendService.updateDiagnose(updatedDiagnose);

        obs.subscribe(
            res => {
                let diagnoses: List<Diagnose> = this._diagnoses.getValue();
                let index = diagnoses.findIndex((diagnose) => diagnose.id === updatedDiagnose.id);
                diagnoses[index] = updatedDiagnose;
                this._diagnoses.next(diagnoses);
            });

        return obs;
    }


    deleteDiagnose(deleted: Diagnose): Observable<Response> {
        let obs = this.diagnoseBackendService.deleteDiagnose(deleted);

        obs.subscribe(
            res => {
                let diagnoses: List<Diagnose> = this._diagnoses.getValue();
                let index = diagnoses.findIndex((diagnose) => diagnose.id === deleted.id);
                this._diagnoses.next(diagnoses.delete(index));
            }
        );

        return obs;
    }


}
