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

  quantidadeRegistro: any
  tiposRendaDados: any[] = []

  // rendaTipo: any

  // rendaTipo!: {
  //   mes: any,
  //   tipo: any;
  //   somaTotal: any;
  //   valores: any;
  // };

  rendaTipo: any ={
    // mesJan: any,
    // mesFev: any, 
    // mesAbr: any, 
    // mesMar: any, 
    // mesMay: any, 
    // mesJun: any, 
    // mesJul: any, 
    // mesAgu: any, 
    // mesSet: any, 
    // mesOut: any, 
    // mesNov: any, 
    // mesDez : any
  };

  constructor(
    public walletService: WalletService,
    public incomeService: IncomeService,
    public ModalWalletService: ModalWalletCrudService,
    public authService: AuthService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    // this.totalEachIncome()
    // this.listIncome()
    this.getData()
    // this.getIncomeType()
  }

  chartOption: any

  getData() {
    let horario = "T00:00:00-0300"
    let data: any[] = []
    let tipoRendaArray: any[] = []
    let quantidadeRegistro: number
    let tiposRendaDados: any[] = []

    let tipoRendaSalario: any[] = []
    let tipoRendaServicos: any[] = []
    let tipoRendaPresente: any[] = []
    let tipoRendaAluguel: any[] = []
    let tipoRendaOutros: any[] = []

    let valoresRendaSalario: any[] = []
    let valoresRendaServicos: any[] = []
    let valoresRendaPresente: any[] = []
    let valoresRendaAluguel: any[] = []
    let valoresRendaOutros: any[] = []

    let somaTotalRendaSalario: any;
    let somaTotalRendaServicos: any[] = []
    let somaTotalRendaPresente: any[] = []
    let somaTotalRendaAluguel: any[] = []
    let somaTotalRendaOutros: any[] = []

    let dataRendaSalario: any[] = []
    let dataRendaServicos: any[] = []
    let dataRendaPresente: any[] = []
    let dataRendaAluguel: any[] = []
    let dataRendaOutros: any[] = []

    this.incomeService.getIncomeList(this.authService.userData.uid).subscribe(res => {
      res.forEach((doc) => {
        tipoRendaArray.push(doc.payload.doc.data().tipoRenda)
        data.push(doc.payload.doc.data())

      });

      quantidadeRegistro = res.length

      tiposRendaDados = tipoRendaArray.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      });


      let tipoRendaJan: any[] = []
      let valoresRendaJan: any[] = []
      let somaTotalRendaJan: any[] = []
      let rendaJan

      let tipoRendaFev: any[] = []
      let valoresRendaFev: any[] = []
      let somaTotalRendaFev: any[] = []
      let rendaFev

      let tipoRendaMar: any[] = []
      let valoresRendaMar: any[] = []
      let somaTotalRendaMar: any[] = []
      let rendaMar

      let tipoRendaAbr: any[] = []
      let valoresRendaAbr: any[] = []
      let somaTotalRendaAbr: any[] = []
      let rendaAbr

      let tipoRendaMay: any[] = []
      let valoresRendaMay: any[] = []
      let somaTotalRendaMay: any[] = []
      let rendaMay

      let tipoRendaJun: any[] = []
      let valoresRendaJun: any[] = []
      let somaTotalRendaJun: any[] = []
      let rendaJun

      let tipoRendaJul: any[] = []
      let valoresRendaJul: any[] = []
      let somaTotalRendaJul: any[] = []
      let rendaJul

      let tipoRendaAgu: any[] = []
      let valoresRendaAgu: any[] = []
      let somaTotalRendaAgu: any[] = []
      let rendaAgu

      let tipoRendaSet: any[] = []
      let valoresRendaSet: any[] = []
      let somaTotalRendaSet: any[] = []
      let rendaSet

      let tipoRendaOut: any[] = []
      let valoresRendaOut: any[] = []
      let somaTotalRendaOut: any[] = []
      let rendaOut

      let tipoRendaNov: any[] = []
      let valoresRendaNov: any[] = []
      let somaTotalRendaNov: any[] = []
      let rendaNov

      let tipoRendaDez: any[] = []
      let valoresRendaDez: any[] = []
      let somaTotalRendaDez: any[] = []
      let rendaDez

      data.forEach(el => {

        switch (new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' })) {
          case 'janeiro':
            // console.log(el)

            tipoRendaJan.push(el.tipoRenda)
            valoresRendaJan.push(el.valorRenda)
            somaTotalRendaJan = valoresRendaJan.reduce((a, b) => a + b)

            rendaJan =
              [{
                mes: new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }),
                tipo: tipoRendaJan,
                valores: valoresRendaJan,
                somaTotal: somaTotalRendaJan

              }]

            break;
          case 'fevereiro':
            // console.log(el)

            tipoRendaFev.push(el.tipoRenda)
            valoresRendaFev.push(el.valorRenda)
            somaTotalRendaFev = valoresRendaFev.reduce((a, b) => a + b)

            rendaFev =
              [{
                mes: new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }),
                tipo: tipoRendaFev,
                valores: valoresRendaFev,
                somaTotal: somaTotalRendaFev

              }]

            break;
          case 'março':
            // console.log(el)

            tipoRendaMar.push(el.tipoRenda)
            valoresRendaMar.push(el.valorRenda)
            somaTotalRendaMar = valoresRendaMar.reduce((a, b) => a + b)

            rendaMar =
              [{
                mes: new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }),
                tipo: tipoRendaMar,
                valores: valoresRendaMar,
                somaTotal: somaTotalRendaMar

              }]

            break;
          case 'abril':
            // console.log(el)

            tipoRendaAbr.push(el.tipoRenda)
            valoresRendaAbr.push(el.valorRenda)
            somaTotalRendaAbr = valoresRendaAbr.reduce((a, b) => a + b)

            rendaAbr =
              [{
                mes: new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }),
                tipo: tipoRendaAbr,
                valores: valoresRendaAbr,
                somaTotal: somaTotalRendaAbr

              }]

            break;
          case 'maio':
            // console.log(el)

              tipoRendaMay.push(el.tipoRenda)
              valoresRendaMay.push(el.valorRenda)
              somaTotalRendaMay = valoresRendaMay.reduce((a, b) => a + b)
  
              rendaMay =
                [{
                  mes: new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }),
                  tipo: tipoRendaMay,
                  valores: valoresRendaMay,
                  somaTotal: somaTotalRendaMay
  
                }]

            break;
          case 'junho':
            // console.log(el)

            tipoRendaJun.push(el.tipoRenda)
            valoresRendaJun.push(el.valorRenda)
            somaTotalRendaJun = valoresRendaJun.reduce((a, b) => a + b)

            rendaJun =
              [{
                mes: new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }),
                tipo: tipoRendaJun,
                valores: valoresRendaJun,
                somaTotal: somaTotalRendaJun

              }]

            break;
          case 'julho':
            // console.log(el)

            tipoRendaJul.push(el.tipoRenda)
            valoresRendaJul.push(el.valorRenda)
            somaTotalRendaJul = valoresRendaJul.reduce((a, b) => a + b)

            rendaJul =
              [{
                mes: new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }),
                tipo: tipoRendaJul,
                valores: valoresRendaJul,
                somaTotal: somaTotalRendaJul

              }]

            break;
          case 'agosto':
            // console.log(el)

            tipoRendaAgu.push(el.tipoRenda)
            valoresRendaAgu.push(el.valorRenda)
            somaTotalRendaAgu = valoresRendaAgu.reduce((a, b) => a + b)

            rendaAgu =
              [{
                mes: new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }),
                tipo: tipoRendaAgu,
                valores: valoresRendaAgu,
                somaTotal: somaTotalRendaAgu

              }]

            break;
          case 'setembro':
            // console.log(el)

            tipoRendaSet.push(el.tipoRenda)
            valoresRendaSet.push(el.valorRenda)
            somaTotalRendaSet = valoresRendaSet.reduce((a, b) => a + b)

            rendaSet =
              [{
                mes: new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }),
                tipo: tipoRendaSet,
                valores: valoresRendaSet,
                somaTotal: somaTotalRendaSet

              }]

            break;
          case 'outubro':
            // console.log(el)

            tipoRendaOut.push(el.tipoRenda)
            valoresRendaOut.push(el.valorRenda)
            somaTotalRendaOut = valoresRendaOut.reduce((a, b) => a + b)

            rendaOut =
              [{
                mes: new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }),
                tipo: tipoRendaOut,
                valores: valoresRendaOut,
                somaTotal: somaTotalRendaOut

              }]

            break;
          case 'novembro':
            // console.log(el)

            tipoRendaNov.push(el.tipoRenda)
            valoresRendaNov.push(el.valorRenda)
            somaTotalRendaNov = valoresRendaNov.reduce((a, b) => a + b)

            rendaNov =
              [{
                mes: new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }),
                tipo: tipoRendaNov,
                valores: valoresRendaNov,
                somaTotal: somaTotalRendaNov

              }]

            break;
          case 'dezembro':
            // console.log(el)

            tipoRendaDez.push(el.tipoRenda)
            valoresRendaDez.push(el.valorRenda)
            somaTotalRendaDez = valoresRendaDez.reduce((a, b) => a + b)

            rendaDez =
              [{
                mes: new Date(el.dataRenda + horario).toLocaleString('default', { month: 'long' }),
                tipo: tipoRendaDez,
                valores: valoresRendaDez,
                somaTotal: somaTotalRendaDez

              }]

            break;
          // default:
          //   console.error("Deu ruim nas datas")

        }

      })

      // console.warn(rendaJan)
      // console.warn(rendaFev)
      // console.warn(rendaAbr)
      // console.warn(rendaMar)
      // console.warn(rendaMay)
      // console.warn(rendaJun)
      // console.warn(rendaJul)
      // console.warn(rendaAgu)
      // console.warn(rendaSet)
      // console.warn(rendaOut)
      // console.warn(rendaNov)
      // console.warn(rendaDez)



      // let tipoRendaSalarioJan = dadosJan.filter(propriety => propriety.tipoRenda == "Salário");
      // let tipoRendaServicosJan = dadosJan.filter(propriety => propriety.tipoRenda == "Serviços");
      // let tipoRendaPresentejan = dadosJan.filter(propriety => propriety.tipoRenda == "Presente");
      // let tipoRendaAluguelJan = dadosJan.filter(propriety => propriety.tipoRenda == "Aluguel");
      // let tipoRendaOutrosJan = dadosJan.filter(propriety => propriety.tipoRenda == "Outros");

      // let tipoRendaSalarioFev = dadosFev.filter(propriety => propriety.tipoRenda == "Salário");
      // let tipoRendaServicosFev = dadosFev.filter(propriety => propriety.tipoRenda == "Serviços");
      // let tipoRendaPresenteFev = dadosFev.filter(propriety => propriety.tipoRenda == "Presente");
      // let tipoRendaAluguelFev = dadosFev.filter(propriety => propriety.tipoRenda == "Aluguel");
      // let tipoRendaOutrosFev = dadosFev.filter(propriety => propriety.tipoRenda == "Outros");

      // let tipoRendaSalarioMar = dadosMar.filter(propriety => propriety.tipoRenda == "Salário");
      // let tipoRendaServicosMar = dadosMar.filter(propriety => propriety.tipoRenda == "Serviços");
      // let tipoRendaPresenteMar = dadosMar.filter(propriety => propriety.tipoRenda == "Presente");
      // let tipoRendaAluguelMar= dadosMar.filter(propriety => propriety.tipoRenda == "Aluguel");
      // let tipoRendaOutrosMar = dadosMar.filter(propriety => propriety.tipoRenda == "Outros");

      // let tipoRendaSalarioAbr = dadosAbr.filter(propriety => propriety.tipoRenda == "Salário");
      // let tipoRendaServicosAbr = dadosAbr.filter(propriety => propriety.tipoRenda == "Serviços");
      // let tipoRendaPresenteAbr = dadosAbr.filter(propriety => propriety.tipoRenda == "Presente");
      // let tipoRendaAluguelAbr = dadosAbr.filter(propriety => propriety.tipoRenda == "Aluguel");
      // let tipoRendaOutrosAbr = dadosAbr.filter(propriety => propriety.tipoRenda == "Outros");

      // let tipoRendaSalarioFev = dadosMay.filter(propriety => propriety.tipoRenda == "Salário");
      // let tipoRendaServicosFev = dadosMay.filter(propriety => propriety.tipoRenda == "Serviços");
      // let tipoRendaPresenteFev = dadosMay.filter(propriety => propriety.tipoRenda == "Presente");
      // let tipoRendaAluguelFev = dadosMay.filter(propriety => propriety.tipoRenda == "Aluguel");
      // let tipoRendaOutrosFev = dadosMay.filter(propriety => propriety.tipoRenda == "Outros");

      // let tipoRendaSalarioFev = dadosJun.filter(propriety => propriety.tipoRenda == "Salário");
      // let tipoRendaServicosFev = dadosJun.filter(propriety => propriety.tipoRenda == "Serviços");
      // let tipoRendaPresenteFev = dadosJun.filter(propriety => propriety.tipoRenda == "Presente");
      // let tipoRendaAluguelFev = dadosJun.filter(propriety => propriety.tipoRenda == "Aluguel");
      // let tipoRendaOutrosFev = dadosJun.filter(propriety => propriety.tipoRenda == "Outros");

      // let tipoRendaSalarioFev = dadosJul.filter(propriety => propriety.tipoRenda == "Salário");
      // let tipoRendaServicosFev = dadosJul.filter(propriety => propriety.tipoRenda == "Serviços");
      // let tipoRendaPresenteFev = dadosJul.filter(propriety => propriety.tipoRenda == "Presente");
      // let tipoRendaAluguelFev = dadosJul.filter(propriety => propriety.tipoRenda == "Aluguel");
      // let tipoRendaOutrosFev = dadosJul.filter(propriety => propriety.tipoRenda == "Outros");

      // let tipoRendaSalarioFev = dadosAgu.filter(propriety => propriety.tipoRenda == "Salário");
      // let tipoRendaServicosFev = dadosAgu.filter(propriety => propriety.tipoRenda == "Serviços");
      // let tipoRendaPresenteFev = dadosAgu.filter(propriety => propriety.tipoRenda == "Presente");
      // let tipoRendaAluguelFev = dadosAgu.filter(propriety => propriety.tipoRenda == "Aluguel");
      // let tipoRendaOutrosFev = dadosAgu.filter(propriety => propriety.tipoRenda == "Outros");

      // let tipoRendaSalarioFev = dadosSet.filter(propriety => propriety.tipoRenda == "Salário");
      // let tipoRendaServicosFev = dadosSet.filter(propriety => propriety.tipoRenda == "Serviços");
      // let tipoRendaPresenteFev = dadosSet.filter(propriety => propriety.tipoRenda == "Presente");
      // let tipoRendaAluguelFev = dadosSet.filter(propriety => propriety.tipoRenda == "Aluguel");
      // let tipoRendaOutrosFev = dadosSet.filter(propriety => propriety.tipoRenda == "Outros");

      // let tipoRendaSalarioFev = dadosOut.filter(propriety => propriety.tipoRenda == "Salário");
      // let tipoRendaServicosFev = dadosOut.filter(propriety => propriety.tipoRenda == "Serviços");
      // let tipoRendaPresenteFev = dadosOut.filter(propriety => propriety.tipoRenda == "Presente");
      // let tipoRendaAluguelFev = dadosOut.filter(propriety => propriety.tipoRenda == "Aluguel");
      // let tipoRendaOutrosFev = dadosOut.filter(propriety => propriety.tipoRenda == "Outros");

      // let tipoRendaSalarioFev = dadosNov.filter(propriety => propriety.tipoRenda == "Salário");
      // let tipoRendaServicosFev = dadosNov.filter(propriety => propriety.tipoRenda == "Serviços");
      // let tipoRendaPresenteFev = dadosNov.filter(propriety => propriety.tipoRenda == "Presente");
      // let tipoRendaAluguelFev = dadosNov.filter(propriety => propriety.tipoRenda == "Aluguel");
      // let tipoRendaOutrosFev = dadosNov.filter(propriety => propriety.tipoRenda == "Outros");

      // let tipoRendaSalarioFev = dadosDez.filter(propriety => propriety.tipoRenda == "Salário");
      // let tipoRendaServicosFev = dadosDez.filter(propriety => propriety.tipoRenda == "Serviços");
      // let tipoRendaPresenteFev = dadosDez.filter(propriety => propriety.tipoRenda == "Presente");
      // let tipoRendaAluguelFev = dadosDez.filter(propriety => propriety.tipoRenda == "Aluguel");
      // let tipoRendaOutrosFev = dadosDez.filter(propriety => propriety.tipoRenda == "Outros");




      // Tipos de rendas  
      tipoRendaSalario = data.filter(propriety => propriety.tipoRenda == "Salário");
      tipoRendaServicos = data.filter(propriety => propriety.tipoRenda == "Serviços");
      tipoRendaPresente = data.filter(propriety => propriety.tipoRenda == "Presente");
      tipoRendaAluguel = data.filter(propriety => propriety.tipoRenda == "Aluguel");
      tipoRendaOutros = data.filter(propriety => propriety.tipoRenda == "Outros");

      // valores de cada tipo de renda
      tipoRendaSalario.forEach(propriety => {
        valoresRendaSalario.push(propriety.valorRenda)

        dataRendaSalario.push(new Date(propriety.dataRenda + horario).toLocaleString('default', { month: 'long' }))

        if (valoresRendaSalario != null) {
          somaTotalRendaSalario = valoresRendaSalario.reduce((a, b) => a + b);
        }
      });

      tipoRendaServicos.forEach(propriety => {
        valoresRendaServicos.push(propriety.valorRenda)

        dataRendaServicos.push(new Date(propriety.dataRenda + horario).toLocaleString('default', { month: 'long' }))

        if (valoresRendaServicos != null) {
          somaTotalRendaServicos = valoresRendaServicos.reduce((a, b) => a + b);
        }
      });
      tipoRendaPresente.forEach(propriety => {
        valoresRendaPresente.push(propriety.valorRenda)

        dataRendaPresente.push(new Date(propriety.dataRenda + horario).toLocaleString('default', { month: 'long' }))

        if (valoresRendaPresente != null) {
          somaTotalRendaPresente = valoresRendaPresente.reduce((a, b) => a + b);
        }
      });
      tipoRendaAluguel.forEach(propriety => {
        valoresRendaAluguel.push(propriety.valorRenda)

        dataRendaAluguel.push(new Date(propriety.dataRenda + horario).toLocaleString('default', { month: 'long' }))

        if (valoresRendaAluguel != null) {
          somaTotalRendaAluguel = valoresRendaAluguel.reduce((a, b) => a + b);
        }
      });
      tipoRendaOutros.forEach(propriety => {
        valoresRendaOutros.push(propriety.valorRenda)

        dataRendaOutros.push(new Date(propriety.dataRenda + horario).toLocaleString('default', { month: 'long' }))

        if (valoresRendaOutros != null) {
          somaTotalRendaOutros = valoresRendaOutros.reduce((a, b) => a + b);
        }
      });

      // Não duplicar os meses vindo dos registros
      dataRendaSalario = dataRendaSalario.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      });

      let rendaSalario =
        [{

          mes: dataRendaSalario,
          tipo: tipoRendaSalario[0] !== undefined ? tipoRendaSalario[0].tipoRenda : [],
          somaTotal: somaTotalRendaSalario,
          valores: valoresRendaSalario
        }]

      let rendaServicos =
        [{
          mes: dataRendaServicos,
          tipo: tipoRendaServicos[0] !== undefined ? tipoRendaServicos[0].tipoRenda : [],
          somaTotal: somaTotalRendaServicos,
          valores: valoresRendaServicos
        }]

      let rendaPresente =
        [{
          mes: dataRendaPresente,
          tipo: tipoRendaPresente[0] !== undefined ? tipoRendaPresente[0].tipoRenda : [],
          somaTotal: somaTotalRendaPresente,
          valores: valoresRendaPresente
        }]

      let rendaAluguel =
        [{
          mes: dataRendaAluguel,
          tipo: tipoRendaAluguel[0] !== undefined ? tipoRendaAluguel[0].tipoRenda : [],
          somaTotal: somaTotalRendaAluguel,
          valores: valoresRendaAluguel
        }]

      let rendaOutros =
        [{
          mes: dataRendaOutros,
          tipo: tipoRendaOutros[0] !== undefined ? tipoRendaOutros[0].tipoRenda : [],
          somaTotal: somaTotalRendaOutros,
          valores: valoresRendaOutros
        }]
      let rendaTodosTipo: any[] = []
      let rendaTodosMes = rendaSalario[0].mes.concat(rendaServicos[0].mes, rendaPresente[0].mes, rendaAluguel[0].mes, rendaOutros[0].mes)

      rendaTodosMes = rendaTodosMes.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      });

      rendaTodosTipo = [rendaSalario[0].tipo, rendaServicos[0].tipo, rendaPresente[0].tipo, rendaAluguel[0].tipo, rendaOutros[0].tipo]

      rendaTodosTipo = rendaTodosTipo.filter(function (el: any) {
        return el.length !== 0 && el != 'Outros'
      })

      let rendaTodosSomaTotal = [rendaSalario[0].somaTotal, rendaServicos[0].somaTotal, rendaPresente[0].somaTotal, rendaAluguel[0].somaTotal, rendaOutros[0].somaTotal]

      rendaTodosSomaTotal = rendaTodosSomaTotal.filter(function (el: any) {
        return el.length !== 0
      })

      let rendaTodosValores = [rendaSalario[0].valores, rendaServicos[0].valores, rendaPresente[0].valores, rendaAluguel[0].valores, rendaOutros[0].valores]
      rendaTodosValores = rendaTodosValores.filter(function (el: any) {
        return el.length !== 0
      })


      let todosMeses = [
      rendaJan !== undefined ? rendaJan : []
      ,rendaFev !== undefined ? rendaFev : []
      ,rendaAbr !== undefined ? rendaAbr : []
      ,rendaMar !== undefined ? rendaMar : []
      ,rendaMay !== undefined ? rendaMay : []
      ,rendaJun !== undefined ? rendaJun : []
      ,rendaJul !== undefined ? rendaJul : []
      ,rendaAgu !== undefined ? rendaAgu : []
      ,rendaSet !== undefined ? rendaSet : []
      ,rendaOut !== undefined ? rendaOut : []
      ,rendaNov !== undefined ? rendaNov : []
      ,rendaDez !== undefined ? rendaDez : []
      ]


      // this.rendaTipo = {
      //   mes: rendaTodosMes,
      //   tipo: rendaTodosTipo !== undefined ? rendaTodosTipo : [],
      //   somaTotal: rendaTodosSomaTotal,
      //   valores: rendaTodosValores

      // }

      // this.rendaTipo = {
      //   mesJan: rendaJan !== undefined ? rendaJan : [0],
      //   mesFev: rendaFev !== undefined ? rendaFev : [0], 
      //   mesAbr: rendaAbr !== undefined ? rendaAbr : [0], 
      //   mesMar: rendaMar !== undefined ? rendaMar : [0],
      //   mesMay: rendaMay !== undefined ? rendaMay : [0], 
      //   mesJun: rendaJun !== undefined ? rendaJun : [0], 
      //   mesJul: rendaJul !== undefined ? rendaJul : [0], 
      //   mesAgu: rendaAgu !== undefined ? rendaAgu : [0], 
      //   mesSet: rendaSet !== undefined ? rendaSet : [0], 
      //   mesOut: rendaOut !== undefined ? rendaOut : [0],
      //   mesNov: rendaNov !== undefined ? rendaNov : [0], 
      //   mesDez:  rendaDez !== undefined ? rendaDez : [0]
      // }

      this.rendaTipo = {
        mesJan: rendaJan ,
        mesFev: rendaFev , 
        mesAbr: rendaAbr , 
        mesMar: rendaMar ,
        mesMay: rendaMay , 
        mesJun: rendaJun , 
        mesJul: rendaJul , 
        mesAgu: rendaAgu , 
        mesSet: rendaSet , 
        mesOut: rendaOut ,
        mesNov: rendaNov , 
        mesDez:  rendaDez 
      }

      // console.log(
      //   rendaJan !== undefined ? rendaJan : null,
      //   rendaFev !== undefined ? rendaFev : null, 
      //   rendaAbr !== undefined ? rendaAbr : null, 
      //   rendaMar !== undefined ? rendaMar : null,
      //   rendaMay !== undefined ? rendaMar : null, 
      //   rendaJun !== undefined ? rendaJun : null, 
      //   rendaJul !== undefined ? rendaJul : null, 
      //   rendaAgu !== undefined ? rendaAgu : null, 
      //   rendaSet !== undefined ? rendaSet : null, 
      //   rendaOut !== undefined ? rendaOut : null,
      //   rendaNov !== undefined ? rendaNov : null, 
      //    rendaDez !== undefined ? rendaDez : null
      // )

      // console.log(this.rendaTipo)
      // console.warn(rendaTodosMes)
      // console.warn(rendaTodosTipo)
      // console.warn(rendaTodosSomaTotal)
      // console.warn(rendaTodosValores)
      // console.warn(this.rendaTipo)
      // console.warn(rendaTodosSomaTotal)
      // console.info(this.rendaTipo[0].mes)


      Object.keys(this.rendaTipo).forEach((key) => (this.rendaTipo[key] == null || this.rendaTipo[key] == undefined) && delete this.rendaTipo[key]);
      console.log(this.rendaTipo)

      // Soma de todos os valores das rendas
      for (let i = 0; i < todosMeses.length; i++) {
        console.log(
          this.rendaTipo.mesJan
          // this.rendaTipo.mesJan[i].mes !== undefined ? this.rendaTipo.mesJan[i].mes : null, 
          // this.rendaTipo.mesFev[i].mes !== undefined ? this.rendaTipo.mesFev[i].mes : null,
          // this.rendaTipo.mesMar[i].mes !== undefined ? this.rendaTipo.mesMar[i].mes : null,
          // this.rendaTipo.mesAbr[i].mes !== undefined ? this.rendaTipo.mesAbr[i].mes : null,
          // this.rendaTipo.mesMay[i].mes !== undefined ? this.rendaTipo.mesMay[i].mes : null,
          // this.rendaTipo.mesJun[i].mes !== undefined ? this.rendaTipo.mesJun[i].mes : null,
          // this.rendaTipo.mesJul[i].mes !== undefined ? this.rendaTipo.mesJul[i].mes : null,
          // this.rendaTipo.mesAgu[i].mes !== undefined ? this.rendaTipo.mesAgu[i].mes : null,
          // this.rendaTipo.mesSet[i].mes !== undefined ? this.rendaTipo.mesSet[i].mes : null,
          // this.rendaTipo.mesOut[i].mes !== undefined ? this.rendaTipo.mesOut[i].mes : null,
          // this.rendaTipo.mesNov[i].mes !== undefined ? this.rendaTipo.mesNov[i].mes : null,
          // this.rendaTipo.mesDez[i].mes !== undefined ? this.rendaTipo.mesDez[i].mes : null
          )
      this.chartOption = {
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
            data: [
              // 'mesJan' in this.rendaTipo ? this.rendaTipo.mesJan[i].mes : null,
              // 'mesAbr' in this.rendaTipo ? this.rendaTipo.mesAbr[i].mes : null

              // this.rendaTipo.mesJan[i].mes !== undefined ? this.rendaTipo.mesJan[i].mes : null, 
          // this.rendaTipo.mesFev[i].mes !== undefined ? this.rendaTipo.mesFev[i].mes : null,
          // this.rendaTipo.mesMar[i].mes !== undefined ? this.rendaTipo.mesMar[i].mes : null,
          // this.rendaTipo.mesAbr[i].mes !== undefined ? this.rendaTipo.mesAbr[i].mes : null,
          // this.rendaTipo.mesMay[i].mes !== undefined ? this.rendaTipo.mesMay[i].mes : null,
          // this.rendaTipo.mesJun[i].mes !== undefined ? this.rendaTipo.mesJun[i].mes : null,
          // this.rendaTipo.mesJul[i].mes !== undefined ? this.rendaTipo.mesJul[i].mes : null,
          // this.rendaTipo.mesAgu[i].mes !== undefined ? this.rendaTipo.mesAgu[i].mes : null,
          // this.rendaTipo.mesSet[i].mes !== undefined ? this.rendaTipo.mesSet[i].mes : null,
          // this.rendaTipo.mesOut[i].mes !== undefined ? this.rendaTipo.mesOut[i].mes : null,
          // this.rendaTipo.mesNov[i].mes !== undefined ? this.rendaTipo.mesNov[i].mes : null,
          // this.rendaTipo.mesDez[i].mes !== undefined ? this.rendaTipo.mesDez[i].mes : null
            ]
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Todo',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: [0] //total de cada
          },
          {
            name: [0],
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [0]
          },
          {
            name: [0],
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [0]
          },
          {
            name: [0],
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [0]
          },
          {
            name: [0],
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [0]
          },
          {
            name: [0],
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: [0]
          }
        ]
      }
    }

      }
    );
  }






}
