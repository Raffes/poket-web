import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './finances/dashboard/components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './authentication/components/forgot-password/forgot-password.component';
import { LandingPageComponent } from './authentication/components/landing-page/landing-page.component';
import { VerifyEmailComponent } from './authentication/components/verify-email/verify-email.component';
import { AuthService } from './authentication/services/auth.service';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    LandingPageComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule, 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
