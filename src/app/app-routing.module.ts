import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './authentication/components/forgot-password/forgot-password.component';
import { LandingPageComponent } from './authentication/components/landing-page/landing-page.component';
import { VerifyEmailComponent } from './authentication/components/verify-email/verify-email.component';
import { MsgErrorComponent } from './authentication/containers/msg-error/msg-error.component';
import { AuthGuard } from './authentication/services/auth.guard';
import { DashboardComponent } from './finances/dashboard/components/dashboard/dashboard.component';
import { UpdatePasswordComponent } from './users/components/update-password/update-password.component';
import { UpdateUserComponent } from './users/components/update-user/update-user.component';
import { MenuUpdateAccountComponent } from './users/containers/menu-update-account/menu-update-account.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'msg-error', component: MsgErrorComponent },
  
  { path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'menu-update-account', component: MenuUpdateAccountComponent,
        children: [
          { path: 'update-user', component: UpdateUserComponent },
          { path: 'update-password', component: UpdatePasswordComponent }
      ] }
    ],
    
    canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
