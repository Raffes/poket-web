import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { ExpenseService } from 'src/app/finances/services/expense.service';
import { FinancialPlanningService } from 'src/app/finances/services/financial-planning.service';
import { IncomeService } from 'src/app/finances/services/income.service';
import { WalletService } from 'src/app/finances/services/wallet.service';

@Component({
  selector: 'app-delete-wallet-modal',
  templateUrl: './delete-wallet-modal.component.html',
  styleUrls: ['./delete-wallet-modal.component.css']
})
export class DeleteWalletModalComponent implements OnInit {

  @Input() id: any;
  @Input() conta: any;
  @Input() valor: any;

  constructor(
    public incomeService: IncomeService,
    public expenseService: ExpenseService,
    public fpService: FinancialPlanningService,
    public bsModalRef: BsModalRef,
    public walletService: WalletService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  deleteWallet() {


    // Apaga as rendas associada a essa conta
    this.incomeService.getIncomeList(this.authService.userData.uid).subscribe(res => {

      let allIncome = res.map(el => {
        return {
          id: el.payload.doc.id,
          idConta: el.payload.doc.data().idConta
        }

      })

      let idAllIncome = allIncome.filter(el => el.idConta === this.id)

      idAllIncome.forEach((el, i) => {
        this.incomeService.deleteIncomeAfterWallet(this.authService.userData.uid, idAllIncome[i].id)
      })


    })

    // Apaga as despesas associada a essa conta
    this.expenseService.getExpenseList(this.authService.userData.uid).subscribe(res => {

      let allExpense = res.map(el => {
        return {
          id: el.payload.doc.id,
          idConta: el.payload.doc.data().idConta
        }

      })

      let idAllExpense = allExpense.filter(el => el.idConta == this.id)

      idAllExpense.forEach((el, i) => {

        this.expenseService.deleteExpenseAfterWallet(this.authService.userData.uid, idAllExpense[i].id)
      })



    })

    // Apaga as planejamentos financeiro associada a essa conta
    this.fpService.getFinancialPlanningList(this.authService.userData.uid).subscribe(res => {

      let allFp = res.map(el => {
        return {
          id: el.payload.doc.id,
          idConta: el.payload.doc.data().idConta
        }

      })

      // let idAllFp = allFp.filter(el => el.idConta == this.id)

      allFp.forEach((el, i) => {
        // Apaga as o histórico associado ao planejamento
        this.fpService.getHistoryFinancialPlanningList(this.authService.userData.uid, allFp[i].id).subscribe(res => {

          let allFpHistory = res.map(el => {
            return {
              id: el.payload.doc.id,
              idConta: el.payload.doc.data().idConta
            }

          })

          let idAllFpHistory = allFpHistory.filter(el => el.idConta == this.id)

          idAllFpHistory.forEach((el2, i2) => {
            this.fpService.deleteHistoryFpAfterWallet(this.authService.userData.uid, allFp[i].id, idAllFpHistory[i2].id)

              // this.fpService.deleteFinancialPlanning(this.authService.userData.uid, idAllFp[i].id)
            
          })


        })
      })

    })

    // Apaga conta financeira do sistema
    this.walletService.deleteWallet(this.authService.userData.uid, this.id)


    this.closeModal()

  }

}
