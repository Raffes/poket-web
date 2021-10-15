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
      return this.angFireDB.collection("planejamentoFinanceiro").doc(uid).collection(fp.tipoPF).add(fp)
        .then(() => {
  
          // atualizar a conta incrementando a renda
          let subWallet = parseInt(fp.contaValor) - parseInt(fp.valorAtual)
          return this.angFireDB
            .collection("contas").doc(uid).collection(uid)
            .doc(fp.idConta)
            .update({
              valor: subWallet
            }).then(() => this.alertService.showAlertSuccess("Planejamento financeiro de " + fp.tipoPF + " adicionado com sucesso"))
  
  
        }).catch((error) => {
          this.alertService.showAlertDanger(error)
        })
    }


  //Atualiza dados de um documento
  updateFinancialPlanning(fp: FinancialPlanning, uid: any, idWalletOld: any, accountAmountOld: any) {
    return this.angFireDB
      .collection("planejamentoFinanceiro").doc(uid).collection(fp.tipoPF)
      .doc(fp.id)
      .update({

        planejamentoFinanceiro: fp.planejamentoFinanceiro,
        tipoPF: fp.tipoPF,
        idConta: fp.idConta,
        conta: fp.conta,
        contaValor: fp.contaValor,
        valorAtual: fp.valorAtual,
        valorObjetivado: fp.valorObjetivado,
        dataInicial: fp.dataInicial,
        dataFinal: fp.dataFinal

      }).then(() => {
        // atualizar a conta incrementando ela
        let subWallet = parseInt(accountAmountOld) - parseInt(fp.valorAtual)
        let sumWallet = parseInt(fp.contaValor) + parseInt(fp.valorAtual)

        this.angFireDB
          .collection("contas").doc(uid).collection(uid)
          .doc(idWalletOld)
          .update({
            valor: sumWallet
          })

        return this.angFireDB
          .collection("contas").doc(uid).collection(uid)
          .doc(fp.idConta)
          .update({
            valor: subWallet
          })
      })

  }

  // updateFinancialPlanning(fp: FinancialPlanning, uid: any, idFp: any, idWalletOld: any, idWallet: any, accountAmountOld: any, accountAmount: any) {
  //   return this.angFireDB
  //     .collection("planejamentoFinanceiro").doc(uid).collection(fp.tipoPF)
  //     .doc(fp.idConta)
  //     .update({

  //       planejamentoFinanceiro: fp.planejamentoFinanceiro,
  //       tipoPF: fp.tipoPF,
  //       idConta: idWallet,
  //       conta: fp.conta,
  //       contaValor: fp.contaValor,
  //       valorAtual: fp.valorAtual,
  //       valorObjetivado: fp.valorObjetivado,
  //       dataInicial: fp.dataInicial,
  //       dataFinal: fp.dataFinal

  //     }).then(() => {
  //       // atualizar a conta incrementando a renda
  //       let subWallet = parseInt(accountAmountOld) - parseInt(fp.valorAtual)
  //       let sumWallet = parseInt(accountAmount) + parseInt(fp.valorAtual)

  //       this.angFireDB
  //         .collection("contas").doc(uid).collection(uid)
  //         .doc(idWalletOld)
  //         .update({
  //           valor: sumWallet
  //         })

  //       return this.angFireDB
  //         .collection("contas").doc(uid).collection(uid)
  //         .doc(idWallet)
  //         .update({
  //           valor: subWallet
  //         })
  //     })

  // }

  // Deleta um documento de uma coleção
  deleteFinancialPlanning(tipoPF: any, uid: any, idFP: any, idWallet: any, idWalletOld: any, accountAmount: any) {
    return this.angFireDB.collection("planejamentoFinanceiro").doc(uid)
      .collection(tipoPF)
      .doc(idFP)
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


      })
  }

  // Listar todos os documetos de uma coleção
  getFinancialPlanning(tipoPF: any, uid: any) {
    return this.angFireDB.collection("planejamentoFinanceiro").doc(uid)
      .collection(tipoPF)
      .snapshotChanges();
  }

  // Lista dados de um documento
  getFinancialPlanningDoc(tipoPF: any, uid: any, idFp: any) {
    return this.angFireDB.collection("planejamentoFinanceiro").doc(uid)
      .collection(tipoPF).doc(idFp)
      .valueChanges()
  }



}
