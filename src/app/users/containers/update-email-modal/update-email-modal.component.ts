import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { WalletService } from 'src/app/finances/services/wallet.service';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';

@Component({
  selector: 'app-update-email-modal',
  templateUrl: './update-email-modal.component.html',
  styleUrls: ['./update-email-modal.component.css']
})
export class UpdateEmailModalComponent implements OnInit {

  public emailUpdate: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    public walletService: WalletService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private alertService: AlertModalService
  ) { 
    this.emailUpdate = this.formBuilder.group({
      email: ["", Validators.maxLength(30)]
    })
  }

  ngOnInit(): void {
    this.emailUpdate = this.formBuilder.group({
      email: [this.authService.userData.email]
  })
  }

  editNickname(){
    const email = this.emailUpdate.get('email')

      if(email?.value == ""){
        this.alertService.showAlertDanger("Falta campos para preencher");

      }else {
        this.authService.updateUserEmail(this.emailUpdate.value)
        this.bsModalRef.hide();
      }
  }

  closeModal() {
    this.bsModalRef.hide();
  }


}
