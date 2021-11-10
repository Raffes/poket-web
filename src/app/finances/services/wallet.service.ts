import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { AlertsSweetService } from 'src/app/shared/services/alerts-sweet.service';
import { Wallet } from '../modal/wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(
    private angFireDB: AngularFirestore,
    private alertService: AlertModalService,
    private alertSweetService: AlertsSweetService,
    
  ) { }

  // Cria conta financeira no firestore
  createWallet(wallet: Wallet, uid: any) {
    return this.angFireDB.collection("contas").doc(uid).collection(uid).add(wallet)
      .then(() => {
        this.alertSweetService.showSweetAlertSuccess("Conta feita com sucesso")

      }).catch((error) => {
        console.error(error)
      })
  }

  //Atualiza dados de um documento
  updateWallet(wallet: any, uid: any, idWallet: any) {
    return this.angFireDB
      .collection("contas").doc(uid).collection(uid)
      .doc(idWallet)
      .update({
        conta: wallet.conta,
        valor: wallet.valor
      }).then(() => {
        this.alertSweetService.showSweetAlertSuccess("Conta alterada com sucesso")

      }).catch((error) => {
        console.error(error)
      })

  }

  // Deleta um documento de uma coleção
  deleteWallet(uid: any, idWallet: any) {
    return this.angFireDB.collection("contas").doc(uid)
      .collection(uid)
      .doc(idWallet)
      .delete().then(() => {
        this.alertSweetService.showSweetAlertSuccess("Conta excluída com sucesso")

      }).catch((error) => {
        console.error(error)
      })
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
  

}
