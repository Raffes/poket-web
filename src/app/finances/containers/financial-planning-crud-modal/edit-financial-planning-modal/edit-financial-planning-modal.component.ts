import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Wallet } from 'src/app/finances/modal/wallet';
import { FinancialPlanningService } from 'src/app/finances/services/financial-planning.service';
import { WalletService } from 'src/app/finances/services/wallet.service';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';

@Component({
  selector: 'app-edit-financial-planning-modal',
  templateUrl: './edit-financial-planning-modal.component.html',
  styleUrls: ['./edit-financial-planning-modal.component.css']
})
export class EditFinancialPlanningModalComponent implements OnInit {
  @Input() id: any;
  @Input() planejamentoFinanceiro: any;
  @Input() valorAtual: any;
  @Input() valorObjetivado: any;
  @Input() dataFinal: any;
  @Input() tipoPF: any;
  @Input() idConta: any;
  @Input() conta: any;


  public financialPlanningUpdate: FormGroup;
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
    this.financialPlanningUpdate = this.formBuilder.group({
      id: [""],
      planejamentoFinanceiro: ["", Validators.maxLength(30)],
      tipoPF: [""],
      conta: [""],
      valorAtual: ["", Validators.maxLength(8)],
      valorObjetivado: ["", Validators.maxLength(8)],
      dataFinal: [""]

    })
  }

  ngOnInit(): void {
    this.listWallet()
    this.listFinancialPlanningUpdate()
        
  }

  listFinancialPlanningUpdate() {
    this.fpService.getFinancialPlanningDoc(this.authService.userData.uid, this.id).subscribe(res => {
      this.financialPlanningRef = res

      this.financialPlanningUpdate = this.formBuilder.group({
        planejamentoFinanceiro: [this.planejamentoFinanceiro],
        tipoPF: [this.tipoPF],
        valorAtual: [this.valorAtual],
        valorObjetivado: [this.valorObjetivado],
        dataFinal: [this.dataFinal]

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

  editFinancialPlanning(){

    const nomePF = this.financialPlanningUpdate.get('planejamentoFinanceiro')
    const tipoPF = this.financialPlanningUpdate.get('tipoPF')
    const conta = this.financialPlanningUpdate.get('conta')
    const valorAtualPF = this.financialPlanningUpdate.get('valorAtual')
    const valorObjetivadoPF = this.financialPlanningUpdate.get('valorObjetivado')
    const dataFinalPF = this.financialPlanningUpdate.get('dataFinal')
    const idPF = this.financialPlanningUpdate.get('id')
    const contaValor = this.financialPlanningUpdate.get('contaValor')


    if (nomePF?.value == "" || valorObjetivadoPF?.value == "" || dataFinalPF?.value == "" || tipoPF?.value == null) {
      this.alertService.showAlertDanger("Falta campos para preencher");

    } else {
      
      this.fpService.updateFinancialPlanning(this.financialPlanningUpdate.value, this.authService.userData.uid, this.id)
      this.closeModal()

    }

    
  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
