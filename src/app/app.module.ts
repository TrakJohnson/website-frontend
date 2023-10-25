import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import {IvyCarouselModule} from 'angular-responsive-carousel';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import {NgxImageCompressService} from 'ngx-image-compress';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthInterceptor } from './interceptors/auth-interceptor';


// components
import { DefaultComponent } from './default/default.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserInfosComponent } from './user-infos/user-infos.component';
import { LoginComponent } from './login/login.component';
import { MarkdownModule } from 'ngx-markdown';
import { RegisterComponent } from './register/register.component';
import { FormLegacyComponent } from './register/form-legacy/form-legacy.component';
import { VerifyEmailComponent } from './register/verify-email/verify-email.component';
import { InfosRegisterComponent } from './register/infos-register/infos-register.component';
import { PopupComponent } from './popup/popup.component';
import { AccountComponent } from './account/account.component';
import { AccountViewComponent } from './account/account-view/account-view.component';
import { BilletterieComponent } from './billetterie/billetterie.component';
import { CreateBilletterieComponent } from './billetterie/create/createbilletterie.component';
import { ModifyBilletterieComponent } from './billetterie/modify/modifybilletterie.component';
import { DeleteBilletterieComponent } from './billetterie/delete/deletebilletterie.component';
import { MasterclassComponent } from './masterclass/masterclass.component';
import { CalendarComponent } from './default/calendar/calendar.component';
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
import { ViewTeamComponent } from './team/view/viewTeam.component';
import { CreateEventComponent } from './events/create/createEvent.component';
import { ModifyEventComponent } from './events/modify/modifyEvent.component';
import { DeleteEventComponent } from './events/delete/deleteEvent.component';
import { BilletterieFilterComponent } from './billetterie/billetterie-filter/billetterie-filter.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { ImgFallbackDirective } from './img-fallback.directive';
import { MasterclassQuickviewComponent } from './masterclass/masterclass-quickview/masterclass-quickview.component';
import { FormSimplifiedComponent } from './register/form-simplified/form-simplified.component';
import { FormComponent } from './register/form/form.component';
import { ViewMobileComponent } from './billetterie/view-mobile/view-mobile.component';

import { PlaceComponent } from './place/place.component';
import { LibraryComponent } from './library/library.component';
import { BarcodeScannerLivestreamModule } from 'ngx-barcode-scanner';
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
    FormLegacyComponent,
    VerifyEmailComponent,
    InfosRegisterComponent,
    AccountComponent,
    AccountViewComponent,
    BilletterieComponent,
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
    ViewTeamComponent,
    ChangeInfosComponent,
    ContactUsComponent,
    CreateEventComponent,
    ModifyEventComponent,
    DeleteEventComponent,
    BilletterieFilterComponent,
    AdminManagementComponent,
    ImgFallbackDirective,
    MasterclassQuickviewComponent,
    FormSimplifiedComponent,
    FormComponent,
    ViewMobileComponent,
    PlaceComponent,
    LibraryComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    MatProgressSpinnerModule,
    //IvyCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressBarModule,
    MarkdownModule.forChild(),
    MarkdownModule.forRoot({loader : HttpClientModule}),
    MatExpansionModule,
    MatCardModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BarcodeScannerLivestreamModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [NgxImageCompressService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
