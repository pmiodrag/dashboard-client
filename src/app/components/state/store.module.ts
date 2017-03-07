import { NgModule, ModuleWithProviders } from '@angular/core';
//import { PatientStore } from './PatientStore';
//import { DoctorStore } from './DoctorStore';
//import { GalleryStore } from './components/state/GalleryStore';
//import { TreatmentStore } from './TreatmentStore';
//import { DiagnoseStore } from './DiagnoseStore';
//import { AgendaStore } from './components/state/AgendaStore';
//import { UiStateStore } from './components/state/UiStateStore';
@NgModule({
    providers: [
//        PatientStore,
//        DoctorStore,
//        TreatmentStore,
//        DiagnoseStore,
//        GalleryStore,
//        AgendaStore
    ],
})
export class StoreModule {
    static forRoot(): ModuleWithProviders {
    return {
      ngModule: StoreModule
    };
  }
}
