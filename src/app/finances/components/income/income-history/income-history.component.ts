import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Income } from 'src/app/finances/modal/income';
import { IncomeCrudModalService } from 'src/app/finances/services/income-crud-modal.service';
import { IncomeService } from 'src/app/finances/services/income.service';
import { ModalWalletCrudService } from 'src/app/finances/services/wallet-crud-modal.service';
import { WalletService } from 'src/app/finances/services/wallet.service';

@Component({
  selector: 'app-income-history',
  templateUrl: './income-history.component.html',
  styleUrls: ['./income-history.component.css']
})
export class IncomeHistoryComponent implements OnInit {
  Income: any;
  valor: any;
  filterIncome: string = '';

  constructor(
    public walletService: WalletService,
    public ModalIncomeService: IncomeCrudModalService,
    public incomeService: IncomeService,
    public ModalWalletService: ModalWalletCrudService,
    public authService: AuthService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.listIncome()
    this.totalBalance()
  }

  listIncome() {
    this.incomeService.getIncomeList(this.authService.userData.uid).subscribe(res => {
      this.Income = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as unknown as Income;
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


  modalEditIncome(income: any) {
    this.ModalIncomeService.showEditIncome(income)

  }

  modalDeleteIncome(income: any) {
    this.ModalIncomeService.showDeleteIncome(income)
  }

  modalDetailIncome(income: any) {

  }


}
