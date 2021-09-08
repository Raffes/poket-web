import { Component, OnInit } from '@angular/core';
import { ModalUpdateUserService } from '../../services/modal-update-user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(
    private modalUpdateUser: ModalUpdateUserService
  ) {
   }

  ngOnInit(): void {
  }

  modalUpdateNickname() {
    this.modalUpdateUser.showModalUpdateNickname()
  }

  modalUpdateEmail() {
    this.modalUpdateUser.showModalUpdateEmail()
  }

  modalDeleteUser() {
    this.modalUpdateUser.showModalDeleteUser()
  }

  modalUpdatePassword() {
    this.modalUpdateUser.showModalUpdatePassword()
  }


}
