import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { FinancialPlanningCrudModalService } from 'src/app/finances/services/financial-planning-crud-modal.service';
import { FinancialPlanningService } from 'src/app/finances/services/financial-planning.service';

@Component({
  selector: 'app-financial-planning-history',
  templateUrl: './financial-planning-history.component.html',
  styleUrls: ['./financial-planning-history.component.css']
})
export class FinancialPlanningHistoryComponent implements OnInit {

  valor: any;
  FinancialPlanning: any;
  FinancialHistoryPlanning: any;
  filterFinancialPlanning: string = '';
  totalLength: any;
  page: number = 1;

  constructor(
    public modalFpService: FinancialPlanningCrudModalService,
    public authService: AuthService,
    private router: Router,
    public fpService: FinancialPlanningService,
    private act: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.paginationLengthFp()
    this.listFinancialPlanning()
    this.listHistoryFinancialPlanning()
    this.totalHistoryFinancialPlanning()
  }

  paginationLengthFp() {
    this.fpService.getFinancialPlanningList(this.authService.userData.uid).subscribe(res => {
        this.totalLength = res.length
        })
  }

  listFinancialPlanning() {
    const idHistoryFp = this.act.snapshot.paramMap.get('id')

    this.fpService.getFinancialPlanningDoc(this.authService.userData.uid, idHistoryFp).subscribe(res => {
      this.FinancialPlanning = res
      this.FinancialPlanning.id = idHistoryFp
    })

  }

  listHistoryFinancialPlanning() {
    const idHistoryFp = this.act.snapshot.paramMap.get('id')

    this.fpService.getHistoryFinancialPlanningList(this.authService.userData.uid, idHistoryFp).subscribe(res => {
      this.FinancialHistoryPlanning = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as unknown;
      })

      if(this.FinancialHistoryPlanning.length === 0) {
        this.fpService.deleteFinancialPlanning(this.authService.userData.uid, idHistoryFp)
        this.router.navigate([`dashboard/financial-planning`])
      }

    })

  }

  totalHistoryFinancialPlanning() {
    const idHistoryFp = this.act.snapshot.paramMap.get('id')
    this.fpService.getHistoryFinancialPlanningList(this.authService.userData.uid, idHistoryFp)
    .subscribe(res => {
      
      let allValues = res.map(e => {
        return {
          valor: e.payload.doc.data().valorHistoricoPF,
        } 

      })
      
      this.valor = allValues.reduce((total, valor) => total + valor.valor, 0);

      return this.valor

    })
  }

    modalAddFinancialPlanningHistory() {
    this.modalFpService.showAddFinancialPlanning(this.FinancialPlanning)
  }

  modalDeleteFinancialPlanningHistory(fp: any) {

    this.modalFpService.showDeleteHistoryFinancialPlanning(fp, this.FinancialPlanning.id)
  }

}
