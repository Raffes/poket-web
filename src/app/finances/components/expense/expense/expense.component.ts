import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { ExpenseCrudModalService } from 'src/app/finances/services/expense-crud-modal.service';
import { ExpenseService } from 'src/app/finances/services/expense.service';
import { ModalWalletCrudService } from 'src/app/finances/services/wallet-crud-modal.service';
import { WalletService } from 'src/app/finances/services/wallet.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
  styles: [
    `
      :host >>> .tooltip-inner {
        background-color: #f47e54;
        color: #fff;
      }
      :host >>> .tooltip.top .tooltip-arrow:before,
      :host >>> .tooltip.top .tooltip-arrow {
        border-top-color: #009688;
      }
    `
  ]
})
export class ExpenseComponent implements OnInit {

  valor: any

  Wallet: any;
  Expense: any


  constructor(
    public expenseService: ExpenseService,
    public modalExpenseService: ExpenseCrudModalService,
    public authService: AuthService,
    public walletService: WalletService,
    public ModalWalletService: ModalWalletCrudService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.totalExpense()
    this.listWallet()
    this.listExpense()
  }

  totalExpense() {
    this.expenseService.getExpenseList(this.authService.userData.uid).subscribe(res => {
      
      let allValues = res.map(e => {
        return {
          valor: e.payload.doc.data().valorDespesa,
        } 

      })
      
      this.valor = allValues.reduce((total, valor) => total + valor.valor, 0);

      return this.valor

    })
  }

  modalCreateExpense() {
    this.modalExpenseService.showCreateExpense()

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

  listExpense() {
    this.expenseService.getExpenseList(this.authService.userData.uid).subscribe(res => {
      this.Expense = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      })
    })
  }

  modalCreateWallet() {
    this.ModalWalletService.showCreateWallet()
  }

}
