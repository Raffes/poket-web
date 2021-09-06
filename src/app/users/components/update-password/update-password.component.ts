import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  
  public editUserPassword: FormGroup;

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private alertService: AlertModalService
  ) { 
    this.editUserPassword = this.formBuilder.group({
      oldPassword: [""],
      password: [""],
      confirmPassword: [""]

    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    const oldPwd = this.editUserPassword.get('oldPassword')
    const pwd = this.editUserPassword.get('password')
    const Cpwd = this.editUserPassword.get('conPassword')
    

      if(pwd?.value != Cpwd?.value){
        this.alertService.showAlertDanger("Senhas diferente");

      } else if(oldPwd != this.authService.userData.password) {
        this.alertService.showAlertDanger("A senha velha é diferente da sua atual");
      } else {
        this.authService.updatePassword(this.editUserPassword.value)
      }
  }


}
