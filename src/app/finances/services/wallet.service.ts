import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { Wallet } from '../modal/wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(
    private angFireDB: AngularFirestore,
    private alertService: AlertModalService,
    
  ) { }

  // Cria conta financeira no firestore
  createWallet(wallet: Wallet, uid: any) {
    return this.angFireDB.collection("contas").doc(uid).collection(uid).add(wallet)
      .then(() => {
        this.alertService.showAlertSuccess("Conta feita com sucesso")

      }).catch((error) => {
        this.alertService.showAlertDanger(error)
      })
  }

  //Atualiza dados de um documento
  updateWallet(wallet: Wallet, uid: any, idWallet: any) {
    return this.angFireDB
      .collection("contas").doc(uid).collection(uid)
      .doc(idWallet)
      .update({
        conta: wallet.conta,
        valor: wallet.valor
      })

  }

  // Deleta um documento de uma coleção
  deleteWallet(uid: any, idWallet: any) {
    return this.angFireDB.collection("contas").doc(uid)
      .collection(uid)
      .doc(idWallet)
      .delete()
  }

  // Listar todos os documetos de uma coleção
  getWalletList(uid: any) {
    return this.angFireDB.collection("contas").doc(uid)
      .collection(uid)
      .snapshotChanges();
  }

  // Lista dados de um documento
  getWalletDoc(uid: any, idWallet: any) {
    return this.angFireDB.collection("contas").doc(uid)
      .collection(uid).doc(idWallet)
      .valueChanges()
  }

   // Cria conta financeira no firestore
   createBalance(value: any, uid: any, idBalance: any) {
    return this.angFireDB.collection("contas").doc(uid).collection("saldo Todal").doc(idBalance)
    .update({
      valorTotal: value})
  }

  // Lista dados de um documento
  getBalanceDoc(uid: any, idBalance: any) {
    return this.angFireDB.collection("contas").doc(uid)
      .collection("saldo Todal")
      .snapshotChanges();
  }

}
