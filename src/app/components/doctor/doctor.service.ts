import {Injectable, Inject} from '@angular/core';
import {Http, Headers, URLSearchParams, RequestOptions, Response} from '@angular/http';
import {List} from 'immutable';
import {Observable} from "rxjs/Observable";
export interface IDoctor {
    id: number;
    firstname: string;
    lastname: string;
    middlename: string;
    title: string;
    degreeyear: string;
    degreeplace: string;
    gender: string,
    address: string;
    place: string;
    birthdate: Date;
    email: string;
    phone: string;
    mobilephone: string;
    photo: string;
}

export class Doctor implements IDoctor {
    //    
    constructor(public id: number, public firstname: string, public lastname: string, public middlename: string, public title: string,    
        public degreeyear: string, public degreeplace: string, public gender: string, public address: string, public place: string, 
        public birthdate: Date, public email: string, public phone: string, public mobilephone: string, public photo: string) {
    }
}
@Injectable()
export class DoctorBackendService {

    http: Http;
    baseUrl: string;
    constructor(http: Http) {
        this.http = http;
        this.baseUrl = '/api/doctors/'
    }
    getAllDoctors(): Observable<any[]> { 
        // ...using get request
        return this.http.get('/api/doctors')
            //    ...and calling .json() on the response to return data
            .map((res: Response) => <any[]>res.json())
            //                          .map(res => <Bookmark[]> res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }
    getFilteredDoctors(data: string): Observable<any[]> { 
        // ...using get request
        return this.http.get('/api/doctors')
            //    ...and calling .json() on the response to return data
            .map((res: Response) => <any[]>res.json())
                            
            .filter(item => {
                let props = ['firstname', 'middlename', 'lastname', 'address', 'place'];
                let match = false;
                console.log("getFilteredDoctors", data);
                for (let prop of props) {
                     console.log("getFilteredDoctors item",  item);
                    if (item[prop] != null && item[prop].toString().toUpperCase().indexOf(data) > -1) {
                        match = true;
                        break;
                    }
                };
                console.log("getFilteredDoctors", data, match);
                return match;
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }     

    saveDoctor(newDoctor: Doctor): Observable<Response> {
        let body = JSON.stringify(newDoctor)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post((this.baseUrl), body, options)//.share();
    }

    updateDoctor(doctor: IDoctor): Observable<Response> {

        let body = JSON.stringify(doctor)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put((this.baseUrl  + doctor.id), body, options)
            .share()
    }

    deleteDoctor(deleteDoctor: Doctor) {
        return this.http.delete('/api/doctors/' + deleteDoctor.id);
    }


    handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}