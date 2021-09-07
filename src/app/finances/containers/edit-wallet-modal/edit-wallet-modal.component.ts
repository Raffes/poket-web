import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Wallet } from 'src/app/finances/modal/wallet';
import { WalletService } from 'src/app/finances/services/wallet.service';
import { AlertModalService } from '../../../shared/services/alert-modal.service';

@Component({
  selector: 'app-edit-wallet-modal',
  templateUrl: './edit-wallet-modal.component.html',
  styleUrls: ['./edit-wallet-modal.component.css']
})
export class EditWalletModalComponent implements OnInit {

  @Input() id: any;
  @Input() conta: any;
  @Input() valor: any;


  public walletUpdate: FormGroup;
  wallet!: Wallet;
  walletRef: any

  constructor(
    public bsModalRef: BsModalRef,
    public walletService: WalletService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private alertService: AlertModalService
    ) { 
    this.walletUpdate = this.formBuilder.group({
      conta: ["", Validators.maxLength(30)],
      valor: ["", Validators.maxLength(8)]
    })
  }

  ngOnInit(): void {

    this.walletService.getWalletDoc(this.authService.userData.uid, this.id).subscribe(res => {
      this.walletRef = res
      this.walletUpdate = this.formBuilder.group({
        conta: [this.conta],
        valor: [this.valor]
      })

    })

    
        
  }

  editWallet(){}

  closeModal() {
    this.bsModalRef.hide();
  }
}
