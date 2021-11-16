import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { FinancialPlanningCrudModalService } from 'src/app/finances/services/financial-planning-crud-modal.service';
import { FinancialPlanningService } from 'src/app/finances/services/financial-planning.service';
import { WalletService } from 'src/app/finances/services/wallet.service';

@Component({
  selector: 'app-financial-dashboard-progress',
  templateUrl: './financial-dashboard-progress.component.html',
  styleUrls: ['./financial-dashboard-progress.component.css']
})
export class FinancialDashboardProgressComponent implements OnInit {
  FinancialPlanning: any;

  Wallet: any;

  constructor(
    public walletService: WalletService,
    public modalFpService: FinancialPlanningCrudModalService,
    public authService: AuthService,
    public fpService: FinancialPlanningService
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
        let date_ini = new Date(data.dataInicial + "T00:00");
        let date_end = new Date(data.dataFinal + "T00:00");
        let end_yeah = date_end.getFullYear()
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

        pocentoDate = pocentoDate !== 'NaN' ? pocentoDate : 0

        porcentoValue = (data.valorAtual * 100) / data.valorObjetivado
        porcentoValueFp = parseFloat(porcentoValue.toFixed(2))

        if (porcentoValueFp >= 100) {
          porcentoValueFp = 100
        }

        return {
          id: e.payload.doc.id,
          valueFp: porcentoValueFp,
          dateFp: pocentoDate,
          ...e.payload.doc.data()
        } as unknown;


      })

      // Ordena do maior para o menor os planejamentos financeiro
      this.FinancialPlanning = this.FinancialPlanning.sort(function (a: any, b: any) { return a.dateFp - b.dateFp }).reverse()

      // Pega a primeira posição para se mostrado do dashboard
      this.FinancialPlanning = this.FinancialPlanning.filter((el: any, i: any) => i < 1)

    })

  }

  modalCreateFinancialPlanning() {
    this.modalFpService.showCreateFinancialPlanning()
  }

}

