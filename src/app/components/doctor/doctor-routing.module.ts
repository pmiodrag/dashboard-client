import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { DoctorListComponent } from './doctor-list.component';
import { DoctorDetailComponent } from './doctor-detail.component';
import { DoctorDetailPersonalComponent } from './doctor-detail-personal.component';
import { DoctorDetailContactComponent } from './doctor-detail-contact.component';
import { DoctorDetailGalleryComponent } from './doctor-detail-gallery.component';
import { DoctorDetailEducationComponent } from './doctor-detail-education.component';
import { DoctorFormComponent } from './doctor-form.component';

const routes: Routes = [
  { path: '',
    component: DoctorComponent,
    children: [
      { path: '',    component: DoctorListComponent },
      { path: 'form', component: DoctorFormComponent },
      { 
        path: ':id', component: DoctorDetailComponent,
            children: [
                { path: 'personal', component: DoctorDetailPersonalComponent },
                { path: 'contact', component: DoctorDetailContactComponent },
                { path: 'gallery', component: DoctorDetailGalleryComponent },
                { path: 'education', component: DoctorDetailEducationComponent },
                { path: ':owner/treatments', loadChildren: 'app/components/treatment/treatment.module#TreatmentModule' }
            ]
      }      
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DoctorRoutingModule { }
