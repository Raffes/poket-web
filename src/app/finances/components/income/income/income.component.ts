import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { IncomeCrudModalService } from 'src/app/finances/services/income-crud-modal.service';
import { IncomeService } from 'src/app/finances/services/income.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  valor: any

  constructor(
    public incomeService: IncomeService,
    public ModalIncomeService: IncomeCrudModalService,
    public authService: AuthService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.totalIncome()
  }

  totalIncome() {
    this.incomeService.getIncomeList(this.authService.userData.uid).subscribe(res => {
      let income: any[] = []

      res.forEach((doc) => {
        const data = doc.payload.doc.data()

        income.push(data.valorRenda)

      })

      this.valor = income.reduce((a, b) => {
        return a + b
      })

      return this.valor

    })
  }


  modalCreateIncome() {
    this.ModalIncomeService.showCreateIncome()

  }


}
