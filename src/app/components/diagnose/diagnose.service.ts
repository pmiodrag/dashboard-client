import {Injectable,Inject} from '@angular/core';
import  {Http,Headers, URLSearchParams, RequestOptions, Response} from '@angular/http';
import {List} from 'immutable';
import {Observable} from "rxjs/Observable";
export interface IDiagnose {
    id: number; 
    name: string;
    description: string;
}

export class Diagnose implements IDiagnose {
    constructor (public id: number, public name: string, 
        public description: string) {
    }
}

@Injectable()
export class DiagnoseBackendService {

    http:Http;
    baseUrl: string;
    constructor(http:Http)  {
        this.http = http;
        this.baseUrl = '/api/diagnoses/'
    }


   getAllDiagnoses(): Observable<any[]> { 
        // ...using get request
        return this.http.get(this.baseUrl)
            //    ...and calling .json() on the response to return data
            .map((res: Response) => <any[]>res.json())
            //                          .map(res => <Bookmark[]> res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }
    
    
    saveDiagnose(newDiagnose: Diagnose) : Observable<Response> {
        let body = JSON.stringify( newDiagnose )
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post((this.baseUrl), body, options);
    }
    
    updateDiagnose (diagnose: IDiagnose) : Observable<Response>  {
//
        let body = JSON.stringify( diagnose )
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put((this.baseUrl + diagnose.id), body, options)
                         .share()
    }   
//   

    deleteDiagnose(deleteDiagnose: Diagnose) : Observable<Response> {
        return this.http.delete(this.baseUrl + deleteDiagnose.id).share();
    }    
   
    handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    

}