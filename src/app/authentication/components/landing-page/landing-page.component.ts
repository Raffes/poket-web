import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  public userRegister: FormGroup

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder
  ) { 
    this.userRegister = this.formBuilder.group({
      displayName: [""],
      email: [""],
      password: [""]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.SignUp(this.userRegister.value)
  }

  validar() {

    // let password = formRegisterUser.passwordRegister.value
    // let confirmPassword = formRegisterUser.ConPasswordRegister.value

    // if(password == '' || password.length <= 12){
    //     alert('Menor que 12 digitos ou esta vazia');
    //     formRegisterUser.passwordRegister.focus()
    //     return false
    // }

    // if(password != confirmPassword){
    //     alert('Senhas diferentes');
    //     formRegisterUser.ConPasswordRegister.focus()
    //     return false
    // }

    // if(confirmPassword == '' || confirmPassword.length <= 12){
    //         alert('Menor que 12 digitos ou esta vazia');
    //         formRegisterUser.ConPasswordRegister.focus()

    //     document.getElementById("confPwd").style.display = "block"
    //     document.getElementById("confPwd").innerHTML = "confirmação errada diferentes"
    //         return false
    // }
}

}
