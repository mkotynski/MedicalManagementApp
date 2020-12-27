import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { CalendarComponent } from './components/patient/calendar/calendar.component';
import {HomeComponent} from './components/home/home.component';
import {TestComponent} from './components/test/test.component';
import {RegistrationForAnAppointmentComponent} from './components/patient/registration-for-an-appointment/registration-for-an-appointment.component';
import {MedicalVisitComponent} from './components/patient/medical-visit/medical-visit.component';
import {ReferencesComponent} from './components/patient/references/references.component';
import {EdmComponent} from './components/patient/edm/edm.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {DemoUtilsModule} from './utils/module';
import {RouterModule} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MaterialModule} from './modules/material.module';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {CommonModule, DatePipe} from '@angular/common';
import {
  ChooseDateForAnAppointmentComponent, ConfirmDateDialogComponent,
  //DialogRegisterForTheVisitDialogComponent
} from './components/patient/choose-date-for-an-appointment/choose-date-for-an-appointment.component';
import {
  AddNewAvailableDateDialogComponent,
  SetAvailableDateForTheVisitComponent
} from './components/doctor/set-available-date-for-the-visit/set-available-date-for-the-visit.component';
import {OAuthModule} from 'angular-oauth2-oidc';
import { MakeAVisitComponent } from './components/doctor/make-a-visit/make-a-visit.component';
import {AuthGuard} from './services/auth/auth-guard.service';
import {AuthService} from './services/auth/auth.service';
import {TokenInterceptor} from './services/auth/token-interceptor';
import {FlexModule} from '@angular/flex-layout';
import {RolesService} from './services/auth/roles.service';
import {IfRolesDirective} from './directives/if-roles.directive';
import {
  AddNewPositionReceiptDialogComponent, AddNewReferenceDialogComponent,
  VisitFormComponent
} from './components/doctor/make-a-visit/visit-form/visit-form.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestComponent,
    CalendarComponent,
    RegistrationForAnAppointmentComponent,
    MedicalVisitComponent,
    ReferencesComponent,
    EdmComponent,
    ChooseDateForAnAppointmentComponent,
    ConfirmDateDialogComponent,
    SetAvailableDateForTheVisitComponent,
    AddNewAvailableDateDialogComponent,
    MakeAVisitComponent,
    AddNewPositionReceiptDialogComponent,
    AddNewReferenceDialogComponent,

    IfRolesDirective,

    VisitFormComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:8082/api'],
        sendAccessToken: true
      }
    }),
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    DemoUtilsModule,
    RouterModule,
    NgbModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(),
    FlexModule
  ],
  providers: [
    RolesService,
    DatePipe,
    AuthGuard,
    AuthService,
    {provide: APP_INITIALIZER, useFactory: kcFactory, deps: [AuthService], multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function kcFactory(keycloakService: AuthService) {
  return () => keycloakService.init();
}

