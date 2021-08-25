import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import {NgxImageCompressService} from 'ngx-image-compress';


import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

import { AuthInterceptor } from './interceptors/auth-interceptor';


// components
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
import { EventQuickviewComponent } from './events/event-quickview/event-quickview.component';
import { ViewBilletterieComponent } from './billetterie/view/viewBilletterie.component';
import { TeamComponent } from './team/team.component';
import { ChangeInfosComponent } from './account/change-infos/change-infos.component';
import { ContactUsComponent } from './contact-us/contact-us.component';



import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DisplayPoleComponent } from './team/display-pole/displayPole.component';
import { ViewTeamComponent } from './team/view/viewTeam.component';
import { CreateEventComponent } from './events/create/createEvent.component';
import { ModifyEventComponent } from './events/modify/modifyEvent.component';
import { DeleteEventComponent } from './events/delete/deleteEvent.component';
registerLocaleData(localeFr, 'fr');

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
    ViewBilletterieComponent,
    TeamComponent,
    DisplayPoleComponent,
    ViewTeamComponent,
    ChangeInfosComponent,
    ContactUsComponent,
    CreateEventComponent,
    ModifyEventComponent,
    DeleteEventComponent,
  ],
    
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    IvyCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressBarModule,
    MarkdownModule.forChild(),
    MarkdownModule.forRoot({loader : HttpClientModule}),
    MatExpansionModule,
    MatCardModule
  
  ],
  providers: [NgxImageCompressService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
