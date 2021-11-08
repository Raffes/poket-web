import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { ExpenseService } from 'src/app/finances/services/expense.service';

@Component({
  selector: 'app-expense-pie-graph',
  templateUrl: './expense-pie-graph.component.html',
  styleUrls: ['./expense-pie-graph.component.css']
})
export class ExpensePieGraphComponent implements OnInit {
 
  pieGraphExpense: any

  constructor(
    public expenseService: ExpenseService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getPieGraphIncome()
  }

  getPieGraphIncome() {

    this.expenseService.getExpenseList(this.authService.userData.uid).subscribe(res => {

      let allDatas = res.map(el => {
        // Pega o ano atual do usuário
        let date = new Date()
        let lastFullDay = new Date(date.getUTCFullYear(), 11 + 1, 0);
        let lastDay = String(lastFullDay.getDate()).padStart(2, '0');
        if (el.payload.doc.data().dataDespesa >= date.getUTCFullYear() + '-01-01' && el.payload.doc.data().dataDespesa <= date.getUTCFullYear() + '-12-' + lastDay) {

          return {
            tipoDespesa: el.payload.doc.data().tipoDespesa
            
          }
        }

        return null
      })

      let alimentationData = allDatas.filter(el => el?.tipoDespesa === 'Alimentação', 0)
      let vehicleData = allDatas.filter(el => el?.tipoDespesa === 'Veículo', 0)
      let homeData = allDatas.filter(el => el?.tipoDespesa === 'Moradia', 0)
      let leisureData = allDatas.filter(el => el?.tipoDespesa === 'Lazer', 0)
      let otherData = allDatas.filter(el => el?.tipoDespesa === 'Outros', 0)

      let allTypes = [
        alimentationData.length,
        vehicleData.length,
        homeData.length,
        leisureData.length,
        otherData.length
      ]

      let sumAllTypesOfIncome = allTypes.reduce((a, b) => a + b)

      let percentAlimentation = (alimentationData.length * 100) / sumAllTypesOfIncome
      let percentVehicle = (vehicleData.length * 100) / sumAllTypesOfIncome
      let percentHome = (homeData.length * 100) / sumAllTypesOfIncome
      let percentLeisure = (leisureData.length * 100) / sumAllTypesOfIncome
      let percentOther = (otherData.length * 100) / sumAllTypesOfIncome
      let allValues = [{}]

      if(percentLeisure != 0){
        allValues.push({
          name: 'Lazer',
          value: parseFloat(percentLeisure.toFixed(2))
        })
      }
      if (percentAlimentation != 0) {
        allValues.push({
          name: 'Alimentação',
          value: parseFloat(percentAlimentation.toFixed(2)) 
        })
      } 
      if (percentHome != 0){
        allValues.push({
          name: 'Moradia',
          value: parseFloat(percentHome.toFixed(2)) 
        })
      }
      if (percentVehicle != 0){
        allValues.push({
          name: 'Veículo',
          value: parseFloat(percentVehicle.toFixed(2)) 
        })
      }
      if (percentOther != 0){
        allValues.push({
          name: 'Outros',
          value: parseFloat(percentOther.toFixed(2)) 
        })
      }

      this.pieGraphExpense = {
        
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'right'
        },
        series: [
          {
            name: '%',
            type: 'pie',
            radius: '50%',
            data: allValues,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

    })
  
  
  }

}
