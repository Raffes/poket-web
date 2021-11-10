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
  @Input() idConta: any;
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
      dataDespesa: ["", Validators.maxLength(9999 - 12 - 31)],
      tipoDespesa: [""],
      idConta: [""],
      conta: [""],
      observacao: ["", Validators.maxLength(50)]
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
        idConta: [this.idConta],
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
    const idConta = this.expenseUpdate.get('idConta')
    const conta = this.expenseUpdate.get('conta')
    const observacao = this.expenseUpdate.get('observacao')


    if (nomeDespesa?.value == "" || dataDespesa?.value == "" || tipoDespesa?.value == "") {
      this.alertService.showAlertDanger("Falta campos para preencher");

    } else {

      let idWallet
      let valorDaConta
      let contaWallet

      let idWalletAntigo
      let valorDaContaAntigo
      let contaWalletAntigo
      let contaAntiga = this.idConta

      this.Wallet.forEach(function (value: any) {
        contaWallet = value.id
        contaWalletAntigo = value.id

        if(contaWalletAntigo == contaAntiga) {
          idWalletAntigo = value.id
          valorDaContaAntigo = value.valor
        }
        
        if (contaWallet == idConta?.value) {
          idWallet = value.id
          valorDaConta = 0
          conta?.setValue(value.conta)

        }
      });

      this.expenseService.updateExpense(this.expenseUpdate.value, this.authService.userData.uid, this.id)
      // this.expenseService.updateExpense(this.expenseUpdate.value, this.authService.userData.uid, this.id, idWalletAntigo , idWallet, valorDaContaAntigo, valorDaConta)
      this.closeModal()

    }

    
  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
