import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { FinancialPlanning } from '../modal/financial-planning';

@Injectable({
  providedIn: 'root'
})
export class FinancialPlanningService {

  constructor(
    private angFireDB: AngularFirestore,
    private alertService: AlertModalService,
  ) { }


  // Cria planejamento financeiro
  createFinancialPlanning(fp: FinancialPlanning, uid: any) {
    return this.angFireDB.collection("planejamentoFinanceiro").doc(uid).collection(uid).add(fp)
      .then((res) => {

        // atualizar a conta incrementando a renda
        let subWallet = parseInt(fp.contaValor) - parseInt(fp.valorAtual)
        this.angFireDB
          .collection("contas").doc(uid).collection(uid)
          .doc(fp.idConta)
          .update({
            valor: subWallet
          })
        // .then(() => this.alertService.showAlertSuccess("Planejamento financeiro de " + fp.tipoPF + " adicionado com sucesso"))


        this.angFireDB.collection("planejamentoFinanceiro").doc(uid).collection(uid)
          .doc(res.id).collection(res.id).add({
            valorAtual: fp.valorAtual,
            conta: fp.conta,
            dataInicial: fp.dataInicial
          })

      }).catch((error) => {
        this.alertService.showAlertDanger(error)
      })


  }

  // Cria mais valores planejamento financeiro
  AddMoreFinancialPlanning(fp: FinancialPlanning, uid: any, idFp: any, oldValueFp: any) {
    return this.angFireDB.collection("planejamentoFinanceiro").doc(uid).collection(uid)
      .doc(idFp).collection(idFp).add(fp)
      .then(() => {

        let subWallet = parseInt(fp.contaValor) - parseInt(fp.valorAtual)
        let sumFP = fp.valorAtual + oldValueFp

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
          }).then(() => console.log("valor do planejamento financeiro atualizado"))

      }).catch((error) => {
        this.alertService.showAlertDanger(error)
      })
  }


  //Atualiza dados de um documento
  updateFinancialPlanning(fp: FinancialPlanning, uid: any, idFp: any) {
    return this.angFireDB
      .collection("planejamentoFinanceiro").doc(uid).collection(uid)
      .doc(idFp)
      .update({

        planejamentoFinanceiro: fp.planejamentoFinanceiro,
        tipoPF: fp.tipoPF,
        valorObjetivado: fp.valorObjetivado,
        dataFinal: fp.dataFinal

      })

  }


  // Deleta um documento de uma coleção
  deleteFinancialPlanning(uid: any, idFP: any) {
    return this.angFireDB.collection("planejamentoFinanceiro").doc(uid)
      .collection(uid)
      .doc(idFP)
      .delete()
      .then(() => {
        console.log("Planejamento deletado com sucesso")


      }).catch((err) => {
        console.error(err)
      })
  }

  // Deleta um documento de uma coleção
  deleteHistoryFinancialPlanning(uid: any, idFP: any, idWallet: any, id: any, idWalletOld: any, accountAmount: any) {
    return this.angFireDB.collection("planejamentoFinanceiro").doc(uid).collection(uid)
      .doc(idFP).collection(idFP).doc(id)
      .delete()
      .then(() => {
        // atualizar a conta incrementando a renda
        let subWallet = parseInt(idWalletOld) + accountAmount

        this.angFireDB
          .collection("contas").doc(uid).collection(uid)
          .doc(idWallet)
          .update({
            valor: subWallet
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
