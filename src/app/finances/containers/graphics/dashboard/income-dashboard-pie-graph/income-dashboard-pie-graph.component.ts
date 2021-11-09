import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { IncomeCrudModalService } from 'src/app/finances/services/income-crud-modal.service';
import { IncomeService } from 'src/app/finances/services/income.service';
import { WalletService } from 'src/app/finances/services/wallet.service';

@Component({
  selector: 'app-income-dashboard-pie-graph',
  templateUrl: './income-dashboard-pie-graph.component.html',
  styleUrls: ['./income-dashboard-pie-graph.component.css']
})
export class IncomeDashboardPieGraphComponent implements OnInit {

  Wallet: any;
  pieGraphIncome: any

  constructor(
    public walletService: WalletService,
    public incomeService: IncomeService,
    public ModalIncomeService: IncomeCrudModalService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getPieGraphIncome()
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

  getPieGraphIncome() {

    this.incomeService.getIncomeList(this.authService.userData.uid).subscribe(res => {

      let allDatas = res.map(el => {
        // Pega o ano atual do usuário
        let date = new Date()
        let lastFullDay = new Date(date.getUTCFullYear(), 11 + 1, 0);
        let lastDay = String(lastFullDay.getDate()).padStart(2, '0');
        if (el.payload.doc.data().dataRenda >= date.getUTCFullYear() + '-01-01' && el.payload.doc.data().dataRenda <= date.getUTCFullYear() + '-12-' + lastDay) {

          return {
            tipoRenda: el.payload.doc.data().tipoRenda,
            valor: el.payload.doc.data().valorRenda
            
          }
        }

        return null
      })

      let salaryData = allDatas.filter(el => el?.tipoRenda === 'Salário', 0)
      let giftData = allDatas.filter(el => el?.tipoRenda === 'Presente', 0)
      let serviceData = allDatas.filter(el => el?.tipoRenda === 'Serviços', 0)
      let rentData = allDatas.filter(el => el?.tipoRenda === 'Aluguel', 0)
      let otherData = allDatas.filter(el => el?.tipoRenda === 'Outros', 0)

      let sumValueSalaryData = salaryData.reduce((total, valor) => total + valor?.valor, 0);
      let sumValueGiftData = giftData.reduce((total, valor) => total + valor?.valor, 0);
      let sumValueServiceData = serviceData.reduce((total, valor) => total + valor?.valor, 0);
      let sumValueRentData = rentData.reduce((total, valor) => total + valor?.valor, 0);
      let sumValueOtherData = otherData.reduce((total, valor) => total + valor?.valor, 0);

      let allValues = [{}]


      if(sumValueRentData != 0){
        allValues.push({
          name: 'Aluguel',
          value: sumValueRentData.toFixed(2)
        })
      }
      if (sumValueSalaryData != 0) {
        allValues.push({
          name: 'Salário',
          value: sumValueSalaryData.toFixed(2)
        })
      } 
      if (sumValueServiceData != 0){
        allValues.push({
          name: 'Serviços',
          value: sumValueServiceData.toFixed(2)
        })
      }
      if (sumValueGiftData != 0){
        allValues.push({
          name: 'Presente',
          value: sumValueGiftData.toFixed(2)
        })
      }
      if (sumValueOtherData != 0){
        allValues.push({
          name: 'Outros',
          value: sumValueOtherData.toFixed(2)
        })
      }

      // this.pieGraphIncome = {
        
      //   tooltip: {
      //     trigger: 'item'
      //   },
      //   legend: {
      //     orient: 'vertical',
      //     left: 'right'
      //   },
      //   series: [
      //     {
      //       name: 'Reais (R$)',
      //       type: 'pie',
      //       radius: '50%',
      //       data: allValues,
      //       emphasis: {
      //         itemStyle: {
      //           shadowBlur: 10,
      //           shadowOffsetX: 0,
      //           shadowColor: 'rgba(0, 0, 0, 0.5)'
      //         }
      //       }
      //     }
      //   ]
      // };

      this.pieGraphIncome = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Reais (R$)',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: allValues
          }
        ]
      };

    })
  
  
  }

  modalCreateIncome() {
    this.ModalIncomeService.showCreateIncome()

  }

}
