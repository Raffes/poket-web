import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { ExpenseCrudModalService } from 'src/app/finances/services/expense-crud-modal.service';
import { ExpenseService } from 'src/app/finances/services/expense.service';
import { WalletService } from 'src/app/finances/services/wallet.service';

@Component({
  selector: 'app-expense-dashboard-pie-graph',
  templateUrl: './expense-dashboard-pie-graph.component.html',
  styleUrls: ['./expense-dashboard-pie-graph.component.css']
})
export class ExpenseDashboardPieGraphComponent implements OnInit {

  Wallet: any;
  pieGraphExpense: any

  constructor(
    public walletService: WalletService,
    public expenseService: ExpenseService,
    public modalExpenseService: ExpenseCrudModalService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getPieGraphExpense()
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

  getPieGraphExpense() {

    this.expenseService.getExpenseList(this.authService.userData.uid).subscribe(res => {

      let allDatas = res.map(el => {
        // Pega o ano atual do usuário
        let date = new Date()
        let lastFullDay = new Date(date.getUTCFullYear(), 11 + 1, 0);
        let lastDay = String(lastFullDay.getDate()).padStart(2, '0');
        if (el.payload.doc.data().dataDespesa >= date.getUTCFullYear() + '-01-01' && el.payload.doc.data().dataDespesa <= date.getUTCFullYear() + '-12-' + lastDay) {

          return {
            tipoDespesa: el.payload.doc.data().tipoDespesa,
            valor: el.payload.doc.data().valorDespesa
            
          }
        }

        return null
      })

      let alimentationData = allDatas.filter(el => el?.tipoDespesa === 'Alimentação', 0)
      let vehicleData = allDatas.filter(el => el?.tipoDespesa === 'Veículo', 0)
      let homeData = allDatas.filter(el => el?.tipoDespesa === 'Moradia', 0)
      let leisureData = allDatas.filter(el => el?.tipoDespesa === 'Lazer', 0)
      let otherData = allDatas.filter(el => el?.tipoDespesa === 'Outros', 0)

      let sumValueAlimentationData = alimentationData.reduce((total, valor) => total + valor?.valor, 0);
      let sumValueVehicleData = vehicleData.reduce((total, valor) => total + valor?.valor, 0);
      let sumValueHomeData = homeData.reduce((total, valor) => total + valor?.valor, 0);
      let sumValueLeisureData = leisureData.reduce((total, valor) => total + valor?.valor, 0);
      let sumValueOtherData = otherData.reduce((total, valor) => total + valor?.valor, 0);

      let allValues = [{}]


      if(sumValueAlimentationData != 0){
        allValues.push({
          name: 'Alimentação',
          value: sumValueAlimentationData.toFixed(2)
        })
      }
      if (sumValueVehicleData != 0) {
        allValues.push({
          name: 'Veículo',
          value: sumValueVehicleData.toFixed(2)
        })
      } 
      if (sumValueHomeData != 0){
        allValues.push({
          name: 'Moradia',
          value: sumValueHomeData.toFixed(2)
        })
      }
      if (sumValueLeisureData != 0){
        allValues.push({
          name: 'Lazer',
          value: sumValueLeisureData.toFixed(2)
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


      this.pieGraphExpense = {
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

  modalCreateExpense() {
    this.modalExpenseService.showCreateExpense()

  }

}
