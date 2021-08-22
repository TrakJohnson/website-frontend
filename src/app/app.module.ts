import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import {NgxImageCompressService} from 'ngx-image-compress';

import {MatProgressBarModule} from '@angular/material/progress-bar';

import { AuthInterceptor } from './interceptors/auth-interceptor';

import { DefaultComponent } from './default/default.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserInfosComponent } from './user-infos/user-infos.component';
import { LoginComponent } from './login/login.component';
import { MarkdownModule } from 'ngx-markdown';
import { RegisterComponent } from './register/register.component';
import { FormComponent } from './register/form/form.component';
import { VerifyEmailComponent } from './register/verify-email/verify-email.component';
import { InfosRegisterComponent } from './register/infos-register/infos-register.component';
import { PopupComponent } from './popup/popup.component';
import { AccountComponent } from './account/account.component';
import { AccountViewComponent } from './account/account-view/account-view.component';
import { BilletterieComponent } from './billetterie/billetterie.component';
import { DisplayPlaceComponent } from './account/display-place/display-place.component'
import { CreateBilletterieComponent } from './billetterie/create/createbilletterie.component';
import { ModifyBilletterieComponent } from './billetterie/modify/modifybilletterie.component';
import { DeleteBilletterieComponent } from './billetterie/delete/deletebilletterie.component';
import { MasterclassComponent } from './masterclass/masterclass.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RecoverComponent } from './recover/recover.component';
import { DemandPasswordComponent } from './recover/demandPassword/demandPassword.component';
import { ChangePasswordComponent } from './recover/changePassword/changePassword.component';
import { EventsComponent } from './events/events.component';
import { DisplayEventComponent } from './events/display-event/display-event.component';
import { EventQuickviewComponent } from './event-quickview/event-quickview.component';
import { ViewBilletterieComponent } from './billetterie/view/viewBilletterie.component';


@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    HeaderComponent,
    FooterComponent,
    UserInfosComponent,
    LoginComponent,
    PopupComponent,
    RegisterComponent,
    FormComponent,
    VerifyEmailComponent,
    InfosRegisterComponent,
    AccountComponent,
    AccountViewComponent,
    BilletterieComponent,
    DisplayPlaceComponent,
    CreateBilletterieComponent,
    ModifyBilletterieComponent,
    MasterclassComponent,
    CalendarComponent,
    RecoverComponent,
    RecoverComponent,
    DemandPasswordComponent,
    ChangePasswordComponent,
    DeleteBilletterieComponent,
    EventsComponent,
    DisplayEventComponent,
    EventQuickviewComponent,
    ViewBilletterieComponent
  ],
    
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    IvyCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressBarModule,
    MarkdownModule.forChild(),
    MarkdownModule.forRoot({loader : HttpClientModule}),
  ],
  providers: [NgxImageCompressService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
