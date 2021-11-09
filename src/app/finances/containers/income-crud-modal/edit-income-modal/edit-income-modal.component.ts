import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Wallet } from 'src/app/finances/modal/wallet';
import { IncomeService } from 'src/app/finances/services/income.service';
import { WalletService } from 'src/app/finances/services/wallet.service';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';

@Component({
  selector: 'app-edit-income-modal',
  templateUrl: './edit-income-modal.component.html',
  styleUrls: ['./edit-income-modal.component.css']
})
export class EditIncomeModalComponent implements OnInit {
  @Input() id: any;
  @Input() renda: any;
  @Input() valorRenda: any;
  @Input() dataRenda: any;
  @Input() tipoRenda: any;
  @Input() conta: any;
  @Input() observacao: any;


  public incomeUpdate: FormGroup;
  IncomeRef: any
  Wallet: any;

  constructor(
    public bsModalRef: BsModalRef,
    public walletService: WalletService,
    public incomeService: IncomeService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private alertService: AlertModalService
    ) { 
      this.incomeUpdate = this.formBuilder.group({
        renda: ["", Validators.maxLength(30)],
        valorRenda: ["", Validators.maxLength(8)],
        dataRenda: ["", Validators.maxLength(9999 - 12 - 31)],
        tipoRenda: [""],
        conta: [""],
        observacao: ["", Validators.maxLength(30)]
      })
  }

  ngOnInit(): void {
    this.listWallet()
    this.listIncomeUpdate()
        
  }

  listIncomeUpdate() {
    this.incomeService.getIncomeDoc(this.authService.userData.uid, this.id).subscribe(res => {
      this.IncomeRef = res

      this.incomeUpdate = this.formBuilder.group({
        renda: [this.renda],
        valorRenda: [this.valorRenda],
        dataRenda: [this.dataRenda],
        tipoRenda: [this.tipoRenda],
        conta: [this.conta],
        observacao: [this.observacao]
      })

    })
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

  editIncome(){

    const nomeRenda = this.incomeUpdate.get('renda')
    const valorRenda = this.incomeUpdate.get('valorRenda')
    const dataRenda = this.incomeUpdate.get('dataRenda')
    const tipoRenda = this.incomeUpdate.get('tipoRenda')
    const conta = this.incomeUpdate.get('conta')
    const observacao = this.incomeUpdate.get('observacao')


    if (nomeRenda?.value == null || valorRenda?.value == null || dataRenda?.value == null || tipoRenda?.value == null || conta?.value == null) {
      this.alertService.showAlertDanger("Falta campos para preencher");

    } else {

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
        
        if (contaWallet == conta?.value) {
          idWallet = value.id
          contaWallet = value.conta
          valorDaConta = value.valor
          // console.error(contaWallet)
        }
      });

      
      console.log("id antigo: " +idWalletAntigo+ "|| conta antiga: " + contaAntiga + " || valor da conta antiga: " + valorDaContaAntigo)
      console.log("id atual: " + idWallet + "|| conta atual: " + contaWallet + " || valor da conta atual: " + valorDaConta) 

      this.incomeService.updateIncome(this.incomeUpdate.value, this.authService.userData.uid, this.id, idWalletAntigo , idWallet, valorDaContaAntigo, valorDaConta)
      this.closeModal()
      console.warn("id antigo: " +idWalletAntigo+ "|| conta antiga: " + contaAntiga + " || valor da conta antiga: " + valorDaContaAntigo)
      console.warn("id atual: " + idWallet + "|| conta atual: " + contaWallet + " || valor da conta atual: " + valorDaConta) 
    }

    
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
