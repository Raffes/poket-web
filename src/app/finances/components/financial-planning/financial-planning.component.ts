import { Component, OnInit } from '@angular/core';
import { FinancialPlanningCrudModalService } from '../../services/financial-planning-crud-modal.service';

@Component({
  selector: 'app-financial-planning',
  templateUrl: './financial-planning.component.html',
  styleUrls: ['./financial-planning.component.css']
})
export class FinancialPlanningComponent implements OnInit {

  FinancialPlanning: any;
  valor: any;
  filterFinancialPlanning: string = '';

  totalLength: any;
  page: number = 1;

  constructor(
    public modalFpService: FinancialPlanningCrudModalService
  ) { }

  ngOnInit(): void {
  }

  modalCreateFinancialPlanning() {
    this.modalFpService.showCreateFinancialPlanning()
  }

  modalEditFinancialPlanning(fp: any) {

  }

  modalDeleteFinancialPlanning(fp: any) {

  }

}
