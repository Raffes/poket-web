import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { IncomeCrudModalService } from 'src/app/finances/services/income-crud-modal.service';
import { WalletService } from 'src/app/finances/services/wallet.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  Wallet: any;
  valor: any

  constructor(
    public walletService: WalletService,
    public ModalIncomeService: IncomeCrudModalService,
    public authService: AuthService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.totalBalance()
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


  modalCreateIncome() {
    this.ModalIncomeService.showCreateIncome()

  }


}
