import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortByDirective } from './directives/sortby.directive';
import { ValuesPipe } from './pipes/values.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TrimPipe } from './pipes/trim.pipe';
import { CustomSlice } from './pipes/slice.pipe';
import { ListToDict } from './pipes/listtodict.pipe';
import { Sorter } from './sorter';
//import { MaterialModule } from '@angular/material';
//import { StoreModule } from '../components/state/store.module';

//import { FilterTextboxComponent } from './directives/filterTextbox.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ValuesPipe, CapitalizePipe, TrimPipe, CustomSlice, ListToDict, SortByDirective],
    exports: [ CommonModule, RouterModule, FormsModule, ReactiveFormsModule, ValuesPipe, CapitalizePipe, TrimPipe, CustomSlice, ListToDict, SortByDirective],
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}