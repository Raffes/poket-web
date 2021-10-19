import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { FinancialPlanningCrudModalService } from 'src/app/finances/services/financial-planning-crud-modal.service';
import { FinancialPlanningService } from 'src/app/finances/services/financial-planning.service';

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
    public modalFpService: FinancialPlanningCrudModalService,
    public authService: AuthService,
    private router: Router,
    public fpService: FinancialPlanningService
  ) { }

  ngOnInit(): void {

    this.listFinancialPlanning()
    this.paginationLengthFp()

  }

  paginationLengthFp() {
    this.fpService.getFinancialPlanningList(this.authService.userData.uid).subscribe(res => {
        this.totalLength = res.length
        
        })
  }


  listFinancialPlanning() {
    this.fpService.getFinancialPlanningList(this.authService.userData.uid).subscribe(res => {
      this.FinancialPlanning = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as unknown;
      })

    })

  }

  modalAddFinancialPlanningHistory(fp: any) {
    this.modalFpService.showAddFinancialPlanning(fp)
  }

  modalCreateFinancialPlanning() {
    this.modalFpService.showCreateFinancialPlanning()
  }

  modalEditFinancialPlanning(fp: any) {
    this.modalFpService.showEditFinancialPlanning(fp)
  }

  modalDeleteFinancialPlanning(fp: any) {
    this.modalFpService.showDeleteFinancialPlanning(fp)
  }

  financialPlanningHistory(idFP: any) {
    this.router.navigate([`dashboard/financial-planning/financial-planning-history/${idFP}`])
  }

}
