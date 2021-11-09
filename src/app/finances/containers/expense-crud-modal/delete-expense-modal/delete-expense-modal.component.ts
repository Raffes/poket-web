import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Wallet } from 'src/app/finances/modal/wallet';
import { ExpenseService } from 'src/app/finances/services/expense.service';
import { WalletService } from 'src/app/finances/services/wallet.service';

@Component({
  selector: 'app-delete-expense-modal',
  templateUrl: './delete-expense-modal.component.html',
  styleUrls: ['./delete-expense-modal.component.css']
})
export class DeleteExpenseModalComponent implements OnInit {

  @Input() id: any;
  @Input() despesa: any;
  @Input() idConta: any;
  @Input() conta: any;
  @Input() valorDespesa: any;

  Wallet: any;

  constructor(
    public bsModalRef: BsModalRef,
    public expenseService: ExpenseService,
    public authService: AuthService,
    public walletService: WalletService
  ) { }

  ngOnInit(): void {
    this.listWallet()
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  listWallet() {
    this.walletService.getWalletList(this.authService.userData.uid).subscribe(res => {
      this.Wallet = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as unknown as Wallet;
      })
    })
  }

  deleteExpense(){

      let idWallet
      let valorDaConta
      let contaWallet

      let idWalletAntigo
      let valorDaContaAntigo
      let contaWalletAntigo
      let contaAntiga = this.idConta

      this.Wallet.forEach(function (value: any) {
        contaWallet = value.idConta
        contaWalletAntigo = value.id

        if(contaWalletAntigo == contaAntiga) {
          idWalletAntigo = value.id
          valorDaContaAntigo = value.valor
        }
        
        if (contaWallet == value.id) {
          idWallet = value.id
          contaWallet = value.conta
          valorDaConta = value.valor
        }
      });

      this.expenseService.deleteExpense(this.authService.userData.uid, this.id, idWalletAntigo, valorDaContaAntigo, this.valorDespesa)
     
      this.closeModal()

  }

}
