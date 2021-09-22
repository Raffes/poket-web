import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { Income } from '../modal/income';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(
    private angFireDB: AngularFirestore,
    private alertService: AlertModalService,
  ) { }

   // Cria renda no firestore
   createIncome(income: Income, uid: any) {
    return this.angFireDB.collection("rendas").doc(uid).collection(uid).add(income)
      .then(() => {
        this.alertService.showAlertSuccess("Renda adicionada com sucesso")

      }).catch((error) => {
        this.alertService.showAlertDanger(error)
      })
  }

  //Atualiza dados de um documento
  updateIncome(income: Income, uid: any, idIncome: any) {
    return this.angFireDB
      .collection("rendas").doc(uid).collection(uid)
      .doc(idIncome)
      .update({
        renda: income.renda,
        valorRenda: income.valorRenda,
        dataRenda: income.dataRenda,
        tipoRenda: income.tipoRenda,
        conta: income.conta,
        observacao: income.observacao

      })

  }

  // Deleta um documento de uma coleção
  deleteIncome(uid: any, idIncome: any) {
    return this.angFireDB.collection("rendas").doc(uid)
      .collection(uid)
      .doc(idIncome)
      .delete()
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
