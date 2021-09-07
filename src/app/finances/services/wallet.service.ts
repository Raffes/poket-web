import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { Wallet } from '../modal/wallet';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditWalletModalComponent } from 'src/app/finances/containers/edit-wallet-modal/edit-wallet-modal.component';
import { DeleteWalletModalComponent } from '../containers/delete-wallet-modal/delete-wallet-modal.component';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(
    private router: Router,
    private angFireDB: AngularFirestore,
    private alertService: AlertModalService,
    private modalService: BsModalService
  ) { }


  private showModalEditWallet(wallet: any) {
    const bsModalRef: BsModalRef = this.modalService.show(EditWalletModalComponent);
    bsModalRef.content.id = wallet.id
    bsModalRef.content.conta = wallet.conta
    bsModalRef.content.valor = wallet.valor
  }

  private showModalDeleteWallet(wallet: any) {
    const bsModalRef: BsModalRef = this.modalService.show(DeleteWalletModalComponent);
    bsModalRef.content.id = wallet.id
    bsModalRef.content.conta = wallet.conta
    bsModalRef.content.valor = wallet.valor
  }

  showEditWallet(wallet: any) {
    this.showModalEditWallet(wallet);

  }

  showDeleteWallet(wallet: any) {
    this.showModalDeleteWallet(wallet);

  }

  // Cria conta fnanceira no firestore
  createWallet(wallet: Wallet, uid: any) {
      return this.angFireDB.collection("contas").doc(uid).collection(uid).add(wallet)
      .then(() => {
        this.alertService.showAlertSuccess("Conta feita com sucesso")

        setTimeout(() => {
            window.location.reload()
        }, 2000)

      }).catch ((error) => {
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



}
