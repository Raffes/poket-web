import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Expense } from 'src/app/finances/modal/expense';
import { ExpenseCrudModalService } from 'src/app/finances/services/expense-crud-modal.service';
import { ExpenseService } from 'src/app/finances/services/expense.service';
import { ModalWalletCrudService } from 'src/app/finances/services/wallet-crud-modal.service';
import { WalletService } from 'src/app/finances/services/wallet.service';

@Component({
  selector: 'app-expense-history',
  templateUrl: './expense-history.component.html',
  styleUrls: ['./expense-history.component.css']
})
export class ExpenseHistoryComponent implements OnInit {

  Expense: any;
  valor: any;
  filterExpense: string = '';

  totalLength: any;
  page: number = 1;

  constructor(
    public walletService: WalletService,
    public modalExpenseService: ExpenseCrudModalService,
    public expenseService: ExpenseService,
    public ModalWalletService: ModalWalletCrudService,
    public authService: AuthService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.listExpense()
    this.paginationLengthExpense()

  }

  paginationLengthExpense() {
    this.expenseService.getExpenseList(this.authService.userData.uid).subscribe(res => {
      this.totalLength = res.length
    })
  }

  listExpense() {
    this.expenseService.getExpenseList(this.authService.userData.uid).subscribe(res => {
      this.Expense = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as unknown as Expense;
      })
    })
  }

  modalEditExpense(expense: any) {
    this.modalExpenseService.showEditExpense(expense)

  }

  modalDeleteExpense(expense: any) {
    this.modalExpenseService.showDeleteExpense(expense)
  }



}
