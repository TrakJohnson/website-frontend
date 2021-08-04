import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultComponent } from './default/default.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormComponent } from './register/form/form.component';
import { InfosRegisterComponent } from './register/infos-register/infos-register.component';
import { VerifyEmailComponent } from './register/verify-email/verify-email.component';


import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {path : 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent,
children : [
  {path : 'form', component: FormComponent},
  {path : 'infos', component: InfosRegisterComponent},
  {path : 'verify-email/:token', component: VerifyEmailComponent},
  {path: '**', redirectTo: 'form'},
]},
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
