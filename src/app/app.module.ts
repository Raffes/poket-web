import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule  } from 'ngx-bootstrap/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './finances/components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './authentication/components/forgot-password/forgot-password.component';
import { LandingPageComponent } from './authentication/components/landing-page/landing-page.component';
import { VerifyEmailComponent } from './authentication/components/verify-email/verify-email.component';
import { AuthService } from './authentication/services/auth.service';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AlertModalComponent } from './shared/alert-modal/alert-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorMsgComponent } from './shared/error-msg/error-msg.component';
import { UpdateUserComponent } from './users/components/update-user/update-user.component';
import { MsgErrorComponent } from './authentication/containers/msg-error/msg-error.component';
import { WalletComponent } from './finances/components/wallet/wallet.component';
import { FinancialPlanningComponent } from './finances/components/financial-planning/financial-planning/financial-planning.component';
import { EditWalletModalComponent } from './finances/containers/wallet-crud-modal/edit-wallet-modal/edit-wallet-modal.component';
import { DeleteWalletModalComponent } from './finances/containers/wallet-crud-modal/delete-wallet-modal/delete-wallet-modal.component';
import { CreateWalletModalComponent } from './finances/containers/wallet-crud-modal/create-wallet-modal/create-wallet-modal.component';
import { UpdateNicknameModalComponent } from './users/containers/update-nickname-modal/update-nickname-modal.component';
import { UpdateEmailModalComponent } from './users/containers/update-email-modal/update-email-modal.component';
import { DeleteUserModalComponent } from './users/containers/delete-user-modal/delete-user-modal.component';
import { UpdatePasswordModalComponent } from './users/containers/update-password-modal/update-password-modal.component';
import { IncomeGraphComponent } from './finances/components/income/income-graph/income-graph.component';
import { IncomeHistoryComponent } from './finances/components/income/income-history/income-history.component';
import { IncomeComponent } from './finances/components/income/income/income.component';
import { CreateIncomeModalComponent } from './finances/containers/income-crud-modal/create-income-modal/create-income-modal.component';
import { DeleteIncomeModalComponent } from './finances/containers/income-crud-modal/delete-income-modal/delete-income-modal.component';
import { EditIncomeModalComponent } from './finances/containers/income-crud-modal/edit-income-modal/edit-income-modal.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ExpenseComponent } from './finances/components/expense/expense/expense.component';
import { ExpenseGraphComponent } from './finances/components/expense/expense-graph/expense-graph.component';
import { ExpenseHistoryComponent } from './finances/components/expense/expense-history/expense-history.component';
import { CreateExpenseModalComponent } from './finances/containers/expense-crud-modal/create-expense-modal/create-expense-modal.component';
import { DeleteExpenseModalComponent } from './finances/containers/expense-crud-modal/delete-expense-modal/delete-expense-modal.component';
import { EditExpenseModalComponent } from './finances/containers/expense-crud-modal/edit-expense-modal/edit-expense-modal.component';
import { DeleteFinancialPlanningModalComponent } from './finances/containers/financial-planning-crud-modal/delete-financial-planning-modal/delete-financial-planning-modal.component';
import { CreateFinancialPlanningModalComponent } from './finances/containers/financial-planning-crud-modal/create-financial-planning-modal/create-financial-planning-modal.component';
import { EditFinancialPlanningModalComponent } from './finances/containers/financial-planning-crud-modal/edit-financial-planning-modal/edit-financial-planning-modal.component';
import { FinancialPlanningHistoryComponent } from './finances/components/financial-planning/financial-planning-history/financial-planning-history.component';
import { AddValueFinancialPlanningModalComponent } from './finances/containers/financial-planning-crud-modal/add-value-financial-planning-modal/add-value-financial-planning-modal.component';
import { DeleteValueFinancialPlanningModalComponent } from './finances/containers/financial-planning-crud-modal/delete-value-financial-planning-modal/delete-value-financial-planning-modal.component';

registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    LandingPageComponent,
    VerifyEmailComponent,
    AlertModalComponent,
    ErrorMsgComponent,
    UpdateUserComponent,
    MsgErrorComponent,
    WalletComponent,
    FinancialPlanningComponent,
    EditWalletModalComponent,
    DeleteWalletModalComponent,
    CreateWalletModalComponent,
    UpdateNicknameModalComponent,
    UpdateEmailModalComponent,
    DeleteUserModalComponent,
    UpdatePasswordModalComponent,
    IncomeGraphComponent,
    IncomeHistoryComponent,
    IncomeComponent,
    CreateIncomeModalComponent,
    DeleteIncomeModalComponent,
    EditIncomeModalComponent,
    ExpenseComponent,
    ExpenseGraphComponent,
    ExpenseHistoryComponent,
    CreateExpenseModalComponent,
    DeleteExpenseModalComponent,
    EditExpenseModalComponent,
    DeleteFinancialPlanningModalComponent,
    CreateFinancialPlanningModalComponent,
    EditFinancialPlanningModalComponent,
    FinancialPlanningHistoryComponent,
    AddValueFinancialPlanningModalComponent,
    DeleteValueFinancialPlanningModalComponent,
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    FormsModule, 
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule,
    NgxPaginationModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
    ReactiveFormsModule, 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule

  ],
  providers: [AuthService, { provide: LOCALE_ID, useValue: 'pt-Br' }],
  bootstrap: [AppComponent],
})
export class AppModule { }
