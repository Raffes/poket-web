import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { AlertsSweetService } from 'src/app/shared/services/alerts-sweet.service';
import { Wallet } from '../../modal/wallet';
import { ModalWalletCrudService } from '../../services/wallet-crud-modal.service';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
  styles: [
    `
      :host >>> .tooltip-inner {
        background-color: #f8b238;
        color: #fff;
      }
      :host >>> .tooltip.top .tooltip-arrow:before,
      :host >>> .tooltip.top .tooltip-arrow {
        border-top-color: #009688;
      }
    `
  ]
})
export class WalletComponent implements OnInit {

  Wallet: any;
  valor: any
  filterWallet: string = '';

  totalLength: any;
  page: number = 1;

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
    this.paginationLengthWallet()

  }

  paginationLengthWallet() {
    this.walletService.getWalletList(this.authService.userData.uid).subscribe(res => {
        this.totalLength = res.length
        })
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
      
      let allValues = res.map(e => {
        return {
          valor: e.payload.doc.data().valor,
        } 

      })
      
      this.valor = allValues.reduce((total, valor) => total + valor.valor, 0);

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
