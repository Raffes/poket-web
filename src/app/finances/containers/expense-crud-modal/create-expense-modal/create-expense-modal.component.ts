import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Wallet } from 'src/app/finances/modal/wallet';
import { ExpenseService } from 'src/app/finances/services/expense.service';
import { WalletService } from 'src/app/finances/services/wallet.service';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';

@Component({
  selector: 'app-create-expense-modal',
  templateUrl: './create-expense-modal.component.html',
  styleUrls: ['./create-expense-modal.component.css']
})
export class CreateExpenseModalComponent implements OnInit {

  public expenseRegister: FormGroup;
  Wallet: any;

  constructor(
    public bsModalRef: BsModalRef,
    public expenseService: ExpenseService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private alertService: AlertModalService,
    public walletService: WalletService,
  ) {
    this.expenseRegister = this.formBuilder.group({
      despesa: ["", Validators.maxLength(30)],
      valorDespesa: ["", Validators.maxLength(8)],
      dataDespesa: ["", Validators.maxLength(9999 - 12 - 31)],
      tipoDespesa: [""],
      idConta: [""],
      conta: [""],
      observacao: ["", Validators.maxLength(50)]
    })
  }

  ngOnInit(): void {
    this.listWallet()
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

  addExpense() {
    const nomeDespesa = this.expenseRegister.get('despesa')
    const valorDespesa = this.expenseRegister.get('valorDespesa')
    const dataDespesa = this.expenseRegister.get('dataDespesa')
    const tipoDespesa = this.expenseRegister.get('tipoDespesa')
    const idConta = this.expenseRegister.get('idConta')
    const conta = this.expenseRegister.get('conta')
    const observacao = this.expenseRegister.get('observacao')


    let idWallet
    let valorDaConta: any
    let contaWallet

    this.Wallet.forEach(function (value: any) {
      contaWallet = value.id
      if (contaWallet == idConta?.value) {
        idWallet = value.id
        valorDaConta = value.valor
        conta?.setValue(value.conta)
      }

    });

    if (nomeDespesa?.value == "" || valorDespesa?.value == "" || dataDespesa?.value == "" || tipoDespesa?.value == "" || idConta?.value == "") {
      this.alertService.showAlertDanger("Falta campos para preencher");

    } else if (parseInt(valorDespesa?.value) > parseInt(valorDaConta)) {
      this.alertService.showAlertDanger("Saldo insuficiente!");

    } else {


      // Criar despesa e Atualizar a conta que foi salva a renda
      this.expenseService.createExpense(this.expenseRegister.value, this.authService.userData.uid, idWallet, valorDespesa?.value, valorDaConta)


      this.closeModal()


    }
  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
