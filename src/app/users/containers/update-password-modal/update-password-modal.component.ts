import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { WalletService } from 'src/app/finances/services/wallet.service';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';

@Component({
  selector: 'app-update-password-modal',
  templateUrl: './update-password-modal.component.html',
  styleUrls: ['./update-password-modal.component.css']
})
export class UpdatePasswordModalComponent implements OnInit {

  public updatePassword: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    public walletService: WalletService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private alertService: AlertModalService
  ) { 
    this.updatePassword = this.formBuilder.group({
      password: [""],
      confirmPassword: [""]

    })
  }

  ngOnInit(): void {
  }

  editPassword() {
    const pwd = this.updatePassword.get('password')
    const cPwd = this.updatePassword.get('confirmPassword')
    

    if(pwd?.value != cPwd?.value) {
      this.alertService.showAlertDanger("Senhas diferentes");
      
    } else if(pwd?.value == "" || cPwd?.value == ""){
      this.alertService.showAlertDanger("Falta campos para preencher");

    }else {
      this.authService.updatePassword(this.updatePassword.value)
      this.bsModalRef.hide();
    }
  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
