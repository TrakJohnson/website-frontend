import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact-service';

import { PopupService } from 'src/app/services/popup.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactForm: UntypedFormGroup;

  public subjects = [
    {value: 'feedback', viewValue: 'Faire un retour'},
    {value: 'bug-report', viewValue: 'Reporter un bug'},
    {value: 'commercial', viewValue: 'Faire une demande commerciale'},
    {value: 'request', viewValue: 'Faire une suggestion'},
    {value: 'other', viewValue: 'Autre'},
    ]

    
  constructor(private fb: UntypedFormBuilder,
    private contactService : ContactService,
    private popup : PopupService) {}

  

  ngOnInit() {
    this.contactForm = this.fb.group({
      'name': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'subject': ['', Validators.required],
      'message': ['', Validators.required]
      });
    }
  
  




  onSubmit() {
    var name = this.contactForm.get("name")?.value
    var email = this.contactForm.get("email")?.value
    var subject = this.contactForm.get("subject")?.value
    var message = this.contactForm.get("message")?.value


    this.contactService.sendMail(name, email, subject, message)
    .then(() => {
      this.popup.state$.next([true, "Message bien envoyé"])
      this.contactForm.reset();
    }, (error : any) => {
      this.popup.state$.next([false, error.message])
    });
  }


  
}
