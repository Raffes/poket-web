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
      let contaAntiga = this.conta

      console.warn(contaAntiga)

      this.Wallet.forEach(function (value: any) {
        contaWallet = value.conta
        contaWalletAntigo = value.conta

        if(contaWalletAntigo == contaAntiga) {
          idWalletAntigo = value.id
          valorDaContaAntigo = value.valor
        }
        
        if (contaWallet == value.valorRenda) {
          idWallet = value.id
          contaWallet = value.conta
          valorDaConta = value.valor
          console.error(value.valorRenda)
        }
      });

      // console.log("id antigo: " +idWalletAntigo+ "|| conta antiga: " + contaAntiga + " || valor da conta antiga: " + valorDaContaAntigo + "valorRenda: " + this.valorRenda)


      this.expenseService.deleteExpense(this.authService.userData.uid, this.id, idWalletAntigo, valorDaContaAntigo, this.valorDespesa)
     
      // console.warn("id antigo: " +idWalletAntigo+ "|| conta antiga: " + contaAntiga + " || valor da conta antiga: " + valorDaContaAntigo + "valorRenda: " + this.valorRenda )

      this.closeModal()

  }

}
