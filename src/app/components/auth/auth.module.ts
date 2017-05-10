import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders} from '@angular/core';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { MaterialModule } from '@angular/material';
import { SharedModule } from '../../shared/shared.module';
import { Http, RequestOptions } from '@angular/http';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}


@NgModule({
    declarations: [
        AuthComponent
    ],
    exports: [
        AuthComponent
    ],
    providers: [AuthService,
       {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
    ],
    imports: [SharedModule.forRoot(), MaterialModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
       AuthService
      ]
    };
  }
}

