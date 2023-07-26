import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-infos-register',
  templateUrl: './infos-register.component.html',
  styleUrls: ['./infos-register.component.scss']
})
export class InfosRegisterComponent implements OnInit {

  texteLuForm : UntypedFormGroup;
  texteLu : boolean = false;
  
  login : string;
  password : string;

  constructor(private router : Router,
              private formBuilder: UntypedFormBuilder,
              private route: ActivatedRoute,
              private popup: PopupService) { }

  ngOnInit(): void {
    this.popup.loading$.next(true);
    this.texteLuForm = this.formBuilder.group({
      texteLu: [null]
    });
    this.login = this.route.snapshot.params['login'];
    this.popup.loading$.next(false);
  }

  OnChangeTextLu() {
    this.texteLu = !this.texteLu;
  }

  onRedirectionLogin() {
    this.router.navigate(['/login']);
  }


}
