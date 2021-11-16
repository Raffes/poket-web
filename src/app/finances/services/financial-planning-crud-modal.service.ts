import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddValueFinancialPlanningModalComponent } from '../containers/financial-planning-crud-modal/add-value-financial-planning-modal/add-value-financial-planning-modal.component';
import { CreateFinancialPlanningModalComponent } from '../containers/financial-planning-crud-modal/create-financial-planning-modal/create-financial-planning-modal.component';
import { DeleteFinancialPlanningModalComponent } from '../containers/financial-planning-crud-modal/delete-financial-planning-modal/delete-financial-planning-modal.component';
import { DeleteValueFinancialPlanningModalComponent } from '../containers/financial-planning-crud-modal/delete-value-financial-planning-modal/delete-value-financial-planning-modal.component';
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

    bsModalRef.content.nomePF = fp.nomePF,
      
      bsModalRef.content.id = fp.id,
      bsModalRef.content.tipoPF = fp.tipoPF,
      bsModalRef.content.conta = fp.conta,
      bsModalRef.content.contaValor = fp.contaValor,
      bsModalRef.content.valorAtual = fp.valorAtual,
      bsModalRef.content.valorObjetivado = fp.valorObjetivado,
      bsModalRef.content.dataInicial = fp.dataInicial,
      bsModalRef.content.dataFinal = fp.dataFinal

  }

  private showAddValueFinancialPlanning(fp: FinancialPlanning) {
    const bsModalRef: BsModalRef = this.modalService.show(AddValueFinancialPlanningModalComponent);

    bsModalRef.content.nomePF = fp.nomePF,
      
      bsModalRef.content.id = fp.id,
      bsModalRef.content.tipoPF = fp.tipoPF,
      bsModalRef.content.idConta = fp.idConta,
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

    bsModalRef.content.nomePF = fp.nomePF,

      bsModalRef.content.id = fp.id,
      bsModalRef.content.tipoPF = fp.tipoPF,
      bsModalRef.content.idConta = fp.idConta,
      bsModalRef.content.conta = fp.conta,
      bsModalRef.content.contaValor = fp.contaValor,
      bsModalRef.content.valorAtual = fp.valorAtual,
      bsModalRef.content.valorObjetivado = fp.valorObjetivado,
      bsModalRef.content.dataInicial = fp.dataInicial,
      bsModalRef.content.dataFinal = fp.dataFinal
  }

  private showModalDeleteHistoryFinancialPlanning(fp: any, idFp: any) {
    const bsModalRef: BsModalRef = this.modalService.show(DeleteValueFinancialPlanningModalComponent);

    bsModalRef.content.nomePF = fp.nomePF,
      bsModalRef.content.idFp = idFp,
      bsModalRef.content.id = fp.id,
      bsModalRef.content.tipoPF = fp.tipoPF,
      bsModalRef.content.idConta = fp.idConta,
      bsModalRef.content.conta = fp.conta,
      bsModalRef.content.contaValor = fp.contaValor,
      bsModalRef.content.valorHistoricoPF = fp.valorHistoricoPF,
      bsModalRef.content.valorObjetivado = fp.valorObjetivado,
      bsModalRef.content.dataInicial = fp.dataInicial,
      bsModalRef.content.dataFinal = fp.dataFinal
  }

  // Mostra modal de criação de planejamento financeiro
  showCreateFinancialPlanning() {
    this.modalService.show(CreateFinancialPlanningModalComponent);
  }

  // Mostra modal de adição de valor de planejamento financeiro
  showAddFinancialPlanning(FinancialPlanning: any) {
    this.showAddValueFinancialPlanning(FinancialPlanning);
  }

  // Mostra modal de exclusão de valor de planejamento financeiro
  showDeleteHistoryFinancialPlanning(FinancialPlanning: any, idFp: any) {
    this.showModalDeleteHistoryFinancialPlanning(FinancialPlanning, idFp);
  }

  // Mostra modal de edição de planejamento financeiro
  showEditFinancialPlanning(FinancialPlanning: any) {
    this.showModalEditFinancialPlanning(FinancialPlanning);

  }

  showDeleteFinancialPlanning(FinancialPlanning: any) {
    this.showModalDeleteFinancialPlanning(FinancialPlanning);

  }

}
