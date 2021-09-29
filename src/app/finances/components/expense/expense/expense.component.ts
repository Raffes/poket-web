import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { ExpenseCrudModalService } from 'src/app/finances/services/expense-crud-modal.service';
import { ExpenseService } from 'src/app/finances/services/expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  valor: any
  
  constructor(
    public expenseService: ExpenseService,
    public modalExpenseService: ExpenseCrudModalService,
    public authService: AuthService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.totalExpense()
  }

  totalExpense() {
    this.expenseService.getExpenseList(this.authService.userData.uid).subscribe(res => {
      let expense: any[] = []

      res.forEach((doc) => {
        const data = doc.payload.doc.data()

        expense.push(data.valorDespesa)

      })

      this.valor = expense.reduce((a, b) => {
        return a + b
      })

      return this.valor

    })
  }

  modalCreateExpense() {
    this.modalExpenseService.showCreateExpense()

  }

}
