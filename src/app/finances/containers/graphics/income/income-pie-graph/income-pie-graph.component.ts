import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { IncomeService } from 'src/app/finances/services/income.service';

@Component({
  selector: 'app-income-pie-graph',
  templateUrl: './income-pie-graph.component.html',
  styleUrls: ['./income-pie-graph.component.css']
})
export class IncomePieGraphComponent implements OnInit {

  pieGraphIncome: any

  constructor(
    public incomeService: IncomeService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getPieGraphIncome()
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
            tipoRenda: el.payload.doc.data().tipoRenda
            
          }
        }

        return null
      })

      let salaryData = allDatas.filter(el => el?.tipoRenda === 'Salário', 0)
      let giftData = allDatas.filter(el => el?.tipoRenda === 'Presente', 0)
      let serviceData = allDatas.filter(el => el?.tipoRenda === 'Serviços', 0)
      let rentData = allDatas.filter(el => el?.tipoRenda === 'Aluguel', 0)
      let otherData = allDatas.filter(el => el?.tipoRenda === 'Outros', 0)

      let allTypes = [
        salaryData.length,
        giftData.length,
        serviceData.length,
        rentData.length,
        otherData.length
      ]

      let sumAllTypesOfIncome = allTypes.reduce((a, b) => a + b)

      let percentSalary = (salaryData.length * 100) / sumAllTypesOfIncome
      let percentGift = (giftData.length * 100) / sumAllTypesOfIncome
      let percentService = (serviceData.length * 100) / sumAllTypesOfIncome
      let percentRent = (rentData.length * 100) / sumAllTypesOfIncome
      let percentOther = (otherData.length * 100) / sumAllTypesOfIncome
      let allValues = [{}]

      if(percentRent != 0){
        allValues.push({
          name: 'Aluguel',
          value: parseFloat(percentRent.toFixed(2))
        })
      }
      if (percentSalary != 0) {
        allValues.push({
          name: 'Salário',
          value: parseFloat(percentSalary.toFixed(2)) 
        })
      } 
      if (percentService != 0){
        allValues.push({
          name: 'Serviços',
          value: parseFloat(percentService.toFixed(2)) 
        })
      }
      if (percentGift != 0){
        allValues.push({
          name: 'Presente',
          value: parseFloat(percentGift.toFixed(2)) 
        })
      }
      if (percentOther != 0){
        allValues.push({
          name: 'Outros',
          value: parseFloat(percentOther.toFixed(2)) 
        })
      }

      this.pieGraphIncome = {
        
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
