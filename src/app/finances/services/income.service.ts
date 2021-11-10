import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { Income } from '../modal/income';
import firebase from 'firebase/app';
import { AlertsSweetService } from 'src/app/shared/services/alerts-sweet.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(
    private angFireDB: AngularFirestore,
    private alertSweetService: AlertsSweetService,
    private alertService: AlertModalService,
  ) { }

  // Cria renda no firestore
  createIncome(income: Income, uid: any, conta: any, valor: any, valorNaConta: any) {
    return this.angFireDB.collection("rendas").doc(uid).collection(uid).add(income)
      .then(() => {

        // atualizar a conta incrementando a renda
        let sumWallet = parseInt(valor) + parseInt(valorNaConta)
        return this.angFireDB
          .collection("contas").doc(uid).collection(uid)
          .doc(conta)
          .update({
            valor: sumWallet
          }).then(() => {
            this.alertSweetService.showSweetAlertSuccess("Renda salva com sucesso")
    
          }).catch((error) => {
            console.error(error)
          })

      }).catch((error) => {
        this.alertService.showAlertDanger(error)
      })
  }

  //Atualiza dados de um documento
  updateIncome(income: Income, uid: any, idIncome: any, idWalletAntigo: any, idWallet: any, valorNaContaAntiga: any, valorNaConta: any) {
    return this.angFireDB
      .collection("rendas").doc(uid).collection(uid)
      .doc(idIncome)
      .update({
        renda: income.renda,
        valorRenda: income.valorRenda,
        dataRenda: income.dataRenda,
        tipoRenda: income.tipoRenda,
        idConta: income.idConta,
        conta: income.conta,
        observacao: income.observacao

      }).then(() => {
        this.alertSweetService.showSweetAlertSuccess("Renda alterada com sucesso")

      }).catch((error) => {
        console.error(error)
      })

  }

  // Deleta um documento de uma coleção
  deleteIncome(uid: any, idIncome: any, idWallet: any, valorNaContaAntiga: any, valorNaConta: any) {
    return this.angFireDB.collection("rendas").doc(uid)
      .collection(uid)
      .doc(idIncome)
      .delete()
      .then(() => {
        // atualizar a conta decrementando a renda
        let subWallet = parseInt(valorNaContaAntiga) - valorNaConta

        this.angFireDB
          .collection("contas").doc(uid).collection(uid)
          .doc(idWallet)
          .update({
            valor: subWallet
          }).then(() => {
            this.alertSweetService.showSweetAlertSuccess("Renda excluída com sucesso")
    
          }).catch((error) => {
            console.error(error)
          })

      })
  }

  // Deleta um documento de uma coleção depois  que a conta é apagada
  deleteIncomeAfterWallet(uid: any, idIncome: any) {
    return this.angFireDB.collection("rendas").doc(uid)
      .collection(uid)
      .doc(idIncome)
      .delete()
      .then(() => {
        console.log("Renda excluida com sucesso")

      })
  }

  // Listar todos os documetos de uma coleção
  getIncomeList(uid: any) {
    return this.angFireDB.collection("rendas").doc(uid)
      .collection(uid)
      .snapshotChanges();
  }

  // Lista dados de um documento
  getIncomeDoc(uid: any, idIncome: any) {
    return this.angFireDB.collection("rendas").doc(uid)
      .collection(uid).doc(idIncome)
      .valueChanges()
  }


}
