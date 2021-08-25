import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public recoveryEmailUser: FormGroup

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder
  ) {
    this.recoveryEmailUser = this.formBuilder.group({
      passwordResetEmail: [""]
    })
   }

  ngOnInit(): void {
  }

  onSubmitForgotPassword() {
    this.authService.ForgotPassword(this.recoveryEmailUser.value)
  }

}
