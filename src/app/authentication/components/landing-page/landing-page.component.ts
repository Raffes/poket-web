import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  public userRegister: FormGroup;
  thisYeah = new Date().getUTCFullYear()

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private alertService: AlertModalService
    
  ) { 
    this.userRegister = this.formBuilder.group({
      displayName: ["", Validators.required, Validators.maxLength(30)],
      email: ["", Validators.required, Validators.maxLength(30)],
      password: ["", Validators.required, Validators.minLength(6), Validators.minLength(30)],
      conPassword: ["", Validators.required, Validators.minLength(6), Validators.minLength(30)]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const name = this.userRegister.get('displayName')
    const email = this.userRegister.get('email')
    const pwd = this.userRegister.get('password')
    const Cpwd = this.userRegister.get('conPassword')

      if(pwd?.value != Cpwd?.value) {
        this.alertService.showAlertDanger("Senhas diferentes");
        
      } else if(name?.value == "" || email?.value == ""){
        this.alertService.showAlertDanger("Falta campos para preencher");

      }else {
        this.authService.SignUp(this.userRegister.value)
      }
    
      
    
    
  }


}
