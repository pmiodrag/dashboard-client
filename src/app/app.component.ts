import { Component } from '@angular/core';
import { AuthService } from './components/auth/auth.service';
@Component({ 
    selector: 'app-container',
    templateUrl: 'app.component.html' 
})
export class AppComponent {
//  mobileView:number = 992;
//  toggle:boolean = false;
//  profile: string;
//  pacientDisplayModeEnabled: boolean;
//  id:string;
//  firstname:string;
//  lastname:string;
  constructor(public authService: AuthService) {
   // this.attachEvents();
  }

  ngOnInit() {   
//    this.pacientDisplayModeEnabled = true;  
    console.log('ngOnInit app');
  }

//  attachEvents() {
//    window.onresize = ()=> {
//      if (this.getWidth() >= this.mobileView) {
//        if (localStorage.getItem('toggle')) {
//          this.toggle = !localStorage.getItem('toggle') ? false : true;
//        } else {
//          this.toggle = true;
//        }
//      } else {
//        this.toggle = false;
//      }
//    }
//  }

//  getWidth() {
//    return window.innerWidth;
//  }
//
//  toggleSidebar() {
//    this.toggle = !this.toggle;
//    localStorage.setItem('toggle', this.toggle.toString());
//  }
  
}
