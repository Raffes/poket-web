import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './authentication/components/forgot-password/forgot-password.component';
import { LandingPageComponent } from './authentication/components/landing-page/landing-page.component';
import { VerifyEmailComponent } from './authentication/components/verify-email/verify-email.component';
import { MsgErrorComponent } from './authentication/containers/msg-error/msg-error.component';
import { AuthGuard } from './authentication/services/auth.guard';
import { DashboardComponent } from './finances/components/dashboard/dashboard.component';
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
      { path: 'wallet', component: WalletComponent }
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
