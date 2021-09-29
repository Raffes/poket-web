import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Wallet } from 'src/app/finances/modal/wallet';
import { ExpenseService } from 'src/app/finances/services/expense.service';
import { WalletService } from 'src/app/finances/services/wallet.service';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';

@Component({
  selector: 'app-edit-expense-modal',
  templateUrl: './edit-expense-modal.component.html',
  styleUrls: ['./edit-expense-modal.component.css']
})
export class EditExpenseModalComponent implements OnInit {
  @Input() id: any;
  @Input() despesa: any;
  @Input() valorDespesa: any;
  @Input() dataDespesa: any;
  @Input() tipoDespesa: any;
  @Input() conta: any;
  @Input() observacao: any;


  public expenseUpdate: FormGroup;
  expenseRef: any
  Wallet: any;

  constructor(
    public bsModalRef: BsModalRef,
    public walletService: WalletService,
    public expenseService: ExpenseService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private alertService: AlertModalService
  ) { 
    this.expenseUpdate = this.formBuilder.group({
      despesa: ["", Validators.maxLength(30)],
      valorDespesa: ["", Validators.maxLength(8)],
      dataDespesa: [""],
      tipoDespesa: [""],
      conta: [""],
      observacao: ["", Validators.maxLength(30)]
    })
  }

  ngOnInit(): void {
    this.listWallet()
    this.listExpenseUpdate()
        
  }

  listExpenseUpdate() {
    this.expenseService.getExpenseDoc(this.authService.userData.uid, this.id).subscribe(res => {
      this.expenseRef = res

      this.expenseUpdate = this.formBuilder.group({
        despesa: [this.despesa],
        valorDespesa: [this.valorDespesa],
        dataDespesa: [this.dataDespesa],
        tipoDespesa: [this.tipoDespesa],
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

  editExpense(){

    const nomeDespesa = this.expenseUpdate.get('despesa')
    const valorDespesa = this.expenseUpdate.get('valorDespesa')
    const dataDespesa = this.expenseUpdate.get('dataDespesa')
    const tipoDespesa = this.expenseUpdate.get('tipoDespesa')
    const conta = this.expenseUpdate.get('conta')
    const observacao = this.expenseUpdate.get('observacao')


    if (nomeDespesa?.value == "" || valorDespesa?.value == "" || dataDespesa?.value == "" || tipoDespesa?.value == "" || conta?.value == "") {
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

      this.expenseService.updateExpense(this.expenseUpdate.value, this.authService.userData.uid, this.id, idWalletAntigo , idWallet, valorDaContaAntigo, valorDaConta)
      this.closeModal()
      console.warn("id antigo: " +idWalletAntigo+ "|| conta antiga: " + contaAntiga + " || valor da conta antiga: " + valorDaContaAntigo)
      console.warn("id atual: " + idWallet + "|| conta atual: " + contaWallet + " || valor da conta atual: " + valorDaConta) 
    }

    
  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
