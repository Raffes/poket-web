import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { FinancialPlanningService } from 'src/app/finances/services/financial-planning.service';
import { WalletService } from 'src/app/finances/services/wallet.service';

@Component({
  selector: 'app-delete-financial-planning-modal',
  templateUrl: './delete-financial-planning-modal.component.html',
  styleUrls: ['./delete-financial-planning-modal.component.css']
})
export class DeleteFinancialPlanningModalComponent implements OnInit {

  @Input() id: any;
  @Input() planejamentoFinanceiro: any;
  @Input() valorAtual: any;
  @Input() valorObjetivado: any;
  @Input() dataFinal: any;
  @Input() tipoPF: any;
  @Input() idConta: any;
  @Input() conta: any;

  Wallet: any;

  constructor(
    public bsModalRef: BsModalRef,
    public fpService: FinancialPlanningService,
    public authService: AuthService,
    public walletService: WalletService
  ) { }

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

  deleteFinancialPlanning() {
  
  let idWallet: any
  let valorDaContaAntigo: any
  let contaWalletAntigo

  this.fpService.getHistoryFinancialPlanningList(this.authService.userData.uid, this.id).subscribe(res => {
    res.map(e => {

      this.Wallet.forEach(function (value: any) {
       
        contaWalletAntigo = value.id
    
        if(contaWalletAntigo == e.payload.doc.data().idConta) {
          idWallet = value.id
          valorDaContaAntigo = value.valor
        }
        
      });


      this.fpService.deleteHistoryFinancialPlanning(this.authService.userData.uid, this.id, idWallet, e.payload.doc.id, valorDaContaAntigo, e.payload.doc.data().valorAtual)

      this.fpService.deleteFinancialPlanning(this.authService.userData.uid, this.id)

    })

    this.closeModal()

  })
}

  closeModal() {
    this.bsModalRef.hide();
  }

}
