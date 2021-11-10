import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Wallet } from 'src/app/finances/modal/wallet';
import { IncomeService } from 'src/app/finances/services/income.service';
import { WalletService } from 'src/app/finances/services/wallet.service';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';

@Component({
  selector: 'app-create-income-modal',
  templateUrl: './create-income-modal.component.html',
  styleUrls: ['./create-income-modal.component.css']
})
export class CreateIncomeModalComponent implements OnInit {

  public incomeRegister: FormGroup;
  Wallet: any;

  constructor(
    public bsModalRef: BsModalRef,
    public incomeService: IncomeService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private alertService: AlertModalService,
    public walletService: WalletService,
  ) {
    this.incomeRegister = this.formBuilder.group({
      renda: ["", Validators.maxLength(30)],
      valorRenda: ["", Validators.maxLength(8)],
      dataRenda: ["", Validators.maxLength(9999 - 12 - 31)],
      tipoRenda: [""],
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

  addIncome() {
    const nomeRenda = this.incomeRegister.get('renda')
    const valorRenda = this.incomeRegister.get('valorRenda')
    const dataRenda = this.incomeRegister.get('dataRenda')
    const tipoRenda = this.incomeRegister.get('tipoRenda')
    const idConta = this.incomeRegister.get('idConta')
    const conta = this.incomeRegister.get('conta')
    const observacao = this.incomeRegister.get('observacao')

    if (nomeRenda?.value == "" || valorRenda?.value == "" || dataRenda?.value == "" || tipoRenda?.value == "" || idConta?.value == "") {
      this.alertService.showAlertDanger("Falta campos para preencher");

    } else {
      let idWallet
      let valorDaConta
      let contaWallet

      this.Wallet.forEach(function (value: any) {
        contaWallet = value.id
        if (contaWallet == idConta?.value) {
          idWallet = value.id
          valorDaConta = value.valor
          conta?.setValue(value.conta)
        }

      });

      // Criar renda e Atualizar a conta que foi salva a renda
      this.incomeService.createIncome(this.incomeRegister.value, this.authService.userData.uid, idWallet, valorRenda?.value, valorDaConta)


      this.closeModal()


    }
  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
