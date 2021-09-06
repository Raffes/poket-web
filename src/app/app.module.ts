import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

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
import { MenuUpdateAccountComponent } from './users/containers/menu-update-account/menu-update-account.component';
import { UpdateUserComponent } from './users/components/update-user/update-user.component';
import { UpdatePasswordComponent } from './users/components/update-password/update-password.component';
import { MsgErrorComponent } from './authentication/containers/msg-error/msg-error.component';
import { WalletComponent } from './finances/components/wallet/wallet.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    LandingPageComponent,
    VerifyEmailComponent,
    AlertModalComponent,
    ErrorMsgComponent,
    MenuUpdateAccountComponent,
    UpdateUserComponent,
    UpdatePasswordComponent,
    MsgErrorComponent,
    WalletComponent,
  ],
  imports: [
    BrowserModule,
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
  // exports: [AlertModalComponent]
})
export class AppModule { }
