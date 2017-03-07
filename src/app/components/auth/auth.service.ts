import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {AUTH0_CLIENT_ID, AUTH0_DOMAIN} from '../../shared/constants/app.constants';
import { Router, RouterModule } from '@angular/router';
declare var Auth0Lock: any;


@Injectable()
export class AuthService {
    jsonObj: string;
    picture: string;
    lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN);
    jwtHelper: JwtHelper = new JwtHelper();
    profile: string;
    roles: Array<string>;
    name: string;

    constructor(private router: Router, public http: Http, public authHttp: AuthHttp) {
        // Capture the user credentials when the user has succesfully logged in
        this.lock.on('authenticated', (authResult: any) => {
            localStorage.setItem('id_token', authResult.idToken);

            this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
                if (error) {
                    console.log(error);
                }
                this.jsonObj = JSON.stringify(profile);
                this.roles = profile['roles'];
                console.log("roles", this.roles);
                localStorage.setItem('profile', this.jsonObj);
                this.setProfileObject();
                //        this.router.navigateByUrl('/home');
            });

            this.lock.hide();
        });
    }

    public login() {
        this.lock.show();
    }
    public setProfileObject() {
        if (this.jsonObj != null) {
            this.picture = this.jsonObj['picture'];
            this.name = this.jsonObj['name'];
        } else {
            this.picture = "assets/img/avatar.jpg"
            this.name = "";
        }
    }
    public logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        this.picture = "assets/img/avatar.jpg";
        this.name = "";
    }

    public loggedIn() {
        return tokenNotExpired();
    }

    public tokenSubscription() {
        this.authHttp.tokenStream.subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('Complete')
        );
    }
    useJwtHelper() {
        var token = localStorage.getItem('id_token');
        console.log(
            this.jwtHelper.decodeToken(token),
            this.jwtHelper.getTokenExpirationDate(token),
            this.jwtHelper.isTokenExpired(token)
        );
    }
    public isAdmin() {
        if (this.loggedIn() && this.roles != null && this.roles.indexOf("admin") > -1) {
            return true;
        } else {
            return false;
        }
    }

    public getPicture() {
        return this.picture;
    }
}


