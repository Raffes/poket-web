import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { AlertsSweetService } from 'src/app/shared/services/alerts-sweet.service';
import { FinancialPlanning } from '../modal/financial-planning';

@Injectable({
  providedIn: 'root'
})
export class FinancialPlanningService {

  constructor(
    private angFireDB: AngularFirestore,
    private alertSweetService: AlertsSweetService,
    private alertService: AlertModalService,
  ) { }


  // Cria planejamento financeiro
  createFinancialPlanning(fp: FinancialPlanning, uid: any) {
    return this.angFireDB.collection("planejamentoFinanceiro").doc(uid).collection(uid).add({
      nomePF: fp.nomePF,
      tipoPF: fp.tipoPF,
      dataInicial: fp.dataInicial,
      dataFinal: fp.dataFinal,
      valorAtual: fp.valorAtual,
      valorObjetivado: fp.valorObjetivado
    })
      .then((res) => {

        // atualizar a conta incrementando a renda
        let subWallet = parseInt(fp.contaValor) - parseInt(fp.valorAtual)
        this.angFireDB
          .collection("contas").doc(uid).collection(uid)
          .doc(fp.idConta)
          .update({
            valor: subWallet
          })

        this.angFireDB.collection("planejamentoFinanceiro").doc(uid).collection(uid)
          .doc(res.id).collection(res.id).add({
            idPF: res.id,
            valorHistoricoPF: fp.valorAtual,
            idConta: fp.idConta,
            conta: fp.conta,
            dataHistorico: fp.dataInicial
          })

      }).then(() => {
        this.alertSweetService.showSweetAlertSuccess("Planejamento salvo com sucesso")

      }).catch((error) => {
        console.error(error)
      })


  }

  // Cria mais valores planejamento financeiro
  AddMoreFinancialPlanning(fp: any, uid: any, idFp: any, oldValueFp: any) {
    return this.angFireDB.collection("planejamentoFinanceiro").doc(uid).collection(uid)
      .doc(idFp).collection(idFp).add(fp)
      .then(() => {

        console.log(fp)
        console.log(idFp, oldValueFp)

        let subWallet = parseInt(fp.contaValor) - parseInt(fp.valorHistoricoPF)
        let sumFP = fp.valorHistoricoPF + oldValueFp

        this.angFireDB
          .collection("contas").doc(uid).collection(uid)
          .doc(fp.idConta)
          .update({
            valor: subWallet
          }).then(() => console.log("Conta atualizada"))

        return this.angFireDB
          .collection("planejamentoFinanceiro").doc(uid).collection(uid)
          .doc(idFp)
          .update({
            valorAtual: sumFP
          }).then(() => {
            this.alertSweetService.showSweetAlertSuccess("Histórico salvo com sucesso")
    
          }).catch((error) => {
            console.error(error)
          })

      }).catch((error) => {
        console.error(error)
      })
  }


  //Atualiza dados de um documento
  updateFinancialPlanning(fp: FinancialPlanning, uid: any, idFp: any) {
    return this.angFireDB
      .collection("planejamentoFinanceiro").doc(uid).collection(uid)
      .doc(idFp)
      .update({

        nomePF: fp.nomePF,
        tipoPF: fp.tipoPF,
        valorObjetivado: fp.valorObjetivado,
        dataInicial: fp.dataInicial,
        dataFinal: fp.dataFinal

      }).then(() => {
        this.alertSweetService.showSweetAlertSuccess("Planejamento alterado com sucesso")

      }).catch((error) => {
        console.error(error)
      })

  }


  // Deleta um documento de uma coleção
  deleteFinancialPlanning(uid: any, idFP: any) {
    return this.angFireDB.collection("planejamentoFinanceiro").doc(uid)
      .collection(uid)
      .doc(idFP)
      .delete()
      .then(() => {
        // this.alertSweetService.showSweetAlertSuccess("Planejamento excluído com sucesso")

      }).catch((error) => {
        console.error(error)
      })
  }

    // Deleta um documento de uma coleção
    deleteHistoryFpAfterWallet(uid: any, idFP: any, id: any) {
      return this.angFireDB.collection("planejamentoFinanceiro").doc(uid).collection(uid)
        .doc(idFP).collection(idFP).doc(id)
        .delete()
        .then(() => {
          console.log("Histórico apagado com sucesso")
  
  
        }).catch((err) => {
          console.error(err)
        })
    }
  

  // Deleta um documento de uma coleção
  deleteHistoryFinancialPlanning(uid: any, idFP: any, idWallet: any, id: any, idWalletOld: any, accountAmount: any, totalValuePF: any) {
    return this.angFireDB.collection("planejamentoFinanceiro").doc(uid).collection(uid)
      .doc(idFP).collection(idFP).doc(id)
      .delete()
      .then(() => {
        // atualizar a conta incrementando a renda
        let sumFP = parseInt(idWalletOld) + accountAmount
        let sub = totalValuePF - accountAmount

        this.angFireDB
          .collection("contas").doc(uid).collection(uid)
          .doc(idWallet)
          .update({
            valor: sumFP
          }).then(() => {
            this.alertSweetService.showSweetAlertSuccess("Dado excluído com sucesso")
    
          }).catch((error) => {
            console.error(error)
          })

          return this.angFireDB
          .collection("planejamentoFinanceiro").doc(uid).collection(uid)
          .doc(idFP)
          .update({
            valorAtual: sub
          }).then(() => {
            this.alertSweetService.showSweetAlertSuccess("Histórico salvo com sucesso")
    
          }).catch((error) => {
            console.error(error)
          })


      }).catch((err) => {
        console.error(err)
      })
  }

  // Listar todos os documetos de planejamento de uma coleção
  getFinancialPlanningList(uid: any) {
    return this.angFireDB.collection("planejamentoFinanceiro").doc(uid)
      .collection(uid)
      .snapshotChanges();
  }

  // Listar todos os documetos do historico de um planejamento de uma coleção
  getHistoryFinancialPlanningList(uid: any, idFp: any) {
    return this.angFireDB.collection("planejamentoFinanceiro").doc(uid).collection(uid)
      .doc(idFp).collection(idFp)
      .snapshotChanges();
  }

  // Lista dados de um documento
  getFinancialPlanningDoc(uid: any, idFp: any) {
    return this.angFireDB.collection("planejamentoFinanceiro").doc(uid)
      .collection(uid).doc(idFp)
      .valueChanges()
  }



}
