import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { IncomeCrudModalService } from 'src/app/finances/services/income-crud-modal.service';
import { IncomeService } from 'src/app/finances/services/income.service';
import { ModalWalletCrudService } from 'src/app/finances/services/wallet-crud-modal.service';
import { WalletService } from 'src/app/finances/services/wallet.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
  styles: [
    `
      :host >>> .tooltip-inner {
        background-color: #198754;
        color: #fff;
      }
      :host >>> .tooltip.top .tooltip-arrow:before,
      :host >>> .tooltip.top .tooltip-arrow {
        border-top-color: #009688;
      }
    `
  ]
})
export class IncomeComponent implements OnInit {
  
  valor: any

  Income: any

  Wallet: any;

  constructor(
    public incomeService: IncomeService,
    public ModalIncomeService: IncomeCrudModalService,
    public authService: AuthService,
    public walletService: WalletService,
    public ModalWalletService: ModalWalletCrudService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.totalIncome()
    this.listWallet()
    this.listIncome()
  }

  listIncome() {
    this.incomeService.getIncomeList(this.authService.userData.uid).subscribe(res => {
      this.Income = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      })
    })
  }

  totalIncome() {
    this.incomeService.getIncomeList(this.authService.userData.uid).subscribe(res => {
     
      let allValues = res.map(e => {
        return {
          valor: e.payload.doc.data().valorRenda,
        } 

      })
      
      this.valor = allValues.reduce((total, valor) => total + valor.valor, 0);

      return this.valor

    })

    
  }

  modalCreateIncome() {
    this.ModalIncomeService.showCreateIncome()

  }

  listWallet() {
    this.walletService.getWalletList(this.authService.userData.uid).subscribe(res => {
      this.Wallet = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as unknown;
      })

    })
  }

  modalCreateWallet() {
    this.ModalWalletService.showCreateWallet()
  }


}
