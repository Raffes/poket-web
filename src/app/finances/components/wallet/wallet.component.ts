import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Wallet } from '../../modal/wallet';
import { ModalWalletCrudService } from '../../services/wallet-crud-modal.service';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  Wallet: any;
  valor: any
  filterWallet: string = '';

  constructor(
    public walletService: WalletService,
    public ModalWalletService: ModalWalletCrudService,
    public authService: AuthService,
    public formBuilder: FormBuilder
  ) {


  }

  ngOnInit(): void {

    this.listWallet()
    this.totalBalance()

  }

  listWallet() {
    this.walletService.getWalletList(this.authService.userData.uid).subscribe(res => {
      this.Wallet = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as unknown as Wallet;
      })
    })
  }


  totalBalance() {
    this.walletService.getWalletList(this.authService.userData.uid).subscribe(res => {
      let wallet: any[] = []

      res.forEach((doc) => {
        const data = doc.payload.doc.data()

        wallet.push(data.valor)

      })

      this.valor = wallet.reduce((a, b) => {
        return a + b
      })

      return this.valor

    })
  }

  modalCreateWallet() {
    this.ModalWalletService.showCreateWallet()
  }

  modalEditWallet(wallet: any) {
    this.ModalWalletService.showEditWallet(wallet)

  }

  modalDeleteWallet(wallet: any) {
    this.ModalWalletService.showDeleteWallet(wallet)
  }

}
