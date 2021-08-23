import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultComponent } from './default/default.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormComponent } from './register/form/form.component';
import { InfosRegisterComponent } from './register/infos-register/infos-register.component';
import { VerifyEmailComponent } from './register/verify-email/verify-email.component';


import { AuthGuard } from './services/auth-guard.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AccountComponent } from './account/account.component';
import { AccountViewComponent } from './account/account-view/account-view.component';
import { BilletterieComponent } from './billetterie/billetterie.component';
import { CreateBilletterieComponent } from './billetterie/create/createbilletterie.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MasterclassComponent } from './masterclass/masterclass.component';
import { RecoverComponent } from './recover/recover.component';
import { DemandPasswordComponent } from './recover/demandPassword/demandPassword.component';
import { ChangePasswordComponent } from './recover/changePassword/changePassword.component';
import { ModifyBilletterieComponent } from './billetterie/modify/modifybilletterie.component';
import { DeleteBilletterieComponent } from './billetterie/delete/deletebilletterie.component';
import { ViewBilletterieComponent } from './billetterie/view/viewBilletterie.component';
import { EventsComponent } from './events/events.component';
import { DisplayEventComponent } from './events/display-event/display-event.component';
import { TeamComponent } from './team/team.component';
import { ViewTeamComponent } from './team/view/viewTeam.component';


const routes: Routes = [
  {path : 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent,
children : [
  {path : 'form', component: FormComponent},
  {path : 'infos', component: InfosRegisterComponent},
  {path : 'verify-email/:token', component: VerifyEmailComponent},
  {path: '**', redirectTo: 'form'},
]},
  { path : 'account', component : AccountComponent,
children : [
  {path : 'view', component : AccountViewComponent, canActivate: [AuthGuard]}
]},
  {path : "team", component  : TeamComponent,
children : [
  {path : "view", component : ViewTeamComponent}
]},
  {path : 'billetterie', component : BilletterieComponent,
children : [
  {path : 'view', component : ViewBilletterieComponent},
  {path : 'create', component : CreateBilletterieComponent, canActivate : [AuthGuardAdmin]},
  {path : 'modify/:event_id', component : ModifyBilletterieComponent, canActivate : [AuthGuardAdmin]},
  {path : 'delete', component : DeleteBilletterieComponent, canActivate : [AuthGuardAdmin]}
]},
{path : 'events', component : EventsComponent,
children : [
  {path : 'display/:event_id', component : DisplayEventComponent}
]},
  {path : 'calendar', component : CalendarComponent},
  {path : 'masterclass', component : MasterclassComponent},
  { path : 'recover', component: RecoverComponent,
  children: [
    {path : 'demand', component: DemandPasswordComponent},
    {path : 'change-password/:token', component: ChangePasswordComponent},
    {path: '**', redirectTo: 'demand'},
  ]
},
  { path: 'default', component: DefaultComponent},
  { path: '', pathMatch: 'full', component: DefaultComponent },
  { path: '**', redirectTo: '' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AuthGuardAdmin
  ]
})
export class AppRoutingModule { }
