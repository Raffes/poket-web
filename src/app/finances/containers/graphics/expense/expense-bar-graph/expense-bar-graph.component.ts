import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { ExpenseService } from 'src/app/finances/services/expense.service';

@Component({
  selector: 'app-expense-bar-graph',
  templateUrl: './expense-bar-graph.component.html',
  styleUrls: ['./expense-bar-graph.component.css']
})
export class ExpenseBarGraphComponent implements OnInit {
  
  barGraphExpense: any

  constructor(
    public expenseService: ExpenseService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getBarGraphIncome()
  }

  getBarGraphIncome() {
    let dateValues: any[] = []
    let horario = "T00:00:00-0300"
    this.expenseService.getExpenseList(this.authService.userData.uid).subscribe(res => {

      let allValuesDate: any[] = []

      let allDatas = res.map((el: any) => {
        // Pega o ano atual do usuário
        let date = new Date()
        let lastFullDay = new Date(date.getUTCFullYear(), 11 + 1, 0);
        let lastDay = String(lastFullDay.getDate()).padStart(2, '0');
        if (el.payload.doc.data().dataDespesa >= date.getUTCFullYear() + '-01-01' && el.payload.doc.data().dataDespesa <= date.getUTCFullYear() + '-12-' + lastDay) {

          // Pega todos os meses entre o ano atual do usuário
          dateValues.push(new Date(el.payload.doc.data().dataDespesa + horario).getMonth()+1)
          
          // Organizar os meses em ordem numérica
          allValuesDate = dateValues.sort(function(a ,b){ return a - b});

          return el.payload.doc.data()
        }
      })
      
      // Converter os números de meses pelo nome dele
      allValuesDate = allValuesDate.map((el) => { 
        return new Date("0"+el).toLocaleString('default', { month: 'long' }) 
      })

      // Filtrar os dados sem ter dados undefined 
      allDatas = allDatas.filter(function (i) {
        return i;
      });

      // Retira o meses duplicados
      let uniqueDates = allValuesDate.filter((el, i) => allValuesDate.indexOf(el) === i)
      // console.log(uniqueDates)

      // Alimentação
      // Traz os dados de Alimentação de janeiro e a soma total do valores
      let janAlimentation = allDatas.filter((el, i) => el.tipoDespesa === "Alimentação" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'janeiro')
      let sumValuesAlimentationJan = janAlimentation.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Alimentação de fevereiro e a soma total do valores
      let FevAlimentation = allDatas.filter((el, i) => el.tipoDespesa === "Alimentação" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'fevereiro')
      let sumValuesAlimentationFev = FevAlimentation.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Alimentação de março e a soma total do valores
      let marAlimentation = allDatas.filter((el, i) => el.tipoDespesa === "Alimentação" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'março')
      let sumValuesAlimentationMar = marAlimentation.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Alimentação de abril e a soma total do valores
      let abrAlimentation = allDatas.filter((el, i) => el.tipoDespesa === "Alimentação" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'abril')
      let sumValuesAlimentationAbr = abrAlimentation.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Alimentação de maio e a soma total do valores
      let mayAlimentation = allDatas.filter((el, i) => el.tipoDespesa === "Alimentação" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'maio')
      let sumValuesAlimentationMay = mayAlimentation.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Alimentação de junho e a soma total do valores
      let junAlimentation = allDatas.filter((el, i) => el.tipoDespesa === "Alimentação" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'junho')
      let sumValuesAlimentationJun = junAlimentation.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Alimentação de julho e a soma total do valores
      let julAlimentation = allDatas.filter((el, i) => el.tipoDespesa === "Alimentação" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'julho')
      let sumValuesAlimentationJul = julAlimentation.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Alimentação de agosto e a soma total do valores
      let agoAlimentation = allDatas.filter((el, i) => el.tipoDespesa === "Alimentação" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'agosto')
      let sumValuesAlimentationAgo = agoAlimentation.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Alimentação de setembro e a soma total do valores
      let setAlimentation = allDatas.filter((el, i) => el.tipoDespesa === "Alimentação" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'setembro')
      let sumValuesAlimentationSet = setAlimentation.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Alimentação de outubro e a soma total do valores
      let outAlimentation = allDatas.filter((el, i) => el.tipoDespesa === "Alimentação" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'outubro')
      let sumValuesAlimentationOut = outAlimentation.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Alimentação de novembro e a soma total do valores
      let novAlimentation = allDatas.filter((el, i) => el.tipoDespesa === "Alimentação" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'novembro')
      let sumValuesAlimentationNov = novAlimentation.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Alimentação de dezembro e a soma total do valores
      let dezAlimentation = allDatas.filter((el, i) => el.tipoDespesa === "Alimentação" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'dezembro')
      let sumValuesAlimentationDez = dezAlimentation.reduce((total, el) => total + el.valorDespesa, 0)

      // Veículo
      // Traz os dados de Veículo de janeiro e a soma total do valores
      let janVehicle = allDatas.filter((el, i) => el.tipoDespesa === "Veículo" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'janeiro')
      let sumValuesVehicleJan = janVehicle.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Veículo de fevereiro e a soma total do valores
      let FevVehicle = allDatas.filter((el, i) => el.tipoDespesa === "Veículo" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'fevereiro')
      let sumValuesVehicleFev = FevVehicle.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Veículo de março e a soma total do valores
      let marVehicle = allDatas.filter((el, i) => el.tipoDespesa === "Veículo" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'março')
      let sumValuesVehicleMar = marVehicle.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Veículo de abril e a soma total do valores
      let abrVehicle = allDatas.filter((el, i) => el.tipoDespesa === "Veículo" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'abril')
      let sumValuesVehicleAbr = abrVehicle.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Veículo de maio e a soma total do valores
      let mayVehicle = allDatas.filter((el, i) => el.tipoDespesa === "Veículo" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'maio')
      let sumValuesVehicleMay = mayVehicle.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Veículo de junho e a soma total do valores
      let junVehicle = allDatas.filter((el, i) => el.tipoDespesa === "Veículo" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'junho')
      let sumValuesVehicleJun = junVehicle.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Veículo de julho e a soma total do valores
      let julVehicle = allDatas.filter((el, i) => el.tipoDespesa === "Veículo" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'julho')
      let sumValuesVehicleJul = julVehicle.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Veículo de agosto e a soma total do valores
      let agoVehicle = allDatas.filter((el, i) => el.tipoDespesa === "Veículo" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'agosto')
      let sumValuesVehicleAgo = agoVehicle.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Veículo de setembro e a soma total do valores
      let setVehicle = allDatas.filter((el, i) => el.tipoDespesa === "Veículo" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'setembro')
      let sumValuesVehicleSet = setVehicle.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Veículo de outubro e a soma total do valores
      let outVehicle = allDatas.filter((el, i) => el.tipoDespesa === "Veículo" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'outubro')
      let sumValuesVehicleOut = outVehicle.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Veículo de novembro e a soma total do valores
      let novVehicle = allDatas.filter((el, i) => el.tipoDespesa === "Veículo" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'novembro')
      let sumValuesVehicleNov = novVehicle.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Veículo de dezembro e a soma total do valores
      let dezVehicle = allDatas.filter((el, i) => el.tipoDespesa === "Veículo" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'dezembro')
      let sumValuesVehicleDez = dezVehicle.reduce((total, el) => total + el.valorDespesa, 0)

      // Moradia
      // Traz os dados de Moradia de janeiro e a soma total do valores
      let janHome = allDatas.filter((el, i) => el.tipoDespesa === "Moradia" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'janeiro')
      let sumValuesHomeJan = janHome.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Moradia de fevereiro e a soma total do valores
      let FevHome = allDatas.filter((el, i) => el.tipoDespesa === "Moradia" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'fevereiro')
      let sumValuesHomeFev = FevHome.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Moradia de março e a soma total do valores
      let marHome = allDatas.filter((el, i) => el.tipoDespesa === "Moradia" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'março')
      let sumValuesHomeMar = marHome.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Moradia de abril e a soma total do valores
      let abrHome = allDatas.filter((el, i) => el.tipoDespesa === "Moradia" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'abril')
      let sumValuesHomeAbr = abrHome.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Moradia de maio e a soma total do valores
      let mayHome = allDatas.filter((el, i) => el.tipoDespesa === "Moradia" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'maio')
      let sumValuesHomeMay = mayHome.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Moradia de junho e a soma total do valores
      let junHome = allDatas.filter((el, i) => el.tipoDespesa === "Moradia" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'junho')
      let sumValuesHomeJun = junHome.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Moradia de julho e a soma total do valores
      let julHome = allDatas.filter((el, i) => el.tipoDespesa === "Moradia" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'julho')
      let sumValuesHomeJul = julHome.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Moradia de agosto e a soma total do valores
      let agoHome = allDatas.filter((el, i) => el.tipoDespesa === "Moradia" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'agosto')
      let sumValuesHomeAgo = agoHome.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Moradia de setembro e a soma total do valores
      let setHome = allDatas.filter((el, i) => el.tipoDespesa === "Moradia" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'setembro')
      let sumValuesHomeSet = setHome.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Moradia de outubro e a soma total do valores
      let outHome = allDatas.filter((el, i) => el.tipoDespesa === "Moradia" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'outubro')
      let sumValuesHomeOut = outHome.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Moradia de novembro e a soma total do valores
      let novHome = allDatas.filter((el, i) => el.tipoDespesa === "Moradia" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'novembro')
      let sumValuesHomeNov = novHome.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Moradia de dezembro e a soma total do valores
      let dezHome = allDatas.filter((el, i) => el.tipoDespesa === "Moradia" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'dezembro')
      let sumValuesHomeDez = dezHome.reduce((total, el) => total + el.valorDespesa, 0)

      // Lazer
      // Traz os dados de Lazer de janeiro e a soma total do valores
      let janLeisure = allDatas.filter((el, i) => el.tipoDespesa === "Lazer" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'janeiro')
      let sumValuesLeisureJan = janLeisure.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Lazer de fevereiro e a soma total do valores
      let FevLeisure = allDatas.filter((el, i) => el.tipoDespesa === "Lazer" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'fevereiro')
      let sumValuesLeisureFev = FevLeisure.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Lazer de março e a soma total do valores
      let marLeisure = allDatas.filter((el, i) => el.tipoDespesa === "Lazer" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'março')
      let sumValuesLeisureMar = marLeisure.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Lazer de abril e a soma total do valores
      let abrLeisure = allDatas.filter((el, i) => el.tipoDespesa === "Lazer" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'abril')
      let sumValuesLeisureAbr = abrLeisure.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Lazer de maio e a soma total do valores
      let mayLeisure = allDatas.filter((el, i) => el.tipoDespesa === "Lazer" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'maio')
      let sumValuesLeisureMay = mayLeisure.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Lazer de junho e a soma total do valores
      let junLeisure = allDatas.filter((el, i) => el.tipoDespesa === "Lazer" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'junho')
      let sumValuesLeisureJun = junLeisure.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Lazer de julho e a soma total do valores
      let julLeisure = allDatas.filter((el, i) => el.tipoDespesa === "Lazer" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'julho')
      let sumValuesLeisureJul = julLeisure.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Lazer de agosto e a soma total do valores
      let agoLeisure = allDatas.filter((el, i) => el.tipoDespesa === "Lazer" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'agosto')
      let sumValuesLeisureAgo = agoLeisure.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Lazer de setembro e a soma total do valores
      let setLeisure = allDatas.filter((el, i) => el.tipoDespesa === "Lazer" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'setembro')
      let sumValuesLeisureSet = setLeisure.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Lazer de outubro e a soma total do valores
      let outLeisure = allDatas.filter((el, i) => el.tipoDespesa === "Lazer" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'outubro')
      let sumValuesLeisureOut = outLeisure.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Lazer de novembro e a soma total do valores
      let novLeisure = allDatas.filter((el, i) => el.tipoDespesa === "Lazer" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'novembro')
      let sumValuesLeisureNov = novLeisure.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Lazer de dezembro e a soma total do valores
      let dezLeisure = allDatas.filter((el, i) => el.tipoDespesa === "Lazer" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'dezembro')
      let sumValuesLeisureDez = dezLeisure.reduce((total, el) => total + el.valorDespesa, 0)

      // Outros
      // Traz os dados de Outros de janeiro e a soma total do valores
      let janOthes = allDatas.filter((el, i) => el.tipoDespesa === "Outros" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'janeiro')
      let sumValuesOthesJan = janOthes.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Outros de fevereiro e a soma total do valores
      let FevOthes = allDatas.filter((el, i) => el.tipoDespesa === "Outros" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'fevereiro')
      let sumValuesOthesFev = FevOthes.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Outros de março e a soma total do valores
      let marOthes = allDatas.filter((el, i) => el.tipoDespesa === "Outros" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'março')
      let sumValuesOthesMar = marOthes.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Outros de abril e a soma total do valores
      let abrOthes = allDatas.filter((el, i) => el.tipoDespesa === "Outros" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'abril')
      let sumValuesOthesAbr = abrOthes.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Outros de maio e a soma total do valores
      let mayOthes = allDatas.filter((el, i) => el.tipoDespesa === "Outros" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'maio')
      let sumValuesOthesMay = mayOthes.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Outros de junho e a soma total do valores
      let junOthes = allDatas.filter((el, i) => el.tipoDespesa === "Outros" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'junho')
      let sumValuesOthesJun = junOthes.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Outros de julho e a soma total do valores
      let julOthes = allDatas.filter((el, i) => el.tipoDespesa === "Outros" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'julho')
      let sumValuesOthesJul = julOthes.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Outros de agosto e a soma total do valores
      let agoOthes = allDatas.filter((el, i) => el.tipoDespesa === "Outros" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'agosto')
      let sumValuesOthesAgo = agoOthes.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Outros de setembro e a soma total do valores
      let setOthes = allDatas.filter((el, i) => el.tipoDespesa === "Outros" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'setembro')
      let sumValuesOthesSet = setOthes.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Outros de outubro e a soma total do valores
      let outOthes = allDatas.filter((el, i) => el.tipoDespesa === "Outros" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'outubro')
      let sumValuesOthesOut = outOthes.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Outros de novembro e a soma total do valores
      let novOthes = allDatas.filter((el, i) => el.tipoDespesa === "Outros" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'novembro')
      let sumValuesOthesNov = novOthes.reduce((total, el) => total + el.valorDespesa, 0)

      // Traz os dados de Outros de dezembro e a soma total do valores
      let dezOthes = allDatas.filter((el, i) => el.tipoDespesa === "Outros" && new Date(el.dataDespesa + horario).toLocaleString('default', { month: 'long' }) == 'dezembro')
      let sumValuesOthesDez = dezOthes.reduce((total, el) => total + el.valorDespesa, 0)

      let allMonthAlimentationObj = [
        { mes: 'janeiro', valor: sumValuesAlimentationJan },
        { mes: 'fevereiro', valor: sumValuesAlimentationFev },
        { mes: 'março', valor: sumValuesAlimentationMar },
        { mes: 'abril', valor: sumValuesAlimentationAbr },
        { mes: 'maio', valor: sumValuesAlimentationMay },
        { mes: 'junho', valor: sumValuesAlimentationJun },
        { mes: 'julho', valor: sumValuesAlimentationJul },
        { mes: 'agosto', valor: sumValuesAlimentationAgo },
        { mes: 'setembro', valor: sumValuesAlimentationSet },
        { mes: 'outubro', valor: sumValuesAlimentationOut },
        { mes: 'novembro', valor: sumValuesAlimentationNov },
        { mes: 'dezembro', valor: sumValuesAlimentationDez }
      ]

      let allMonthVehicleObj = [
        { mes: 'janeiro', valor: sumValuesVehicleJan },
        { mes: 'fevereiro', valor: sumValuesVehicleFev },
        { mes: 'março', valor: sumValuesVehicleMar },
        { mes: 'abril', valor: sumValuesVehicleAbr },
        { mes: 'maio', valor: sumValuesVehicleMay },
        { mes: 'junho', valor: sumValuesVehicleJun },
        { mes: 'julho', valor: sumValuesVehicleJul },
        { mes: 'agosto', valor: sumValuesVehicleAgo },
        { mes: 'setembro', valor: sumValuesVehicleSet },
        { mes: 'outubro', valor: sumValuesVehicleOut },
        { mes: 'novembro', valor: sumValuesVehicleNov },
        { mes: 'dezembro', valor: sumValuesVehicleDez }
      ]

      let allMonthHomeObj = [
        { mes: 'janeiro', valor: sumValuesHomeJan },
        { mes: 'fevereiro', valor: sumValuesHomeFev },
        { mes: 'março', valor: sumValuesHomeMar },
        { mes: 'abril', valor: sumValuesHomeAbr },
        { mes: 'maio', valor: sumValuesHomeMay },
        { mes: 'junho', valor: sumValuesHomeJun },
        { mes: 'julho', valor: sumValuesHomeJul },
        { mes: 'agosto', valor: sumValuesHomeAgo },
        { mes: 'setembro', valor: sumValuesHomeSet },
        { mes: 'outubro', valor: sumValuesHomeOut },
        { mes: 'novembro', valor: sumValuesHomeNov },
        { mes: 'dezembro', valor: sumValuesHomeDez }
      ]

      let allMonthLeisureObj = [
        { mes: 'janeiro', valor: sumValuesLeisureJan },
        { mes: 'fevereiro', valor: sumValuesLeisureFev },
        { mes: 'março', valor: sumValuesLeisureMar },
        { mes: 'abril', valor: sumValuesLeisureAbr },
        { mes: 'maio', valor: sumValuesLeisureMay },
        { mes: 'junho', valor: sumValuesLeisureJun },
        { mes: 'julho', valor: sumValuesLeisureJul },
        { mes: 'agosto', valor: sumValuesLeisureAgo },
        { mes: 'setembro', valor: sumValuesLeisureSet },
        { mes: 'outubro', valor: sumValuesLeisureOut },
        { mes: 'novembro', valor: sumValuesLeisureNov },
        { mes: 'dezembro', valor: sumValuesLeisureDez }
      ]

      let allMonthOthesObj = [
        { mes: 'janeiro', valor: sumValuesOthesJan },
        { mes: 'fevereiro', valor: sumValuesOthesFev },
        { mes: 'março', valor: sumValuesOthesMar },
        { mes: 'abril', valor: sumValuesOthesAbr },
        { mes: 'maio', valor: sumValuesOthesMay },
        { mes: 'junho', valor: sumValuesOthesJun },
        { mes: 'julho', valor: sumValuesOthesJul },
        { mes: 'agosto', valor: sumValuesOthesAgo },
        { mes: 'setembro', valor: sumValuesOthesSet },
        { mes: 'outubro', valor: sumValuesOthesOut },
        { mes: 'novembro', valor: sumValuesOthesNov },
        { mes: 'dezembro', valor: sumValuesOthesDez }
      ]

      // Junta todos os valores de cada Despesa em um so array
      let totalMonth: any[] = []
      totalMonth.push(allMonthAlimentationObj, allMonthVehicleObj, allMonthHomeObj, allMonthLeisureObj, allMonthOthesObj)

      let monthVehicle: any[] = []
      let monthLeisure: any[] = []
      let monthHome: any[] = []
      let monthOthes: any[] = []
      let monthAlimentation: any[] = []
      let totalValue: any[] = []
      let monthGraph: any[] = []
      // TODO tira os monthGraph
      // Adiciona os valores em um array de cada tipo de Despesa
      for (let index = 0; index < uniqueDates.length; index++) {

        allMonthAlimentationObj.forEach((el) => {
          if (el.mes === uniqueDates[index]) {
            monthGraph.push(el.mes)
            monthAlimentation.push(el.valor)

          }

        })

        allMonthVehicleObj.forEach((el) => {
          if (el.mes === uniqueDates[index]) {
            monthGraph.push(el.mes)
            monthVehicle.push(el.valor)
          }

        })

        allMonthHomeObj.forEach((el) => {
          if (el.mes === uniqueDates[index]) {
            monthGraph.push(el.mes)
            monthHome.push(el.valor)
          }

        })

        allMonthLeisureObj.forEach((el) => {
          if (el.mes === uniqueDates[index]) {
            monthGraph.push(el.mes)
            monthLeisure.push(el.valor)
          }

        })

        allMonthOthesObj.forEach((el) => {
          if (el.mes === uniqueDates[index]) {
            monthGraph.push(el.mes)
            monthOthes.push(el.valor)
          }

        })

        // Adiciona os valores nos meses que existem
        for (let i = 0; i < totalMonth.length; i++) {
          for (let j = 0; j < totalMonth[i].length; j++) {

            if (totalMonth[i][j].mes === uniqueDates[index] && totalMonth[i][j].valor != 0) {

              totalValue.push(totalMonth[i][j])

            }

          }

        }

      }

      // Tira os valores duplicados e organiza
      // monthGraph = monthGraph.filter((el, i) => monthGraph.indexOf(el) === i)

      // console.log(monthGraph)
      // Filtra os valores de cada mes
      let valueJan = totalValue.filter(el => el.mes === 'janeiro')
      let valueFev = totalValue.filter(el => el.mes === 'fevereiro')
      let valueMar = totalValue.filter(el => el.mes === 'março')
      let valueAbr = totalValue.filter(el => el.mes === 'abril')
      let valueMay = totalValue.filter(el => el.mes === 'maio')
      let valueJun = totalValue.filter(el => el.mes === 'junho')
      let valueJul = totalValue.filter(el => el.mes === 'julho')
      let valueAgo = totalValue.filter(el => el.mes === 'agosto')
      let valueSet = totalValue.filter(el => el.mes === 'setembro')
      let valueOut = totalValue.filter(el => el.mes === 'outubro')
      let valueNov = totalValue.filter(el => el.mes === 'novembro')
      let valueDez = totalValue.filter(el => el.mes === 'dezembro')

      // Pega os valores do meses e traz o total
      let totalValueMonth = [
        valueJan.reduce((total, valor) => total + valor.valor, 0),
        valueFev.reduce((total, valor) => total + valor.valor, 0),
        valueMar.reduce((total, valor) => total + valor.valor, 0),
        valueAbr.reduce((total, valor) => total + valor.valor, 0),
        valueMay.reduce((total, valor) => total + valor.valor, 0),
        valueJun.reduce((total, valor) => total + valor.valor, 0),
        valueJul.reduce((total, valor) => total + valor.valor, 0),
        valueAgo.reduce((total, valor) => total + valor.valor, 0),
        valueSet.reduce((total, valor) => total + valor.valor, 0),
        valueOut.reduce((total, valor) => total + valor.valor, 0),
        valueNov.reduce((total, valor) => total + valor.valor, 0),
        valueDez.reduce((total, valor) => total + valor.valor, 0)
      ];

      // Tira os zeros vindo dos meses que não tiverem valor no reduce
      totalValue = totalValueMonth.filter(el => el != 0)

      this.barGraphExpense = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: uniqueDates
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Veículo',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: monthVehicle
          },
          {
            name: 'Lazer',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: monthLeisure
          },
          {
            name: 'Moradia',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: monthHome
          },
          {
            name: 'Alimentação',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: monthAlimentation
          },
          {
            name: 'Outros',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: monthOthes
          },
          {
            name: 'Total',
            type: 'bar',
            barWidth: 5,
            data: totalValue,
            emphasis: {
              focus: 'series'
            },
            markLine: {
              lineStyle: {
                type: 'dashed'
              },
              data: [{ type: 'max' }]
            }
          },

        ]
      };


    })

  }
}
