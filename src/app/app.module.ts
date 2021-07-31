import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthInterceptor } from './interceptors/auth-interceptor';

import { DefaultComponent } from './default/default.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserInfosComponent } from './user-infos/user-infos.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PopupComponent } from './popup/popup.component';


@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    HeaderComponent,
    FooterComponent,
    UserInfosComponent,
    LoginComponent,
    SignupComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    IvyCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
