import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { PopupService } from "src/app/services/popup.service";


@Component({ selector: 'app-changePassword',
templateUrl: './changePassword.component.html',
styleUrls: ['./changePassword.component.scss']
 })
export class ChangePasswordComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private auth : AuthService,
              private router : Router,
              private popup: PopupService,
              ) { }

  ngOnInit() {}

}
