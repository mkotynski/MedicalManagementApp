import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {MedicalVisitComponent} from './components/medical-visit/medical-visit.component';
import {ReferencesComponent} from './components/references/references.component';
import {EdmComponent} from './components/edm/edm.component';
import {RegistrationForAnAppointmentComponent} from './components/registration-for-an-appointment/registration-for-an-appointment.component';

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
    path: 'references',
    component: ReferencesComponent
  },
  {
    path: 'edm',
    component: EdmComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
