import { Component} from '@angular/core';
import { ICON_CLASS_BG } from '../../shared/constants/app.constants';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent {
    diagnosesSize : number ;
    iconClassBg: string = ICON_CLASS_BG;
    tiles: any[] = [
    {text: 'Patients', cols: 2, rows: 1, color: '#fff', link: '/patients', icon:'people'},
    {text: 'Doctors', cols: 2, rows: 1, color: '#fff', link: '/doctors', icon:'face'},
    {text: 'Agenda', cols: 1, rows: 2, color: '#fff', link: '/agenda', icon:'view_agenda'},
    {text: 'Documents', cols: 2, rows: 1, color: '#fff', link: '/documents', icon:'library_books'},
    {text: 'Diagnoses', cols: 2, rows: 1, color: '#fff', link: '/diagnoses', icon:'note'},
  ];
    constructor(public authService: AuthService) {
       console.log("authService.isAdmin()", authService.isAdmin());
    }
}
