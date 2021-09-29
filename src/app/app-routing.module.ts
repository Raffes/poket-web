import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './authentication/components/forgot-password/forgot-password.component';
import { LandingPageComponent } from './authentication/components/landing-page/landing-page.component';
import { VerifyEmailComponent } from './authentication/components/verify-email/verify-email.component';
import { MsgErrorComponent } from './authentication/containers/msg-error/msg-error.component';
import { AuthGuard } from './authentication/services/auth.guard';
import { DashboardComponent } from './finances/components/dashboard/dashboard.component';
import { ExpenseGraphComponent } from './finances/components/expense/expense-graph/expense-graph.component';
import { ExpenseHistoryComponent } from './finances/components/expense/expense-history/expense-history.component';
import { ExpenseComponent } from './finances/components/expense/expense/expense.component';
import { IncomeGraphComponent } from './finances/components/income/income-graph/income-graph.component';
import { IncomeHistoryComponent } from './finances/components/income/income-history/income-history.component';
import { IncomeComponent } from './finances/components/income/income/income.component';
import { WalletComponent } from './finances/components/wallet/wallet.component';
import { UpdateUserComponent } from './users/components/update-user/update-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'msg-error', component: MsgErrorComponent },
  
  { path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'update-user', component: UpdateUserComponent },
      { path: 'wallet', component: WalletComponent },
      { path: "income", component: IncomeComponent, children: [
        { path: 'income-graph', component: IncomeGraphComponent },
        { path: "income-history", component: IncomeHistoryComponent },
      ] },
      { path: "expense", component: ExpenseComponent, children: [
        { path: 'expense-graph', component: ExpenseGraphComponent },
        { path: "expense-history", component: ExpenseHistoryComponent },
      ] },
      
      
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
