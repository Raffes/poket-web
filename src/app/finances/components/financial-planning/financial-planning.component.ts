import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  modalCreateFinancialPlanning() {
    
  }

  modalEditFinancialPlanning(fp: any) {

  }

  modalDeleteFinancialPlanning(fp: any) {

  }

}
