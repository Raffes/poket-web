import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateWalletModalComponent } from 'src/app/finances/containers/create-wallet-modal/create-wallet-modal.component';
import { DeleteWalletModalComponent } from 'src/app/finances/containers/delete-wallet-modal/delete-wallet-modal.component';
import { EditWalletModalComponent } from 'src/app/finances/containers/edit-wallet-modal/edit-wallet-modal.component';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { DeleteUserModalComponent } from '../containers/delete-user-modal/delete-user-modal.component';
import { UpdateEmailModalComponent } from '../containers/update-email-modal/update-email-modal.component';
import { UpdateNicknameModalComponent } from '../containers/update-nickname-modal/update-nickname-modal.component';
import { UpdatePasswordModalComponent } from '../containers/update-password-modal/update-password-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalUpdateUserService {

  constructor(
    private modalService: BsModalService
  ) { }

  // Abre modal de update nickname
  showModalUpdateNickname() {
    this.modalService.show(UpdateNicknameModalComponent);
  }

  // Abre modal de update email
  showModalUpdateEmail() {
    this.modalService.show(UpdateEmailModalComponent);
  }

  // Abre modal de update de senha
  showModalUpdatePassword() {
    this.modalService.show(UpdatePasswordModalComponent);
  }

  // Abre modal de confirmação de exclusão de conta do usuário
  showModalDeleteUser() {
    this.modalService.show(DeleteUserModalComponent);
  }

  
}
