import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Expense } from 'src/app/finances/modal/expense';
import { Income } from 'src/app/finances/modal/income';
import { ExpenseService } from 'src/app/finances/services/expense.service';
import { IncomeService } from 'src/app/finances/services/income.service';
import { ModalWalletCrudService } from 'src/app/finances/services/wallet-crud-modal.service';
import { WalletService } from 'src/app/finances/services/wallet.service';

@Component({
  selector: 'app-expense-income-bar-graph',
  templateUrl: './expense-income-bar-graph.component.html',
  styleUrls: ['./expense-income-bar-graph.component.css'],
  styles: [
    `
      :host >>> .tooltip-inner {
        background-color: #198754;
        color: #fff;
      }
      :host >>> .tooltip.top .tooltip-arrow:before,
      :host >>> .tooltip.top .tooltip-arrow {
        border-top-color: #009688;
      }
    `
  ]
})
export class ExpenseIncomeBarGraphComponent implements OnInit {

  Expense: any;
  barGraphExpenseIncome: any
  valor: any
  thisYeah = new Date().getUTCFullYear()
  Wallet: any

  constructor(
    public incomeService: IncomeService,
    public expenseService: ExpenseService,
    public authService: AuthService,
    public walletService: WalletService,
    public ModalWalletService: ModalWalletCrudService,
  ) { }

  ngOnInit(): void {
    this.getBarGraphExpenseIncome()
    this.totalBalance()
    this.listWallet()
  }

  listWallet() {
    this.walletService.getWalletList(this.authService.userData.uid).subscribe(res => {
      this.Wallet = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      })
    })
  }

  totalBalance() {
    this.walletService.getWalletList(this.authService.userData.uid).subscribe(res => {
      
      let allValues = res.map(e => {
        return {
          valor: e.payload.doc.data().valor,
        } 

      })
      
      this.valor = allValues.reduce((total, valor) => total + valor.valor, 0);

      return this.valor

    })
  }
  getBarGraphExpenseIncome() {
    let dateValues: any[] = []
    let horario = "T00:00:00-0300"
    // Pega o ano atual do usuário
    let date = new Date()
    let lastFullDay = new Date(date.getUTCFullYear(), 11 + 1, 0);
    let lastDay = String(lastFullDay.getDate()).padStart(2, '0');

    this.incomeService.getIncomeList(this.authService.userData.uid).subscribe(res => {

      let allValuesDate: any[] = []

      let allDatas = res.map((el: any) => {

        if (el.payload.doc.data().dataRenda >= date.getUTCFullYear() + '-01-01' && el.payload.doc.data().dataRenda <= date.getUTCFullYear() + '-12-' + lastDay) {

          // Pega todos os meses entre o ano atual do usuário
          dateValues.push(new Date(el.payload.doc.data().dataRenda + horario).getMonth() + 1)

          // Organizar os meses em ordem numérica
          allValuesDate = dateValues.sort(function (a, b) { return a - b });

          return el.payload.doc.data()
        }
      })

      // Converter os números de meses pelo nome dele
      allValuesDate = allValuesDate.map((el) => {
        return new Date("0" + el).toLocaleString('default', { month: 'long' })
      })

      // Filtrar os dados sem ter dados undefined 
      allDatas = allDatas.filter(function (i) {
        return i;
      });

      // Retira o meses duplicados
      let uniqueDates = allValuesDate.filter((el, i) => allValuesDate.indexOf(el) === i)

      // Traz os dados de aluguel de janeiro e a soma total do valores
      let janIncome = allDatas.filter((el, i) => new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'janeiro')
      let sumValuesIncomeJan = janIncome.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de aluguel de fevereiro e a soma total do valores
      let FevIncome = allDatas.filter((el, i) => new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'fevereiro')
      let sumValuesIncomeFev = FevIncome.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de aluguel de março e a soma total do valores
      let marIncome = allDatas.filter((el, i) => new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'março')
      let sumValuesIncomeMar = marIncome.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de aluguel de abril e a soma total do valores
      let abrIncome = allDatas.filter((el, i) => new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'abril')
      let sumValuesIncomeAbr = abrIncome.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de aluguel de maio e a soma total do valores
      let mayIncome = allDatas.filter((el, i) => new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'maio')
      let sumValuesIncomeMay = mayIncome.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de aluguel de junho e a soma total do valores
      let junIncome = allDatas.filter((el, i) => new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'junho')
      let sumValuesIncomeJun = junIncome.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de aluguel de julho e a soma total do valores
      let julIncome = allDatas.filter((el, i) => new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'julho')
      let sumValuesIncomeJul = julIncome.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de aluguel de agosto e a soma total do valores
      let agoIncome = allDatas.filter((el, i) => new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'agosto')
      let sumValuesIncomeAgo = agoIncome.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de aluguel de setembro e a soma total do valores
      let setIncome = allDatas.filter((el, i) => new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'setembro')
      let sumValuesIncomeSet = setIncome.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de aluguel de outubro e a soma total do valores
      let outIncome = allDatas.filter((el, i) => new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'outubro')
      let sumValuesIncomeOut = outIncome.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de aluguel de novembro e a soma total do valores
      let novIncome = allDatas.filter((el, i) => new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'novembro')
      let sumValuesIncomeNov = novIncome.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de aluguel de dezembro e a soma total do valores
      let dezIncome = allDatas.filter((el, i) => new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'dezembro')
      let sumValuesIncomeDez = dezIncome.reduce((total, el) => total + el.valorRenda, 0)


      let totalMonth: any[] = []
      let valueIncome: any[] = []
      let monthGraph: any[] = []

      let allMonthIncomeObj = [
        { mes: 'janeiro', valor: sumValuesIncomeJan },
        { mes: 'fevereiro', valor: sumValuesIncomeFev },
        { mes: 'março', valor: sumValuesIncomeMar },
        { mes: 'abril', valor: sumValuesIncomeAbr },
        { mes: 'maio', valor: sumValuesIncomeMay },
        { mes: 'junho', valor: sumValuesIncomeJun },
        { mes: 'julho', valor: sumValuesIncomeJul },
        { mes: 'agosto', valor: sumValuesIncomeAgo },
        { mes: 'setembro', valor: sumValuesIncomeSet },
        { mes: 'outubro', valor: sumValuesIncomeOut },
        { mes: 'novembro', valor: sumValuesIncomeNov },
        { mes: 'dezembro', valor: sumValuesIncomeDez }
      ]

      // Junta todos os valores de cada renda em um so array
      totalMonth.push(allMonthIncomeObj)

      // Adiciona os valores em um array de cada tipo de renda
      for (let index = 0; index < uniqueDates.length; index++) {

        allMonthIncomeObj.forEach((el) => {
          if (el.mes === uniqueDates[index]) {
            monthGraph.push(el.mes)
            valueIncome.push(el.valor)

          }

        })


      }

      // Traz um array com os nomes dos meses cortado
      let monthsRegistered = monthGraph.map(el => el.slice(0, 3))



      this.expenseService.getExpenseList(this.authService.userData.uid).subscribe(res => {

        let allDatasExpense = res.map((el: any) => {

          if (el.payload.doc.data().dataDespesa >= date.getUTCFullYear() + '-01-01' && el.payload.doc.data().dataDespesa <= date.getUTCFullYear() + '-12-' + lastDay) {
            return el.payload.doc.data()
          }
        })

        // Filtrar os dados sem ter dados undefined 
        allDatasExpense = allDatasExpense.filter(function (i) {
          return i;
        });

        // Traz os dados de aluguel de janeiro e a soma total do valores
        let janExpense = allDatasExpense.filter((el, i) => new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'janeiro')
        let sumValuesExpenseJan = janExpense.reduce((total, el) => total + el.valorDespesa, 0)

        // Traz os dados de aluguel de fevereiro e a soma total do valores
        let FevExpense = allDatasExpense.filter((el, i) => new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'fevereiro')
        let sumValuesExpenseFev = FevExpense.reduce((total, el) => total + el.valorDespesa, 0)

        // Traz os dados de aluguel de março e a soma total do valores
        let marExpense = allDatasExpense.filter((el, i) => new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'março')
        let sumValuesExpenseMar = marExpense.reduce((total, el) => total + el.valorDespesa, 0)

        // Traz os dados de aluguel de abril e a soma total do valores
        let abrExpense = allDatasExpense.filter((el, i) => new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'abril')
        let sumValuesExpenseAbr = abrExpense.reduce((total, el) => total + el.valorDespesa, 0)

        // Traz os dados de aluguel de maio e a soma total do valores
        let mayExpense = allDatasExpense.filter((el, i) => new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'maio')
        let sumValuesExpenseMay = mayExpense.reduce((total, el) => total + el.valorDespesa, 0)

        // Traz os dados de aluguel de junho e a soma total do valores
        let junExpense = allDatasExpense.filter((el, i) => new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'junho')
        let sumValuesExpenseJun = junExpense.reduce((total, el) => total + el.valorDespesa, 0)

        // Traz os dados de aluguel de julho e a soma total do valores
        let julExpense = allDatasExpense.filter((el, i) => new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'julho')
        let sumValuesExpenseJul = julExpense.reduce((total, el) => total + el.valorDespesa, 0)

        // Traz os dados de aluguel de agosto e a soma total do valores
        let agoExpense = allDatasExpense.filter((el, i) => new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'agosto')
        let sumValuesExpenseAgo = agoExpense.reduce((total, el) => total + el.valorDespesa, 0)

        // Traz os dados de aluguel de setembro e a soma total do valores
        let setExpense = allDatasExpense.filter((el, i) => new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'setembro')
        let sumValuesExpenseSet = setExpense.reduce((total, el) => total + el.valorDespesa, 0)

        // Traz os dados de aluguel de outubro e a soma total do valores
        let outExpense = allDatasExpense.filter((el, i) => new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'outubro')
        let sumValuesExpenseOut = outExpense.reduce((total, el) => total + el.valorDespesa, 0)

        // Traz os dados de aluguel de novembro e a soma total do valores
        let novExpense = allDatasExpense.filter((el, i) => new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'novembro')
        let sumValuesExpenseNov = novExpense.reduce((total, el) => total + el.valorDespesa, 0)

        // Traz os dados de aluguel de dezembro e a soma total do valores
        let dezExpense = allDatasExpense.filter((el, i) => new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'dezembro')
        let sumValuesExpenseDez = dezExpense.reduce((total, el) => total + el.valorDespesa, 0)


        let totalMonth: any[] = []
        let valueExpense: any[] = []

        let allMonthExpenseObj = [
          { mes: 'janeiro', valor: sumValuesExpenseJan },
          { mes: 'fevereiro', valor: sumValuesExpenseFev },
          { mes: 'março', valor: sumValuesExpenseMar },
          { mes: 'abril', valor: sumValuesExpenseAbr },
          { mes: 'maio', valor: sumValuesExpenseMay },
          { mes: 'junho', valor: sumValuesExpenseJun },
          { mes: 'julho', valor: sumValuesExpenseJul },
          { mes: 'agosto', valor: sumValuesExpenseAgo },
          { mes: 'setembro', valor: sumValuesExpenseSet },
          { mes: 'outubro', valor: sumValuesExpenseOut },
          { mes: 'novembro', valor: sumValuesExpenseNov },
          { mes: 'dezembro', valor: sumValuesExpenseDez }
        ]

        // Junta todos os valores de cada renda em um so array
        totalMonth.push(allMonthExpenseObj)

        // Adiciona os valores em um array de cada tipo de renda
        for (let index = 0; index < uniqueDates.length; index++) {

          allMonthExpenseObj.forEach((el) => {
            if (el.mes === uniqueDates[index]) {
              valueExpense.push(el.valor)

            }

          })


        }

        // Gráfico de comparação de despesa e renda
        this.barGraphExpenseIncome = {
          
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['Despesa', 'Renda']
          },
          toolbox: {
            show: true,
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              // prettier-ignore
              data: monthsRegistered
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'Despesa',
              type: 'bar',
              data: valueExpense,
              color: '#f47e54',
              markPoint: {
                data: [
                  { type: 'max', name: 'Max' },
                  { type: 'min', name: 'Min' }
                ]
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }]
              }
            },
            {
              name: 'Renda',
              type: 'bar',
              data: valueIncome,
              color: '#9fe080',
              markPoint: {
                data: [
                  { type: 'max', name: 'Max' },
                  { type: 'max', name: 'Max' }
                ]
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }]
              }
            }
          ]
        };

      })

    })

  }

  modalCreateWallet() {
    this.ModalWalletService.showCreateWallet()
  }

}
