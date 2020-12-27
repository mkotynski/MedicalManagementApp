import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {CalendarComponent} from './components/patient/calendar/calendar.component';
import {MedicalVisitComponent} from './components/patient/medical-visit/medical-visit.component';
import {ReferencesComponent} from './components/patient/references/references.component';
import {EdmComponent} from './components/patient/edm/edm.component';
import {RegistrationForAnAppointmentComponent} from './components/patient/registration-for-an-appointment/registration-for-an-appointment.component';
import {ChooseDateForAnAppointmentComponent} from './components/patient/choose-date-for-an-appointment/choose-date-for-an-appointment.component';
import {SetAvailableDateForTheVisitComponent} from './components/doctor/set-available-date-for-the-visit/set-available-date-for-the-visit.component';
import {MakeAVisitComponent} from './components/doctor/make-a-visit/make-a-visit.component';
import {DoctorGuard} from './services/auth/doctor-guard.service';
import {VisitFormComponent} from './components/doctor/make-a-visit/visit-form/visit-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'medical-visit',
    component: MedicalVisitComponent
  },
  {
    path: 'appointments',
    component: MedicalVisitComponent
  },
  {
    path: 'register-for-an-appointment',
    component: RegistrationForAnAppointmentComponent
  },
  {
    path: 'register-for-an-appointment/:id/choose-date',
    component: ChooseDateForAnAppointmentComponent
  },
  {
    path: 'set-available-date-for-the-visit',
    component: SetAvailableDateForTheVisitComponent
  },
  {
    path: 'references',
    component: ReferencesComponent
  },
  {
    path: 'edm',
    component: EdmComponent
  },
  {
    path: 'make-a-visit',
    component: MakeAVisitComponent,
    canActivate: [DoctorGuard]
  },
  {
    path: 'make-a-visit/visit-form/:id',
    component: VisitFormComponent,
    canActivate: [DoctorGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
