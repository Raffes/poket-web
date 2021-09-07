import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-delete-wallet-modal',
  templateUrl: './delete-wallet-modal.component.html',
  styleUrls: ['./delete-wallet-modal.component.css']
})
export class DeleteWalletModalComponent implements OnInit {

  @Input() id: any;
  @Input() conta: any;
  @Input() valor: any;

  constructor(
    public bsModalRef: BsModalRef,
    public walletService: WalletService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  deleteWallet(){
      this.walletService.deleteWallet(this.authService.userData.uid, this.id)
      this.closeModal()

  }

}
