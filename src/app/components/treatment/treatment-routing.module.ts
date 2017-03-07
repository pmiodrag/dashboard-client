import { NgModule }            from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';

import { TreatmentComponent }    from './treatment.component';
import { TreatmentListComponent }    from './treatment-list.component';
import { TreatmentFormComponent }    from './treatment-form.component';
//import { TreatmentDetailComponent }    from './treatment.component';


const routes: Routes = [
  { path: '',
    component: TreatmentComponent,
    children: [
      { path: '',    component: TreatmentListComponent },
      { path: 'form', component: TreatmentFormComponent },
//      { path: ':id', component: TreatmentDetailComponent }
    ]
  }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TreatmentRoutingModule {}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/