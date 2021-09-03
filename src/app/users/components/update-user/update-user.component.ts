import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  public editUserInformation: FormGroup;

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private alertService: AlertModalService
  ) {
      this.editUserInformation = this.formBuilder.group({
        displayName: ["", Validators.maxLength(30)],
        email: ["", Validators.maxLength(30)]
      })
   }

  ngOnInit(): void {
    this.editUserInformation = this.formBuilder.group({
        displayName: [this.authService.userData.displayName],
        email: [this.authService.userData.email]
    })
  }


  onSubmit(){
    const name = this.editUserInformation.get('displayName')
    const email = this.editUserInformation.get('email')

      if(name?.value == "" || email?.value == ""){
        this.alertService.showAlertDanger("Falta campos para preencher");

      }else {
        this.authService.updateUserEmailNickname(this.editUserInformation.value)
      }
  }

}
