import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateFinancialPlanningModalComponent } from '../containers/financial-planning-crud-modal/create-financial-planning-modal/create-financial-planning-modal.component';
import { DeleteFinancialPlanningModalComponent } from '../containers/financial-planning-crud-modal/delete-financial-planning-modal/delete-financial-planning-modal.component';
import { EditFinancialPlanningModalComponent } from '../containers/financial-planning-crud-modal/edit-financial-planning-modal/edit-financial-planning-modal.component';
import { FinancialPlanning } from '../modal/financial-planning';

@Injectable({
  providedIn: 'root'
})
export class FinancialPlanningCrudModalService {

  constructor(
    private modalService: BsModalService
  ) { }

  // Pega e lança os dados para o modal de edição do planejamento financeiro
  private showModalEditFinancialPlanning(fp: FinancialPlanning) {
    const bsModalRef: BsModalRef = this.modalService.show(EditFinancialPlanningModalComponent);

    bsModalRef.content.planejamentoFinanceiro = fp.planejamentoFinanceiro,
      bsModalRef.content.tipoPF = fp.tipoPF,
      bsModalRef.content.conta = fp.conta,
      bsModalRef.content.contaValor = fp.contaValor,
      bsModalRef.content.valorAtual = fp.valorAtual,
      bsModalRef.content.valorObjetivado = fp.valorObjetivado,
      bsModalRef.content.dataInicial = fp.dataInicial,
      bsModalRef.content.dataFinal = fp.dataFinal

  }

  // Mostra modal de confirmação de apagar planejamento financeiro
  private showModalDeleteFinancialPlanning(fp: FinancialPlanning) {
    const bsModalRef: BsModalRef = this.modalService.show(DeleteFinancialPlanningModalComponent);

    bsModalRef.content.planejamentoFinanceiro = fp.planejamentoFinanceiro,
      bsModalRef.content.tipoPF = fp.tipoPF,
      bsModalRef.content.conta = fp.conta,
      bsModalRef.content.contaValor = fp.contaValor,
      bsModalRef.content.valorAtual = fp.valorAtual,
      bsModalRef.content.valorObjetivado = fp.valorObjetivado,
      bsModalRef.content.dataInicial = fp.dataInicial,
      bsModalRef.content.dataFinal = fp.dataFinal
  }

  // Mostra modal de criação de planejamento financeiro
  showCreateFinancialPlanning() {
    this.modalService.show(CreateFinancialPlanningModalComponent);
  }

  // Mostra modal de edição de planejamento financeiro
  showEditFinancialPlanning(FinancialPlanning: any) {
    this.showModalEditFinancialPlanning(FinancialPlanning);

  }

  // Mostra modal de exclusão de planejamento financeiro
  showDeleteFinancialPlanning(FinancialPlanning: any) {
    this.showModalDeleteFinancialPlanning(FinancialPlanning);

  }

}
