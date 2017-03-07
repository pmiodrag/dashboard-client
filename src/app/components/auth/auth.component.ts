import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {ICON_CLASS, ICON_CLASS_BG} from '../../shared/constants/app.constants';
import { AuthService } from './auth.service';

@Component({
//    directives: [ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES, MdToolbar],
    selector: 'auth-component',
    templateUrl: 'auth.component.html'
})

export class AuthComponent {
    iconClass: string = ICON_CLASS; 
    iconClassBg: string = ICON_CLASS_BG; 

    constructor(public http: Http, public authService: AuthService) {        
       // authService.setProfileObject();
    }
}
