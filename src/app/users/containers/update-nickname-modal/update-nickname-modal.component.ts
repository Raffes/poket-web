import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { WalletService } from 'src/app/finances/services/wallet.service';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';

@Component({
  selector: 'app-update-nickname-modal',
  templateUrl: './update-nickname-modal.component.html',
  styleUrls: ['./update-nickname-modal.component.css']
})
export class UpdateNicknameModalComponent implements OnInit {

  public nicknameUpdate: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    public walletService: WalletService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private alertService: AlertModalService
  ) {
    this.nicknameUpdate = this.formBuilder.group({
      displayName: ["", Validators.maxLength(30)]
    })
   }

  ngOnInit(): void {
    this.nicknameUpdate = this.formBuilder.group({
      displayName: [this.authService.userData.displayName],
  })
  }

  editNickname() {
    const nickname = this.nicknameUpdate.get('displayName')

    if(nickname?.value == ""){
      this.alertService.showAlertDanger("Falta campos para preencher");

    }else {
      this.authService.updateUserNickname(this.nicknameUpdate.value)
      this.bsModalRef.hide();
    }
}

closeModal() {
  this.bsModalRef.hide();
}

}
