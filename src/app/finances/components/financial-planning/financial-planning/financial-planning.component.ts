import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { FinancialPlanningCrudModalService } from 'src/app/finances/services/financial-planning-crud-modal.service';
import { FinancialPlanningService } from 'src/app/finances/services/financial-planning.service';
import { ModalWalletCrudService } from 'src/app/finances/services/wallet-crud-modal.service';
import { WalletService } from 'src/app/finances/services/wallet.service';

@Component({
  selector: 'app-financial-planning',
  templateUrl: './financial-planning.component.html',
  styleUrls: ['./financial-planning.component.css']
})
export class FinancialPlanningComponent implements OnInit {

  FinancialPlanning: any;
  porcentoValueFp: any;
  porcentoDateFp: any;
  filterFinancialPlanning: string = '';

  Wallet: any;

  totalLength: any;
  page: number = 1;

  constructor(
    public modalFpService: FinancialPlanningCrudModalService,
    public authService: AuthService,
    private router: Router,
    public walletService: WalletService,
    public ModalWalletService: ModalWalletCrudService,
    public fpService: FinancialPlanningService
  ) { }

  ngOnInit(): void {

    this.listFinancialPlanning()
    this.paginationLengthFp()
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

  modalCreateWallet() {
    this.ModalWalletService.showCreateWallet()
  }

  paginationLengthFp() {
    this.fpService.getFinancialPlanningList(this.authService.userData.uid).subscribe(res => {
      this.totalLength = res.length

    })
  }

  listFinancialPlanning() {
    this.fpService.getFinancialPlanningList(this.authService.userData.uid).subscribe(res => {
      let porcentoValueFp: any
      let porcentoValue: any

      let porcentoDateFp: any
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      let dataAtual = new Date();
      let fullYeah = dataAtual.getFullYear();
      let month = String(dataAtual.getMonth() + 1).padStart(2, '0');
      let dayToday = String(dataAtual.getDate()).padStart(2, '0');
      let fullDate = fullYeah + '-' + month + '-' + dayToday;

      this.FinancialPlanning = res.map(e => {
        const data = e.payload.doc.data()
        porcentoValue = (data.valorAtual * 100) / data.valorObjetivado
        porcentoValueFp = parseFloat(porcentoValue.toFixed(2))

        let date_ini = new Date(data.dataInicial + "T00:00");
        let date_end = new Date(data.dataFinal + "T00:00");
        let date_today = new Date(fullDate + "T00:00")



        let diff = date_end.getTime() - date_ini.getTime()
        let diffToday = date_today.getTime() - date_ini.getTime()
        let totalDaysUntilToday = Math.abs(diffToday / day)
        let totalDays = Math.abs(diff / day)

        porcentoDateFp = (totalDaysUntilToday * 100) / totalDays

        let pocentoDate = porcentoDateFp.toFixed(2)

        if (totalDaysUntilToday === totalDays) {
          pocentoDate = 100
        }


        return {
          id: e.payload.doc.id,
          valueFp: porcentoValueFp,
          dateFp: pocentoDate !== 'NaN' ? pocentoDate : 0,
          ...e.payload.doc.data()
        } as unknown;
      })

    })

  }

  modalAddFinancialPlanningHistory(fp: any) {
    this.modalFpService.showAddFinancialPlanning(fp)
  }

  modalCreateFinancialPlanning() {
    this.modalFpService.showCreateFinancialPlanning()
  }

  modalEditFinancialPlanning(fp: any) {
    this.modalFpService.showEditFinancialPlanning(fp)
  }

  modalDeleteFinancialPlanning(fp: any) {
    this.modalFpService.showDeleteFinancialPlanning(fp)
  }

  financialPlanningHistory(idFP: any) {
    this.router.navigate([`dashboard/financial-planning/financial-planning-history/${idFP}`])
  }

}
