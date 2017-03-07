import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router, Params  }  from '@angular/router';
import {DOCTOR_OWNER} from '../../shared/constants/app.constants';
import { TreatmentStore } from './TreatmentStore';
@Component({ 
  selector: 'treatment',
  templateUrl: 'treatment.component.html'
})
export class TreatmentComponent {
    
    private userID: number;
    private owner: string;
    constructor(private router: Router, public authService: AuthService, private route: ActivatedRoute, private treatmentStore: TreatmentStore) {
    }   
    
    ngOnInit() {
           this.route.parent.parent.params.subscribe(params => {
            console.log("Params", params)
            this.userID = +params['id']; // (+) converts string 'id' to a number
            console.log("ngOnInit TreatmentComponent", this.userID);
            this.route.parent.params.subscribe(params => {
            this.owner = params['owner']; // (+) converts string 'id' to a number
            console.log("Owner", this.owner);
            if (this.owner == DOCTOR_OWNER){
                this.treatmentStore.loadDoctorTreatments(this.userID);      
           } else {
                this.treatmentStore.loadPatientTreatments(this.userID);
           }
            });
        });
        
     
    }
}