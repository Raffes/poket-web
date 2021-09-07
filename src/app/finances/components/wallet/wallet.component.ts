import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { Wallet } from '../../modal/wallet';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  walletRef: any
  Wallet: any;
  public walletRegister: FormGroup;

  constructor(
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

    this.walletService.getWalletList(this.authService.userData.uid).subscribe(res => {
      this.Wallet = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as unknown as Wallet;
      })
    })

  }

  addWallet() {
    const nomeConta = this.walletRegister.get('conta')
    const valorConta = this.walletRegister.get('valor')

    if (nomeConta?.value == "" || valorConta?.value == "") {
      this.alertService.showAlertDanger("Falta campos para preencher");

    } else {
      this.walletService.createWallet(this.walletRegister.value, this.authService.userData.uid)
    }
  }

  modalEditWallet(wallet: any) {
    this.walletService.showEditWallet(wallet)

  }

}
