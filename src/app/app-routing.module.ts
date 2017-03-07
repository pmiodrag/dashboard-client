import { NgModule }      from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DoctorComponent} from './components/doctor/doctor.component';


export const appRoutes: Routes = [
    {
       path: '',
       pathMatch: 'full',
       redirectTo: 'dashboard',
     },
    { path: 'patients', loadChildren: 'app/components/patient/patient.module#PatientModule'},
    { path: 'diagnoses',  loadChildren: 'app/components/diagnose/diagnose.module#DiagnoseModule' },
    { path: 'doctors', loadChildren: 'app/components/doctor/doctor.module#DoctorModule' },
    { path: 'dashboard', component: DashboardComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

//export const routedComponents = [DashboardComponent, PatientsComponent, TreatmentsComponent, DiagnoseComponent, DoctorsComponent, DocumentsComponent, AgendaComponent, AuthComponent, PageNotFoundComponent];



/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/