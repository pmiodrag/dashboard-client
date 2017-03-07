import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './components/auth/auth.module';
import { StoreModule } from './components/state/store.module';
@NgModule({
  imports: [
    BrowserModule,
    
    CoreModule.forRoot(),
    StoreModule.forRoot(),
    MaterialModule.forRoot(),
    SharedModule.forRoot(),
    AuthModule.forRoot(),
    AppRoutingModule,
    /* Eagerly loaded module, others are loaded lazy */
    DashboardModule
  
  ],
  declarations: [
    AppComponent 
  ],
 
  schemas:   [ CUSTOM_ELEMENTS_SCHEMA ],
 bootstrap: [AppComponent]
})
export class AppModule {
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/