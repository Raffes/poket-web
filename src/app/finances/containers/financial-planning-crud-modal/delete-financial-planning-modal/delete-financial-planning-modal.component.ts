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

  @Input() idFp: any;
  @Input() id: any;
  @Input() nomePF: any;
  @Input() valorAtual: any;
  @Input() valorObjetivado: any;
  @Input() dataFinal: any;
  @Input() tipoPF: any;
  @Input() idConta: any;
  @Input() conta: any;

  Wallet: any;
  FinancialPlanning: any;

  constructor(
    public bsModalRef: BsModalRef,
    public fpService: FinancialPlanningService,
    public authService: AuthService,
    public walletService: WalletService
  ) { }

  ngOnInit(): void {
    this.listWallet()
    this.listFinancialPlanning()
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

  listFinancialPlanning() {
    this.fpService.getFinancialPlanningList(this.authService.userData.uid).subscribe(res => {

      this.FinancialPlanning = res.map(e => {

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
    let contaWallet
    let idPF = this.id
    let valorAtualPF: any

    this.fpService.getHistoryFinancialPlanningList(this.authService.userData.uid, this.id).subscribe(res => {
      let values = res.map(e => {
        return {
          idFpHistory: e.payload.doc.id,
          idConta: e.payload.doc.data().idConta,
          valorHistoricoPF: e.payload.doc.data().valorHistoricoPF,
          ...e.payload.doc.data()
        }
      })



      values.forEach((el, i) => {

        this.Wallet.forEach(function (value: any) {

          contaWallet = value.id

          if (contaWallet == values[i].idConta) {
            idWallet = value.id
            valorDaContaAntigo = value.valor
          }

        });

        this.FinancialPlanning.forEach(function (el: any) {
          if (idPF == el.id) {
            valorAtualPF = el.valorAtual
          }
        })

        this.fpService.updateWalletBeforedeletePlan(this.authService.userData.uid, values[i].idConta, valorDaContaAntigo, values[i].valorHistoricoPF)
        this.fpService.deleteHistoryFpBeforePlan(this.authService.userData.uid, this.id, values[i].idFpHistory)

      })

    })

    this.fpService.deleteFinancialPlanning(this.authService.userData.uid, this.id)


    this.closeModal()
  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
