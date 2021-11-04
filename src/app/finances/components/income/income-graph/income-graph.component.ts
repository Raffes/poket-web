import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Income } from 'src/app/finances/modal/income';
import { IncomeService } from 'src/app/finances/services/income.service';
import { ModalWalletCrudService } from 'src/app/finances/services/wallet-crud-modal.service';
import { WalletService } from 'src/app/finances/services/wallet.service';
@Component({
  selector: 'app-income-graph',
  templateUrl: './income-graph.component.html',
  styleUrls: ['./income-graph.component.css']
})
export class IncomeGraphComponent implements OnInit {
  Income: any;
  valor: any
  allValues: {} = {}
  quantidadeRegistro: any
  tiposRendaDados: any[] = []
  chartOption: any

  constructor(
    public walletService: WalletService,
    public incomeService: IncomeService,
    public ModalWalletService: ModalWalletCrudService,
    public authService: AuthService,
    public formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.getData()
  }

  getData() {
    let horario = "T00:00:00-0300"
    this.incomeService.getIncomeList(this.authService.userData.uid).subscribe(res => {
      
      // Pegar todos os dados de renda
      let allDatas = res.map((el) => el.payload.doc.data())

      // Meses
      let allValuesDate = res.map((el) => new Date(el.payload.doc.data().dataRenda + horario).toLocaleString('default', { month: 'long' }));
      let uniqueDates = allValuesDate.filter((el, i) => allValuesDate.indexOf(el) === i)

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

      let totalMonth: any[] = []
      totalMonth.push(allMonthRentObj, allMonthSalaryObj, allMonthGiftObj, allMonthServicesObj, allMonthOthesObj)

      // totalMonth.filter((el, k) => el[k].mes === )

// console.log(totalMonth)

      let monthSalary: any[] = [] 
      let monthServices: any[] = [] 
      let monthGift: any[] = [] 
      let monthOthes: any[] = [] 
      let monthRent: any[] = []
      let totalValue: any[] = []

      for (let index = 0; index < uniqueDates.length; index++) {
        
        allMonthRentObj.forEach((el) => {
          if (el.mes === uniqueDates[index]) {
            monthRent.push(el.valor)
          }
          
        })

        allMonthSalaryObj.forEach((el) => {
          if (el.mes === uniqueDates[index]) {
            monthSalary.push(el.valor)
          }
          
        })

        allMonthGiftObj.forEach((el) => {
          if (el.mes === uniqueDates[index]) {
            monthGift.push(el.valor)
          }
          
        })

        allMonthServicesObj.forEach((el) => {
          if (el.mes === uniqueDates[index]) {
            monthServices.push(el.valor)
          }
          
        })

        allMonthOthesObj.forEach((el) => {
          if (el.mes === uniqueDates[index]) {
            monthOthes.push(el.valor)
          }
          
        })
//TODO ccontinuar fazendo o total
       totalMonth.forEach((el, k) => {
         if(el[k].mes === uniqueDates[index]){
          totalValue.push(el[k].valor)
         }
         
        })
      }

      console.warn(totalValue)

      this.chartOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: uniqueDates
        },
        series: [
          {
            name: 'Total',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            // TODO Se não encontrar nenhum somaValorRenda coloque 0
            // 320 = setembro | 302 = outubro
            data: [0, 0]
          },
          {
            name: 'Salário',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: monthSalary
          },
          {
            name: 'Serviços',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: monthServices
          },
          {
            name: 'Presente',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: monthGift
          },
          {
            name: 'Aluguel',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: monthRent
          },
          {
            name: 'Outros',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: monthOthes
          }
        ]
      };


    })

  }
}

