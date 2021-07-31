import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultComponent } from './default/default.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {path : 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'test', component: SignupComponent, canActivate: [AuthGuard]},
  { path: 'default', component: DefaultComponent},
  { path: '', pathMatch: 'full', component: DefaultComponent },
  { path: '**', redirectTo: '' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule { }
