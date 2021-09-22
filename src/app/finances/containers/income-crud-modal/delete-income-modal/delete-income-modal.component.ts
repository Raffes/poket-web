import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { IncomeService } from 'src/app/finances/services/income.service';

@Component({
  selector: 'app-delete-income-modal',
  templateUrl: './delete-income-modal.component.html',
  styleUrls: ['./delete-income-modal.component.css']
})
export class DeleteIncomeModalComponent implements OnInit {

  @Input() id: any;
  @Input() renda: any;

  constructor(
    public bsModalRef: BsModalRef,
    public incomeService: IncomeService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  deleteIncome(){
    this.incomeService.deleteIncome(this.authService.userData.uid, this.id)
      this.closeModal()

  }

}
