import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { Wallet } from '../modal/wallet';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditWalletModalComponent } from 'src/app/finances/containers/edit-wallet-modal/edit-wallet-modal.component';

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

  showEditWallet(wallet: any) {
    this.showModalEditWallet(wallet);

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

  // Listar todos os dados de conta
  getWalletList(uid: any) { 
    return this.angFireDB.collection("contas").doc(uid)
    .collection(uid)
    .snapshotChanges();
  }

  getWalletDoc(uid: any, idWallet: any) {
    return this.angFireDB.collection("contas").doc(uid)
    .collection(uid).doc(idWallet)
    .valueChanges()
  }

  // getWalletDoc(uid: any) {
  //   return this.angFireDB.collection("contas").doc(uid)
  //   .collection(uid).get()
  //   .subscribe((result) => {
  //     result.forEach((doc) => {
  //       console.warn(`${doc.id} => ${doc.data()}`)
  //     })
  //   })
  // }

}
