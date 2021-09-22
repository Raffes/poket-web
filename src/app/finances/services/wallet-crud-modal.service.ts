import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateWalletModalComponent } from '../containers/wallet-crud-modal/create-wallet-modal/create-wallet-modal.component';
import { DeleteWalletModalComponent } from '../containers/wallet-crud-modal/delete-wallet-modal/delete-wallet-modal.component';
import { EditWalletModalComponent } from '../containers/wallet-crud-modal/edit-wallet-modal/edit-wallet-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalWalletCrudService {

  constructor(
    private modalService: BsModalService
  ) { }

  // Pega e lança os dados para o modal de edição da conta
  private showModalEditWallet(wallet: any) {
    const bsModalRef: BsModalRef = this.modalService.show(EditWalletModalComponent);
    bsModalRef.content.id = wallet.id
    bsModalRef.content.conta = wallet.conta
    bsModalRef.content.valor = wallet.valor
  }

  // Mostra modal de confirmação de apagar conta
  private showModalDeleteWallet(wallet: any) {
    const bsModalRef: BsModalRef = this.modalService.show(DeleteWalletModalComponent);
    bsModalRef.content.id = wallet.id
    bsModalRef.content.conta = wallet.conta
    bsModalRef.content.valor = wallet.valor
  }

  // Mostra modal de criação de conta
  showCreateWallet() {
    this.modalService.show(CreateWalletModalComponent);
  }

  // Mostra modal de edição de conta
  showEditWallet(wallet: any) {
    this.showModalEditWallet(wallet);

  }

  // Mostra modal de exclusão de conta
  showDeleteWallet(wallet: any) {
    this.showModalDeleteWallet(wallet);

  }
}
