import {Injectable, Inject} from '@angular/core';
import {Http, Headers, URLSearchParams, RequestOptions, Response} from '@angular/http';
import {List} from 'immutable';
import {Observable} from "rxjs/Observable";
export interface IPatient {
    id: number;
    firstname: string;
    lastname: string;
    middlename: string,
    gender: string,
    address: string;
    place: string;
    birthdate: Date;
    email: string;
    phone: string;
    mobilephone: string;
    photo: string;
    allergies: string;
    notes: string;
}

export class Patient implements IPatient {
    //    
    constructor(public id: number, public firstname: string, public lastname: string, public middlename: string,
        public gender: string, public address: string, public place: string, public birthdate: Date, public email: string,
        public phone: string, public mobilephone: string, public photo: string, public allergies: string, public notes: string) {
    }
}
@Injectable()
export class PatientBackendService {

    http: Http;
    baseUrl: string;
    constructor(http: Http) {
        this.http = http;
        this.baseUrl = '/api/patients/'
    }
    getAllPatients(): Observable<any[]> { 
        // ...using get request
        return this.http.get(this.baseUrl)
            //    ...and calling .json() on the response to return data
            .map((res: Response) => <any[]>res.json())
            //                          .map(res => <Bookmark[]> res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }
    getFilteredPatients(data: string): Observable<any[]> { 
        // ...using get request
        return this.http.get(this.baseUrl)
            //    ...and calling .json() on the response to return data
            .map((res: Response) => <any[]>res.json())
                            
            .filter(item => {
                let props = ['firstname', 'middlename', 'lastname', 'address', 'place'];
                let match = false;
                console.log("getFilteredPatients", data);
                for (let prop of props) {
                     console.log("getFilteredPatients item",  item);
                    if (item[prop] != null && item[prop].toString().toUpperCase().indexOf(data) > -1) {
                        match = true;
                        break;
                    }
                };
                console.log("getFilteredPatients", data, match);
                return match;
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }     

    savePatient(newPatient: Patient): Observable<Response> {
        let body = JSON.stringify(newPatient)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log("save patient body", body);
        return this.http.post(this.baseUrl, body, options)//.share();
    }

    updatePatient(patient: IPatient): Observable<Response> {

        let body = JSON.stringify(patient)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put((this.baseUrl  + patient.id), body, options)
            .share()
    }

    deletePatient(deletePatient: Patient) {
        return this.http.delete(this.baseUrl + deletePatient.id);
    }


    handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}