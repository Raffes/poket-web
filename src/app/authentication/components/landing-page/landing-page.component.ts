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

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private alertService: AlertModalService
    
  ) { 
    this.userRegister = this.formBuilder.group({
      displayName: [""],
      email: [""],
      password: [""],
      conPassword: [""]
    })
  }

  ngOnInit(): void {
  }

  // onSubmit() {
  //   this.authService.SignUp(this.userRegister.value)
  // }

  onSubmit() {
    const pwd = this.userRegister.get('password')
    const Cpwd = this.userRegister.get('conPassword')

      if(pwd?.value != Cpwd?.value) {
        this.handleError();
        
      }else {
        this.authService.SignUp(this.userRegister.value)
      }
    
      
    
    
  }

  // validar(): boolean {
  //   const pwd = this.userRegister.get('password')
  //     const Cpwd = this.userRegister.get('conPassword')

  //     if(pwd?.value != Cpwd?.value) {
  //       this.handleError();
  //       return true;
  //     }else {
  //       return false;
  //     }
    
  // }

  handleError() {
    this.alertService.showAlertDanger("Senhas diferentes");
  }

}
