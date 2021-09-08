import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
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
import { ExpenseComponent } from './finances/components/expense/expense.component';
import { IncomeComponent } from './finances/components/income/income.component';
import { FinancialPlanningComponent } from './finances/components/financial-planning/financial-planning.component';
import { EditWalletModalComponent } from './finances/containers/edit-wallet-modal/edit-wallet-modal.component';
import { DeleteWalletModalComponent } from './finances/containers/delete-wallet-modal/delete-wallet-modal.component';
import { CreateWalletModalComponent } from './finances/containers/create-wallet-modal/create-wallet-modal.component';
import { UpdateNicknameModalComponent } from './users/containers/update-nickname-modal/update-nickname-modal.component';
import { UpdateEmailModalComponent } from './users/containers/update-email-modal/update-email-modal.component';
import { DeleteUserModalComponent } from './users/containers/delete-user-modal/delete-user-modal.component';
import { UpdatePasswordModalComponent } from './users/containers/update-password-modal/update-password-modal.component';


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
    ExpenseComponent,
    IncomeComponent,
    FinancialPlanningComponent,
    EditWalletModalComponent,
    DeleteWalletModalComponent,
    CreateWalletModalComponent,
    UpdateNicknameModalComponent,
    UpdateEmailModalComponent,
    DeleteUserModalComponent,
    UpdatePasswordModalComponent,
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    FormsModule, 
    ModalModule.forRoot(),
    ReactiveFormsModule, 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule

  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule { }
