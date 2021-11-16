import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './authentication/components/forgot-password/forgot-password.component';
import { LandingPageComponent } from './authentication/components/landing-page/landing-page.component';
import { LoginPageComponent } from './authentication/components/login-page/login-page.component';
import { VerifyEmailComponent } from './authentication/components/verify-email/verify-email.component';
import { AuthGuard } from './authentication/services/auth.guard';
import { DashboardComponent } from './finances/components/dashboard/dashboard.component';
import { ExpenseHistoryComponent } from './finances/components/expense/expense-history/expense-history.component';
import { ExpenseComponent } from './finances/components/expense/expense/expense.component';
import { FinancialPlanningHistoryComponent } from './finances/components/financial-planning/financial-planning-history/financial-planning-history.component';
import { FinancialPlanningComponent } from './finances/components/financial-planning/financial-planning/financial-planning.component';
import { IncomeHistoryComponent } from './finances/components/income/income-history/income-history.component';
import { IncomeComponent } from './finances/components/income/income/income.component';
import { WalletComponent } from './finances/components/wallet/wallet.component';
import { ExpenseDashboardPieGraphComponent } from './finances/containers/graphics/dashboard/expense-dashboard-pie-graph/expense-dashboard-pie-graph.component';
import { ExpenseIncomeBarGraphComponent } from './finances/containers/graphics/dashboard/expense-income-bar-graph/expense-income-bar-graph.component';
import { FinancialDashboardProgressComponent } from './finances/containers/graphics/dashboard/financial-dashboard-progress/financial-dashboard-progress.component';
import { IncomeDashboardPieGraphComponent } from './finances/containers/graphics/dashboard/income-dashboard-pie-graph/income-dashboard-pie-graph.component';
import { ExpenseBarGraphComponent } from './finances/containers/graphics/expense/expense-bar-graph/expense-bar-graph.component';
import { ExpensePieGraphComponent } from './finances/containers/graphics/expense/expense-pie-graph/expense-pie-graph.component';
import { IncomeBarGraphComponent } from './finances/containers/graphics/income/income-bar-graph/income-bar-graph.component';
import { IncomePieGraphComponent } from './finances/containers/graphics/income/income-pie-graph/income-pie-graph.component';
import { UpdateUserComponent } from './users/components/update-user/update-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'login', component: LoginPageComponent },
  
  { path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'dashboard-bar-graph', component: ExpenseIncomeBarGraphComponent, children: [
        { path: 'income-pie', component: IncomeDashboardPieGraphComponent, children: [
          { path: 'expense-pie', component: ExpenseDashboardPieGraphComponent, children: [
            { path: 'financial-progress', component: FinancialDashboardProgressComponent }
          ] }
        ] },
      ] },
      { path: 'update-user', component: UpdateUserComponent },
      { path: 'wallet', component: WalletComponent },
      { path: "income", component: IncomeComponent, children: [
        { path: 'income-bar-graph', component: IncomeBarGraphComponent, children: [
          { path: 'income-pie-graph', component: IncomePieGraphComponent }
        ] },
        { path: "income-history", component: IncomeHistoryComponent },
      ] },
      { path: "expense", component: ExpenseComponent, children: [
        { path: 'expense-bar-graph', component: ExpenseBarGraphComponent, children: [
          { path: 'expense-pie-graph', component: ExpensePieGraphComponent }
        ] },
        { path: "expense-history", component: ExpenseHistoryComponent },
      ] },
      { path: "financial-planning", component: FinancialPlanningComponent },
      { path: "financial-planning/financial-planning-history/:id", component: FinancialPlanningHistoryComponent },
      
      
      
    ],
    
    canActivate: [AuthGuard] }

  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'menu-update-account', component: MenuUpdateAccountComponent, canActivate: [AuthGuard] },
  // { path: 'update-user', component: UpdateUserComponent, canActivate: [AuthGuard] },
  // { path: 'update-password', component: UpdatePasswordComponent , canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
