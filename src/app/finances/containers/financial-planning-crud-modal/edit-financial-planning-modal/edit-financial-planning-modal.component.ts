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
  @Input() nomePF: any;
  @Input() valorAtual: any;
  @Input() valorObjetivado: any;
  @Input() dataInicial: any;
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
      nomePF: ["", Validators.maxLength(30)],
      tipoPF: [""],
      conta: [""],
      valorAtual: ["", Validators.maxLength(8)],
      valorObjetivado: ["", Validators.maxLength(8)],
      dataInicial: [""],
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
        nomePF: [this.nomePF],
        tipoPF: [this.tipoPF],
        valorAtual: [this.valorAtual],
        valorObjetivado: [this.valorObjetivado],
        dataInicial: [this.dataInicial, Validators.maxLength(9999 - 12 - 31)],
        dataFinal: [this.dataFinal, Validators.maxLength(9999 - 12 - 31)]

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

    const nomePF = this.financialPlanningUpdate.get('nomePF')
    const tipoPF = this.financialPlanningUpdate.get('tipoPF')
    const conta = this.financialPlanningUpdate.get('conta')
    const valorAtualPF = this.financialPlanningUpdate.get('valorAtual')
    const valorObjetivadoPF = this.financialPlanningUpdate.get('valorObjetivado')
    const dataInicialPF = this.financialPlanningUpdate.get('dataInicial')
    const dataFinalPF = this.financialPlanningUpdate.get('dataFinal')
    const idPF = this.financialPlanningUpdate.get('id')
    const contaValor = this.financialPlanningUpdate.get('contaValor')

    let dataAtual = new Date();
    let fullYeah = dataAtual.getFullYear();
    let month = String(dataAtual.getMonth() + 1).padStart(2, '0');
    let datafinal = new Date(dataFinalPF?.value+"T00:00");
    let fullYeahEnd = datafinal.getFullYear();
    let monthEnd = datafinal.getMonth()+1;
 

    if (nomePF?.value == "" || valorObjetivadoPF?.value == "" || dataFinalPF?.value == "" || tipoPF?.value == null || dataInicialPF?.value == null) {
      this.alertService.showAlertDanger("Falta campos para preencher");

    } else if (fullYeahEnd < fullYeah || monthEnd < parseInt(month) && fullYeahEnd == fullYeah) {
      this.alertService.showAlertDanger("Data invalida");
      
    }  else {
      
      this.fpService.updateFinancialPlanning(this.financialPlanningUpdate.value, this.authService.userData.uid, this.id)
      this.closeModal()

    }

    
  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
