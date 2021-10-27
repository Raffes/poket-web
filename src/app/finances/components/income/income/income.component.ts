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


}
