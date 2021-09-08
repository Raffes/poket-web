import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  isLoggedIn: boolean = false;
  userData: any;

  constructor(
    public angFireStore: AngularFirestore,
    public angFireAuth: AngularFireAuth,
    public router: Router,
    private alertService: AlertModalService

  ) {
      this.angFireAuth.onAuthStateChanged((user) => {
        if (user) {
          this.isLoggedIn = true;

          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user') || '{}');

        } else {
          this.isLoggedIn = false;

          localStorage.setItem('user', '{}');
          JSON.parse(localStorage.getItem('user') || '{}');

        }
      })
   }


// Cadastra usuário pelo email/senha | Sign up with email/password
SignUp(userData: User) {
  return this.angFireAuth.createUserWithEmailAndPassword(userData.email, userData.password)
  .then((result) => {
    
    // Atualizar o nome do usuário | update the user name
    result.user?.updateProfile({
      displayName: userData.displayName
    }).then((resultUser) => {
      result.user?.providerData.forEach((profile) => {
        console.log("Sign-in provider: " + profile?.providerId);
        console.log("  Provider-specific UID: " + profile?.uid);
        console.log("  Name: " + profile?.displayName);
        console.log("  Email: " + profile?.email);
        console.log("  Photo URL: " + profile?.photoURL);
      });
    })

    // FIXME arrumar um jeito para limpar o form quando o usuário cadastrar

    // document.location.reload();
    this.alertService.showAlertSuccess("Cadastro feito com sucesso, faça o login para acessar :)");
    
  }).catch((error) => {
    this.alertService.showAlertDanger("Email ou senha inválidos");
    console.error(error)
  })
  
}

// Loga com email/senha |  Sign in with email/password
SignIn(email: string, password: string): Promise<any> {
  return this.angFireAuth.signInWithEmailAndPassword(email, password)
  .then(() => {

    console.log('Auth Service: loginUser: success');
    
    this.router.navigate(['dashboard']).then(() => {
      window.location.reload()
    })
    
  }).catch((error) => {
    this.alertService.showAlertDanger("Dados não encontrados. Verifique seu email e senha ou crie uma conta");
    console.error(error)
  })
}


// Manda email quando o usuário esquece a senha | Send email when user Forgot password
ForgotPassword(passwordResetEmail: string) {
  return this.angFireAuth.sendPasswordResetEmail(passwordResetEmail)
  .then(() => {
    this.alertService.showAlertDanger("O link para atualizar sua senha foi mandado para seu email, verifique sua caixa.");
  }).catch((error => {
    
    console.error(error)
  })) 
}


// Sair da autenticação do usuário | Sign out
SignOut() {
  return this.angFireAuth.signOut().then(() => {
    localStorage.removeItem('user');

    this.router.navigate(['landing-page'])
  })
}

// Atualiza o apelido do usuário | Update the user email
updateUserEmail(user: User) {
  return this.angFireAuth.currentUser.then((result) => {
    
    result?.updateEmail(user.email).then(() => {
      this.alertService.showAlertSuccess("Email atualizado com sucesso");

    }).catch((error) => {

      if(error.code == "auth/requires-recent-login"){
      this.alertService.showAlertDanger("Refaça o login no sistema para alterar senha");

      }else if(error.code == "auth/email-already-in-use"){
        this.alertService.showAlertDanger("Email já em uso");

      }
      console.warn(error)
    })

    

  }).catch((error) => {
    this.alertService.showAlertDanger("Apelido ou email inválidos");
    console.warn(error)
  })
  
}

// Atualiza o apelido do usuário | Update the user nickname
updateUserNickname(user: User) {
  return this.angFireAuth.currentUser.then((result) => {

    result?.updateProfile({
      displayName: user.displayName
    })

    this.alertService.showAlertSuccess("Apelido atualizado com com sucesso");

  }).catch((error) => {
    this.alertService.showAlertDanger("Campo inválido");
    console.error(error)
  })
  
}

// Atualiza a senha | Update the user password
updatePassword(user: User) {
  return this.angFireAuth.currentUser.then((result) =>{
    result?.updatePassword(user.password).then(() => {
      this.alertService.showAlertSuccess("Senha atualizada com sucesso");
    }).catch((error) => {
      this.alertService.showAlertDanger("Refaça o login no sistema para alterar senha");
      console.warn(error)
    })

  }).catch((error) => {
    console.error(error)
  })
  
}

// Deleta usuário | Delete user 
deleteUser(uid: any) {
  return this.angFireAuth.currentUser.then((result) => {
    
    result?.delete().then(() => {

      this.angFireStore.collection("contas").doc(uid)
      .collection(uid).doc()
      .delete()

    }).catch((error) => {
      console.warn("Deu ruim", error)
    })
  })
}

// deleteUser1() {
//   return this.angFireAuth.currentUser.then((result) => {
//     result?.delete().then(() => {
//       console.log("Excluido conta")
//     }).catch((error) => {
//       console.warn("Deu ruim", error)
//     })
//   })
// }


}
