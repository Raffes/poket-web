import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateIncomeModalComponent } from '../containers/income-crud-modal/create-income-modal/create-income-modal.component';
import { DeleteIncomeModalComponent } from '../containers/income-crud-modal/delete-income-modal/delete-income-modal.component';
import { EditIncomeModalComponent } from '../containers/income-crud-modal/edit-income-modal/edit-income-modal.component';

@Injectable({
  providedIn: 'root'
})
export class IncomeCrudModalService {

  constructor(
    private modalService: BsModalService
  ) { }

  // Pega e lança os dados para o modal de edição da renda
  private showModalEditIncome(income: any) {
    const bsModalRef: BsModalRef = this.modalService.show(EditIncomeModalComponent);
  
    bsModalRef.content.id = income.id,
    bsModalRef.content.renda = income.renda,
    bsModalRef.content.valorRenda = income.valorRenda,
    bsModalRef.content.dataRenda = income.dataRenda,
    bsModalRef.content.tipoRenda = income.tipoRenda,
    bsModalRef.content.conta = income.conta,
    bsModalRef.content.observacao = income.observacao


  }

  // Mostra modal de confirmação de apagar renda
  private showModalDeleteIncome(income: any) {
    const bsModalRef: BsModalRef = this.modalService.show(DeleteIncomeModalComponent);

    bsModalRef.content.id = income.id,
    bsModalRef.content.renda = income.renda,
    bsModalRef.content.valorRenda = income.valorRenda,
    bsModalRef.content.dataRenda = income.dataRenda,
    bsModalRef.content.tipoRenda = income.tipoRenda,
    bsModalRef.content.conta = income.conta,
    bsModalRef.content.observacao = income.observacao
  }

  // Mostra modal de criação de renda
  showCreateIncome() {
    this.modalService.show(CreateIncomeModalComponent);
  }

  // Mostra modal de edição de renda
  showEditIncome(income: any) {
    this.showModalEditIncome(income);

  }

  // Mostra modal de exclusão de renda
  showDeleteIncome(income: any) {
    this.showModalDeleteIncome(income);

  }
}
