import { Component } from '@angular/core';
import { AuthService } from './components/auth/auth.service';
@Component({ 
    selector: 'app-container',
    templateUrl: 'app.component.html' 
})
export class AppComponent {
  constructor(public authService: AuthService) {
  }

  ngOnInit() {   
    console.log('ngOnInit app');
  }
  
}
