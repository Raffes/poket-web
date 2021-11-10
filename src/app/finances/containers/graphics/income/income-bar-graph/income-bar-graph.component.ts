import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { IncomeService } from 'src/app/finances/services/income.service';

@Component({
  selector: 'app-income-bar-graph',
  templateUrl: './income-bar-graph.component.html',
  styleUrls: ['./income-bar-graph.component.css']
})
export class IncomeBarGraphComponent implements OnInit {

  barGraphIncome: any
  thisYeah = new Date().getUTCFullYear()

  constructor(
    public incomeService: IncomeService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getBarGraphIncome()
  }

  getBarGraphIncome() {
    let dateValues: any[] = []
    let horario = "T00:00:00-0300"
    this.incomeService.getIncomeList(this.authService.userData.uid).subscribe(res => {

      let allValuesDate: any[] = []

      let allDatas = res.map((el: any) => {
        // Pega o ano atual do usuário
        let date = new Date()
        let lastFullDay = new Date(date.getUTCFullYear(), 11 + 1, 0);
        let lastDay = String(lastFullDay.getDate()).padStart(2, '0');
        if (el.payload.doc.data().dataRenda >= date.getUTCFullYear() + '-01-01' && el.payload.doc.data().dataRenda <= date.getUTCFullYear() + '-12-' + lastDay) {

          // Pega todos os meses entre o ano atual do usuário
          dateValues.push(new Date(el.payload.doc.data().dataRenda + horario).getMonth()+1)
          
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

      // Aluguel
      // Traz os dados de aluguel de janeiro e a soma total do valores
      let janRent = allDatas.filter((el, i) => el.tipoRenda === "Aluguel" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'janeiro')
      let sumValuesRentJan = janRent.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de aluguel de fevereiro e a soma total do valores
      let FevRent = allDatas.filter((el, i) => el.tipoRenda === "Aluguel" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'fevereiro')
      let sumValuesRentFev = FevRent.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de aluguel de março e a soma total do valores
      let marRent = allDatas.filter((el, i) => el.tipoRenda === "Aluguel" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'março')
      let sumValuesRentMar = marRent.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de aluguel de abril e a soma total do valores
      let abrRent = allDatas.filter((el, i) => el.tipoRenda === "Aluguel" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'abril')
      let sumValuesRentAbr = abrRent.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de aluguel de maio e a soma total do valores
      let mayRent = allDatas.filter((el, i) => el.tipoRenda === "Aluguel" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'maio')
      let sumValuesRentMay = mayRent.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de aluguel de junho e a soma total do valores
      let junRent = allDatas.filter((el, i) => el.tipoRenda === "Aluguel" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'junho')
      let sumValuesRentJun = junRent.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de aluguel de julho e a soma total do valores
      let julRent = allDatas.filter((el, i) => el.tipoRenda === "Aluguel" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'julho')
      let sumValuesRentJul = julRent.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de aluguel de agosto e a soma total do valores
      let agoRent = allDatas.filter((el, i) => el.tipoRenda === "Aluguel" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'agosto')
      let sumValuesRentAgo = agoRent.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de aluguel de setembro e a soma total do valores
      let setRent = allDatas.filter((el, i) => el.tipoRenda === "Aluguel" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'setembro')
      let sumValuesRentSet = setRent.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de aluguel de outubro e a soma total do valores
      let outRent = allDatas.filter((el, i) => el.tipoRenda === "Aluguel" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'outubro')
      let sumValuesRentOut = outRent.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de aluguel de novembro e a soma total do valores
      let novRent = allDatas.filter((el, i) => el.tipoRenda === "Aluguel" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'novembro')
      let sumValuesRentNov = novRent.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de aluguel de dezembro e a soma total do valores
      let dezRent = allDatas.filter((el, i) => el.tipoRenda === "Aluguel" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'dezembro')
      let sumValuesRentDez = dezRent.reduce((total, el) => total + el.valorRenda, 0)

      // Salario
      // Traz os dados de salario de janeiro e a soma total do valores
      let janSalary = allDatas.filter((el, i) => el.tipoRenda === "Salário" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'janeiro')
      let sumValuesSalaryJan = janSalary.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Salário de fevereiro e a soma total do valores
      let FevSalary = allDatas.filter((el, i) => el.tipoRenda === "Salário" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'fevereiro')
      let sumValuesSalaryFev = FevSalary.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Salário de março e a soma total do valores
      let marSalary = allDatas.filter((el, i) => el.tipoRenda === "Salário" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'março')
      let sumValuesSalaryMar = marSalary.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Salário de abril e a soma total do valores
      let abrSalary = allDatas.filter((el, i) => el.tipoRenda === "Salário" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'abril')
      let sumValuesSalaryAbr = abrSalary.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Salário de maio e a soma total do valores
      let maySalary = allDatas.filter((el, i) => el.tipoRenda === "Salário" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'maio')
      let sumValuesSalaryMay = maySalary.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Salário de junho e a soma total do valores
      let junSalary = allDatas.filter((el, i) => el.tipoRenda === "Salário" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'junho')
      let sumValuesSalaryJun = junSalary.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Salário de julho e a soma total do valores
      let julSalary = allDatas.filter((el, i) => el.tipoRenda === "Salário" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'julho')
      let sumValuesSalaryJul = julSalary.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Salário de agosto e a soma total do valores
      let agoSalary = allDatas.filter((el, i) => el.tipoRenda === "Salário" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'agosto')
      let sumValuesSalaryAgo = agoSalary.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Salário de setembro e a soma total do valores
      let setSalary = allDatas.filter((el, i) => el.tipoRenda === "Salário" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'setembro')
      let sumValuesSalarySet = setSalary.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Salário de outubro e a soma total do valores
      let outSalary = allDatas.filter((el, i) => el.tipoRenda === "Salário" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'outubro')
      let sumValuesSalaryOut = outSalary.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Salário de novembro e a soma total do valores
      let novSalary = allDatas.filter((el, i) => el.tipoRenda === "Salário" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'novembro')
      let sumValuesSalaryNov = novSalary.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Salário de dezembro e a soma total do valores
      let dezSalary = allDatas.filter((el, i) => el.tipoRenda === "Salário" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'dezembro')
      let sumValuesSalaryDez = dezSalary.reduce((total, el) => total + el.valorRenda, 0)

      // Presente
      // Traz os dados de Presente de janeiro e a soma total do valores
      let janGift = allDatas.filter((el, i) => el.tipoRenda === "Presente" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'janeiro')
      let sumValuesGiftJan = janGift.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Presente de fevereiro e a soma total do valores
      let FevGift = allDatas.filter((el, i) => el.tipoRenda === "Presente" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'fevereiro')
      let sumValuesGiftFev = FevGift.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Presente de março e a soma total do valores
      let marGift = allDatas.filter((el, i) => el.tipoRenda === "Presente" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'março')
      let sumValuesGiftMar = marGift.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Presente de abril e a soma total do valores
      let abrGift = allDatas.filter((el, i) => el.tipoRenda === "Presente" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'abril')
      let sumValuesGiftAbr = abrGift.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Presente de maio e a soma total do valores
      let mayGift = allDatas.filter((el, i) => el.tipoRenda === "Presente" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'maio')
      let sumValuesGiftMay = mayGift.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Presente de junho e a soma total do valores
      let junGift = allDatas.filter((el, i) => el.tipoRenda === "Presente" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'junho')
      let sumValuesGiftJun = junGift.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Presente de julho e a soma total do valores
      let julGift = allDatas.filter((el, i) => el.tipoRenda === "Presente" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'julho')
      let sumValuesGiftJul = julGift.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Presente de agosto e a soma total do valores
      let agoGift = allDatas.filter((el, i) => el.tipoRenda === "Presente" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'agosto')
      let sumValuesGiftAgo = agoGift.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Presente de setembro e a soma total do valores
      let setGift = allDatas.filter((el, i) => el.tipoRenda === "Presente" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'setembro')
      let sumValuesGiftSet = setGift.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Presente de outubro e a soma total do valores
      let outGift = allDatas.filter((el, i) => el.tipoRenda === "Presente" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'outubro')
      let sumValuesGiftOut = outGift.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Presente de novembro e a soma total do valores
      let novGift = allDatas.filter((el, i) => el.tipoRenda === "Presente" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'novembro')
      let sumValuesGiftNov = novGift.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Presente de dezembro e a soma total do valores
      let dezGift = allDatas.filter((el, i) => el.tipoRenda === "Presente" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'dezembro')
      let sumValuesGiftDez = dezGift.reduce((total, el) => total + el.valorRenda, 0)

      // Serviços
      // Traz os dados de Serviços de janeiro e a soma total do valores
      let janServices = allDatas.filter((el, i) => el.tipoRenda === "Serviços" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'janeiro')
      let sumValuesServicesJan = janServices.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Serviços de fevereiro e a soma total do valores
      let FevServices = allDatas.filter((el, i) => el.tipoRenda === "Serviços" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'fevereiro')
      let sumValuesServicesFev = FevServices.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Serviços de março e a soma total do valores
      let marServices = allDatas.filter((el, i) => el.tipoRenda === "Serviços" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'março')
      let sumValuesServicesMar = marServices.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Serviços de abril e a soma total do valores
      let abrServices = allDatas.filter((el, i) => el.tipoRenda === "Serviços" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'abril')
      let sumValuesServicesAbr = abrServices.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Serviços de maio e a soma total do valores
      let mayServices = allDatas.filter((el, i) => el.tipoRenda === "Serviços" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'maio')
      let sumValuesServicesMay = mayServices.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Serviços de junho e a soma total do valores
      let junServices = allDatas.filter((el, i) => el.tipoRenda === "Serviços" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'junho')
      let sumValuesServicesJun = junServices.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Serviços de julho e a soma total do valores
      let julServices = allDatas.filter((el, i) => el.tipoRenda === "Serviços" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'julho')
      let sumValuesServicesJul = julServices.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Serviços de agosto e a soma total do valores
      let agoServices = allDatas.filter((el, i) => el.tipoRenda === "Serviços" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'agosto')
      let sumValuesServicesAgo = agoServices.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Serviços de setembro e a soma total do valores
      let setServices = allDatas.filter((el, i) => el.tipoRenda === "Serviços" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'setembro')
      let sumValuesServicesSet = setServices.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Serviços de outubro e a soma total do valores
      let outServices = allDatas.filter((el, i) => el.tipoRenda === "Serviços" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'outubro')
      let sumValuesServicesOut = outServices.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Serviços de novembro e a soma total do valores
      let novServices = allDatas.filter((el, i) => el.tipoRenda === "Serviços" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'novembro')
      let sumValuesServicesNov = novServices.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Serviços de dezembro e a soma total do valores
      let dezServices = allDatas.filter((el, i) => el.tipoRenda === "Serviços" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'dezembro')
      let sumValuesServicesDez = dezServices.reduce((total, el) => total + el.valorRenda, 0)

      // Outros
      // Traz os dados de Outros de janeiro e a soma total do valores
      let janOthes = allDatas.filter((el, i) => el.tipoRenda === "Outros" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'janeiro')
      let sumValuesOthesJan = janOthes.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Outros de fevereiro e a soma total do valores
      let FevOthes = allDatas.filter((el, i) => el.tipoRenda === "Outros" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'fevereiro')
      let sumValuesOthesFev = FevOthes.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Outros de março e a soma total do valores
      let marOthes = allDatas.filter((el, i) => el.tipoRenda === "Outros" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'março')
      let sumValuesOthesMar = marOthes.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Outros de abril e a soma total do valores
      let abrOthes = allDatas.filter((el, i) => el.tipoRenda === "Outros" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'abril')
      let sumValuesOthesAbr = abrOthes.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Outros de maio e a soma total do valores
      let mayOthes = allDatas.filter((el, i) => el.tipoRenda === "Outros" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'maio')
      let sumValuesOthesMay = mayOthes.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Outros de junho e a soma total do valores
      let junOthes = allDatas.filter((el, i) => el.tipoRenda === "Outros" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'junho')
      let sumValuesOthesJun = junOthes.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Outros de julho e a soma total do valores
      let julOthes = allDatas.filter((el, i) => el.tipoRenda === "Outros" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'julho')
      let sumValuesOthesJul = julOthes.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Outros de agosto e a soma total do valores
      let agoOthes = allDatas.filter((el, i) => el.tipoRenda === "Outros" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'agosto')
      let sumValuesOthesAgo = agoOthes.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Outros de setembro e a soma total do valores
      let setOthes = allDatas.filter((el, i) => el.tipoRenda === "Outros" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'setembro')
      let sumValuesOthesSet = setOthes.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Outros de outubro e a soma total do valores
      let outOthes = allDatas.filter((el, i) => el.tipoRenda === "Outros" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'outubro')
      let sumValuesOthesOut = outOthes.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Outros de novembro e a soma total do valores
      let novOthes = allDatas.filter((el, i) => el.tipoRenda === "Outros" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'novembro')
      let sumValuesOthesNov = novOthes.reduce((total, el) => total + el.valorRenda, 0)

      // Traz os dados de Outros de dezembro e a soma total do valores
      let dezOthes = allDatas.filter((el, i) => el.tipoRenda === "Outros" && new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }) == 'dezembro')
      let sumValuesOthesDez = dezOthes.reduce((total, el) => total + el.valorRenda, 0)

      let allMonthRentObj = [
        { mes: 'janeiro', valor: sumValuesRentJan },
        { mes: 'fevereiro', valor: sumValuesRentFev },
        { mes: 'março', valor: sumValuesRentMar },
        { mes: 'abril', valor: sumValuesRentAbr },
        { mes: 'maio', valor: sumValuesRentMay },
        { mes: 'junho', valor: sumValuesRentJun },
        { mes: 'julho', valor: sumValuesRentJul },
        { mes: 'agosto', valor: sumValuesRentAgo },
        { mes: 'setembro', valor: sumValuesRentSet },
        { mes: 'outubro', valor: sumValuesRentOut },
        { mes: 'novembro', valor: sumValuesRentNov },
        { mes: 'dezembro', valor: sumValuesRentDez }
      ]

      let allMonthSalaryObj = [
        { mes: 'janeiro', valor: sumValuesSalaryJan },
        { mes: 'fevereiro', valor: sumValuesSalaryFev },
        { mes: 'março', valor: sumValuesSalaryMar },
        { mes: 'abril', valor: sumValuesSalaryAbr },
        { mes: 'maio', valor: sumValuesSalaryMay },
        { mes: 'junho', valor: sumValuesSalaryJun },
        { mes: 'julho', valor: sumValuesSalaryJul },
        { mes: 'agosto', valor: sumValuesSalaryAgo },
        { mes: 'setembro', valor: sumValuesSalarySet },
        { mes: 'outubro', valor: sumValuesSalaryOut },
        { mes: 'novembro', valor: sumValuesSalaryNov },
        { mes: 'dezembro', valor: sumValuesSalaryDez }
      ]

      let allMonthGiftObj = [
        { mes: 'janeiro', valor: sumValuesGiftJan },
        { mes: 'fevereiro', valor: sumValuesGiftFev },
        { mes: 'março', valor: sumValuesGiftMar },
        { mes: 'abril', valor: sumValuesGiftAbr },
        { mes: 'maio', valor: sumValuesGiftMay },
        { mes: 'junho', valor: sumValuesGiftJun },
        { mes: 'julho', valor: sumValuesGiftJul },
        { mes: 'agosto', valor: sumValuesGiftAgo },
        { mes: 'setembro', valor: sumValuesGiftSet },
        { mes: 'outubro', valor: sumValuesGiftOut },
        { mes: 'novembro', valor: sumValuesGiftNov },
        { mes: 'dezembro', valor: sumValuesGiftDez }
      ]

      let allMonthServicesObj = [
        { mes: 'janeiro', valor: sumValuesServicesJan },
        { mes: 'fevereiro', valor: sumValuesServicesFev },
        { mes: 'março', valor: sumValuesServicesMar },
        { mes: 'abril', valor: sumValuesServicesAbr },
        { mes: 'maio', valor: sumValuesServicesMay },
        { mes: 'junho', valor: sumValuesServicesJun },
        { mes: 'julho', valor: sumValuesServicesJul },
        { mes: 'agosto', valor: sumValuesServicesAgo },
        { mes: 'setembro', valor: sumValuesServicesSet },
        { mes: 'outubro', valor: sumValuesServicesOut },
        { mes: 'novembro', valor: sumValuesServicesNov },
        { mes: 'dezembro', valor: sumValuesServicesDez }
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

      // Junta todos os valores de cada renda em um so array
      let totalMonth: any[] = []
      totalMonth.push(allMonthRentObj, allMonthSalaryObj, allMonthGiftObj, allMonthServicesObj, allMonthOthesObj)

      let monthSalary: any[] = []
      let monthServices: any[] = []
      let monthGift: any[] = []
      let monthOthes: any[] = []
      let monthRent: any[] = []
      let totalValue: any[] = []
      let monthGraph: any[] = []
      // TODO tira os monthGraph
      // Adiciona os valores em um array de cada tipo de renda
      for (let index = 0; index < uniqueDates.length; index++) {

        allMonthRentObj.forEach((el) => {
          if (el.mes === uniqueDates[index]) {
            monthGraph.push(el.mes)
            monthRent.push(el.valor)

          }

        })

        allMonthSalaryObj.forEach((el) => {
          if (el.mes === uniqueDates[index]) {
            monthGraph.push(el.mes)
            monthSalary.push(el.valor)
          }

        })

        allMonthGiftObj.forEach((el) => {
          if (el.mes === uniqueDates[index]) {
            monthGraph.push(el.mes)
            monthGift.push(el.valor)
          }

        })

        allMonthServicesObj.forEach((el) => {
          if (el.mes === uniqueDates[index]) {
            monthGraph.push(el.mes)
            monthServices.push(el.valor)
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

      this.barGraphIncome = {
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
            name: 'Salário',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: monthSalary
          },
          {
            name: 'Serviços',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: monthServices
          },
          {
            name: 'Presente',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: monthGift
          },
          {
            name: 'Aluguel',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: monthRent
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
