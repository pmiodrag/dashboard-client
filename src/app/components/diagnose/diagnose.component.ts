import { Component } from '@angular/core';
import {ICON_CLASS} from '../../shared/constants/app.constants';
import { Diagnose, DiagnoseBackendService } from './diagnose.service';
import { DiagnoseStore } from './DiagnoseStore';
import { NotificationService  } from '../../core/notification.service';
import { AuthService } from '../auth/auth.service';
import * as Rx from "rxjs/Rx";
import {List} from 'immutable';

@Component({ 
  selector: 'diagnoses',
  templateUrl: 'diagnose.component.html',
  providers: [DiagnoseBackendService]
})
export class DiagnoseComponent {
    name: string;
    description: string;
    title: string = 'Diagnoses';
    diagnose: Diagnose;
    diagnoses : Diagnose[] = [];
    filteredDiagnoses: Diagnose[] = [];
    selection: string ;
    count: number;
    iconClass: string = ICON_CLASS;
    private _diagnoses: Rx.BehaviorSubject<List<Diagnose>> = new Rx.BehaviorSubject(List([]));
    constructor(public authService: AuthService, private notificationService: NotificationService, private diagnoseStore: DiagnoseStore) {}   
    
    ngOnInit() {
       console.log("DiagnoseComponent ngOnInit");
       this.diagnoseStore.loadInitialData();
    }
   
    addDiagnose() {     
        let newDiagnose = new Diagnose(0, this.name, this.description);  
        this.diagnoseStore.addDiagnose(newDiagnose)
        this.name = "";
    }
    deleteDiagnose(diagnose: Diagnose) {
        this.diagnoseStore.deleteDiagnose(diagnose);
    }
}