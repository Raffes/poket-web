import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateExpenseModalComponent } from '../containers/expense-crud-modal/create-expense-modal/create-expense-modal.component';
import { DeleteExpenseModalComponent } from '../containers/expense-crud-modal/delete-expense-modal/delete-expense-modal.component';
import { EditExpenseModalComponent } from '../containers/expense-crud-modal/edit-expense-modal/edit-expense-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCrudModalService {

  constructor(
    private modalService: BsModalService
  ) { }

    // Pega e lança os dados para o modal de edição da despesa
    private showModalEditExpense(expense: any) {
      const bsModalRef: BsModalRef = this.modalService.show(EditExpenseModalComponent);
    
      bsModalRef.content.id = expense.id,
      bsModalRef.content.despesa = expense.despesa,
      bsModalRef.content.valorDespesa = expense.valorDespesa,
      bsModalRef.content.dataDespesa = expense.dataDespesa,
      bsModalRef.content.tipoDespesa = expense.tipoDespesa,
      bsModalRef.content.idConta = expense.idConta,
      bsModalRef.content.conta = expense.conta,
      bsModalRef.content.observacao = expense.observacao
  
  
    }

    // Mostra modal de confirmação de apagar despesa
  private showModalDeleteExpense(expense: any) {
    const bsModalRef: BsModalRef = this.modalService.show(DeleteExpenseModalComponent);

      bsModalRef.content.id = expense.id,
      bsModalRef.content.despesa = expense.despesa,
      bsModalRef.content.valorDespesa = expense.valorDespesa,
      bsModalRef.content.dataDespesa = expense.dataDespesa,
      bsModalRef.content.tipoDespesa = expense.tipoDespesa,
      bsModalRef.content.idConta = expense.idConta,
      bsModalRef.content.conta = expense.conta,
      bsModalRef.content.observacao = expense.observacao
  }

  // Mostra modal de criação de despesa
  showCreateExpense() {
    this.modalService.show(CreateExpenseModalComponent);
  }

  // Mostra modal de edição de despesa
  showEditExpense(expense: any) {
    this.showModalEditExpense(expense);

  }

  // Mostra modal de exclusão de despesa
  showDeleteExpense(expense: any) {
    this.showModalDeleteExpense(expense);

  }

}
