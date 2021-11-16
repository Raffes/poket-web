import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { FinancialPlanningService } from 'src/app/finances/services/financial-planning.service';
import { WalletService } from 'src/app/finances/services/wallet.service';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';

@Component({
  selector: 'app-add-value-financial-planning-modal',
  templateUrl: './add-value-financial-planning-modal.component.html',
  styleUrls: ['./add-value-financial-planning-modal.component.css']
})
export class AddValueFinancialPlanningModalComponent implements OnInit {
  @Input() id: any;
  @Input() nomePF: any;
  @Input() valorAtual: any;
  @Input() valorObjetivado: any;
  @Input() dataFinal: any;
  @Input() tipoPF: any;
  @Input() idConta: any;
  @Input() conta: any;


  public AddMorefinancialPlanning: FormGroup;
  financialPlanningRef: any
  Wallet: any;
  
  constructor(
    public bsModalRef: BsModalRef,
    public walletService: WalletService,
    public fpService: FinancialPlanningService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private alertService: AlertModalService
  ) {
    this.AddMorefinancialPlanning = this.formBuilder.group({
      conta: [""],
      valorHistoricoPF: ["", Validators.maxLength(8)],
      dataHistorico: [""],
      idConta: [""],
      contaValor: [""]

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
        } as unknown;
      })
    })
  }

  addMoreFinancialPlanning() {
    const conta = this.AddMorefinancialPlanning.get('conta')
    const valorHistoricoPF = this.AddMorefinancialPlanning.get('valorHistoricoPF')
    const idConta = this.AddMorefinancialPlanning.get('idConta')
    const contaValor = this.AddMorefinancialPlanning.get('contaValor')
    const dataHistorico = this.AddMorefinancialPlanning.get('dataHistorico')

    let contaWallet

      this.Wallet.forEach(function (value: any) {
        contaWallet = value.id

        if (contaWallet == idConta?.value) {

          idConta?.setValue(value.id)
          conta?.setValue(value.conta)
          contaValor?.setValue(value.valor)

          let dataAtual = new Date();
          let fullYeah = dataAtual.getFullYear();
          let month = dataAtual.getMonth();
          let day = dataAtual.getDate();
          let fullDate = fullYeah +'-'+ (month+1) + '-' + day;
          dataHistorico?.setValue(fullDate) 

        }

      });

    if (valorHistoricoPF?.value == "" || idConta?.value == "") {
      this.alertService.showAlertDanger("Falta campos para preencher");

    }  else if (parseInt(valorHistoricoPF?.value) > parseInt(contaValor?.value)) {
      this.alertService.showAlertDanger("Saldo insuficiente!");

    } else {

      

      this.fpService.AddMoreFinancialPlanning(this.AddMorefinancialPlanning.value, this.authService.userData.uid, this.id, this.valorAtual)
      this.closeModal()

    }
  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
