import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Treatment, TreatmentBackendService} from "../treatment/treatment.service";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {List} from 'immutable';
import {asObservable} from "../state/asObservable";
import {BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class TreatmentStore {
    
    private treatmentList: Treatment[];
    private _treatments: BehaviorSubject<List<Treatment>> = new BehaviorSubject(List([]));

    constructor(private treatmentBackendService: TreatmentBackendService) {
//        this.loadInitialData();
    }

    get treatments() {
        return asObservable(this._treatments);
    }

    loadPatientTreatments(patientId) {
        
          this.treatmentBackendService.getAllTreatments().
        subscribe(
            treatments => this.treatmentList = treatments,
            error => console.error('Error: '),
            () => { this._treatments.next(List( <Treatment[]>this.treatmentList['content'].filter(treatment => treatment.patientid == patientId)))}
        )
    }
//        this.treatmentBackendService.getAllTreatments()
//            .subscribe(
//            res => {
//                let treatments = (<Treatment[]>res.json()).map((treatment: any) =>
//                    new Treatment(
//                        treatment.id,
//                        treatment.patientid,
//                        treatment.doctorid,
//                        treatment.treatmentdate,
//                        treatment.therapy,
//                        treatment.diagnose,
//                        treatment.price
//                    )).filter(treatment => treatment.patientid == patientId)
//                this._treatments.next(List(treatments));
//            },
//            err => console.log("Error retrieving Treatments")
//            );

    
    
    loadDoctorTreatments(doctorId) {
         this.treatmentBackendService.getAllTreatments().
        subscribe(
            treatments => this.treatmentList = treatments,
            error => console.error('Error: '),
            () => { this._treatments.next(List( <Treatment[]>this.treatmentList['content'].filter(treatment => treatment.doctorid == doctorId))); console.log("treatments", this._treatments.getValue())}
        )

    }
    
//    filterData(data) {
//        this.treatmentBackendService.getAllTreatments()
//            .subscribe(
//            res => {
//               let treatments = (<Treatment[]>res.json()).map((treatment: any) =>
//                    new Treatment(
//                        treatment.id,
//                        treatment.patientid,
//                        treatment.doctorid,
//                        treatment.treatmentdate,
//                        treatment.therapy,
//                        treatment.diagnose,
//                        treatment.price
//                    ))                  
//                    .filter(item => {
//                        let props = ['treatmentdate', 'therapy', 'diagnose', 'price'];
//                        let match = false;
//                        for (let prop of props) {
//                            if (item[prop] != null && item[prop].toString().toUpperCase().indexOf(data) > -1) {
//                                match = true;
//                                break;
//                            }
//                        };
//                        return match;
//                    })
//                this._treatments.next(List(treatments));
//            },
//            err => console.log("Error retrieving Treatments")
//            );
//    }
    addTreatment(newTreatment: Treatment) {
        console.log("newTreatment",newTreatment);
        this.treatmentBackendService.saveTreatment(newTreatment)
            .subscribe(
                res => {
                    let newTreatment = (<Treatment>res.json()); 
                    this._treatments.next(this._treatments.getValue().push(newTreatment));
                },
                err => console.log("Error saving Treatment")
        );
    }

    updateTreatment(updatedTreatment: Treatment): Observable<Response> {

        let obs = this.treatmentBackendService.updateTreatment(updatedTreatment);

        obs.subscribe(
            res => {
                let treatments: List<Treatment> = this._treatments.getValue();
                let index = treatments.findIndex((treatment) => treatment.id === updatedTreatment.id);
                treatments[index] = updatedTreatment;
                this._treatments.next(treatments);
            });

        return obs;
    }

    deleteTreatment(deleted: Treatment): Observable<Response> {
        let obs = this.treatmentBackendService.deleteTreatment(deleted);

        obs.subscribe(
            res => {
                let treatments: List<Treatment> = this._treatments.getValue();
                let index = treatments.findIndex((treatment) => treatment.id === deleted.id);
                this._treatments.next(treatments.delete(index));

            }
        );

        return obs;
    }


}
