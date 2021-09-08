import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-create-wallet-modal',
  templateUrl: './create-wallet-modal.component.html',
  styleUrls: ['./create-wallet-modal.component.css']
})
export class CreateWalletModalComponent implements OnInit {

  public walletRegister: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    public walletService: WalletService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private alertService: AlertModalService
  ) { 
    this.walletRegister = this.formBuilder.group({
      conta: ["", Validators.maxLength(30)],
      valor: ["", Validators.maxLength(8)]
    })
  }

  ngOnInit(): void {
  }

  addWallet() {
    const nomeConta = this.walletRegister.get('conta')
    const valorConta = this.walletRegister.get('valor')

    if (nomeConta?.value == "" || valorConta?.value == "") {
      this.alertService.showAlertDanger("Falta campos para preencher");

    } else {
      this.walletService.createWallet(this.walletRegister.value, this.authService.userData.uid)
      this.closeModal()
    }
  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
