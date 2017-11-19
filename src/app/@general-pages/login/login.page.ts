import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//-- Local imports
import { LoginModel } from '../../@model';
import { AuthenticationService } from '../../@services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  encapsulation: ViewEncapsulation.None
})
export class LoginPage implements OnInit {
  public loginForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private authentication:AuthenticationService) { }

  ngOnInit() { 
    this.createForm(); 
    this.authentication.isLoggedIn()
    .then((auth) => {
      if (auth) this.authentication.redirect();
    })
    .catch((reason) => { /*DO NOTHING*/ });
  }

  //-- OnSubmit funcionallity
  onSubmit(loginData:LoginModel) {
    this.authentication.login(loginData.username, loginData.password);
  }

  //-- Actions
  createForm(){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }
}
