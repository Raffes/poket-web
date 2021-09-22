import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { ModalWalletCrudService } from 'src/app/finances/services/wallet-crud-modal.service';
import { WalletService } from 'src/app/finances/services/wallet.service';

@Component({
  selector: 'app-income-graph',
  templateUrl: './income-graph.component.html',
  styleUrls: ['./income-graph.component.css']
})
export class IncomeGraphComponent implements OnInit {
  Wallet: any;
  valor: any

  constructor(
    public walletService: WalletService,
    public ModalWalletService: ModalWalletCrudService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router
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

  }

  incomeHistory() {
    // this.router.navigate(['income-history']);
  }


}
