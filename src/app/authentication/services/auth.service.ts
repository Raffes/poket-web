import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    public angFireStore: AngularFirestore,
    public angFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private alertService: AlertModalService
  ) {
      this.angFireAuth.authState.subscribe(user => {
        if(user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user') || '{}');
        }else {
          localStorage.setItem('user', '');
          JSON.parse(localStorage.getItem('user') || '{}');
        }
      })
   }


//Sign up with email/password
SignUp(userData: User) {
  this.angFireAuth.createUserWithEmailAndPassword(userData.email, userData.password)
  .then((result) => {
    // Call the function sendverficationMail()
    // this.SendVerificationMail()

    

    result.user?.updateProfile({
      displayName: userData.displayName
    }).then((resultUser) => {
      // this.SetUserDataDB(resultUser)
      result.user?.providerData.forEach((profile) => {
        console.log("Sign-in provider: " + profile?.providerId);
        console.log("  Provider-specific UID: " + profile?.uid);
        console.log("  Name: " + profile?.displayName);
        console.log("  Email: " + profile?.email);
        console.log("  Photo URL: " + profile?.photoURL);
      });
      // this.SetUserDataDB(userData, result.user)
    })

    this.alertService.showAlertSuccess("Cadastro feito com sucesso :)");
    
  }).catch((error) => {
    this.alertService.showAlertDanger("Email ou senha inválidos");
    console.error(error)
  })
  // return document.location.reload()
}



// Sign in with email/password
SignIn(email: string, password: string) {
  return this.angFireAuth.signInWithEmailAndPassword(email, password)
  .then((result) => {
    this.ngZone.run(() => {
      this.router.navigate(['dashboard']).then(() => {
        window.location.reload()
      })
    })
    // this.SetUserDataDB(result.user?.displayName, result.user)
  }).catch((error) => {
    this.alertService.showAlertDanger("Dados não encontrados. Verifique seu email e senha ou crie uma conta");
    console.error(error)
  })
}

// Sign in with Google
GoogleAuth() {
  return this.AuthLogin(new firebase.default.auth.GoogleAuthProvider())
}

// To run auth providers
AuthLogin(provider: any) {
  return this.angFireAuth.signInWithPopup(provider)
  .then((result) => {
    this.ngZone.run(() => {
      this.router.navigate(['dashboard']);
    })
    // this.SetUserDataDB(result.user?.displayName, result.user)
  }).catch((error) => {
    console.error(error)
  })
}

// Send email verfification when new user sign up
SendVerificationMail() {
  return this.angFireAuth.currentUser.then(u => u?.sendEmailVerification())
  .then(() => {
    this.router.navigate(['verify-email-address'])
  })
}

// Returns true when user is looged in and email is verified
get isLoggedIn(): boolean {
  const user = JSON.parse(localStorage.getItem('user') || '')
  return (user != null && user.emailVerified !== false) ? true : false
}

// Send email when user Forgot password
ForgotPassword(passwordResetEmail: string) {
  return this.angFireAuth.sendPasswordResetEmail(passwordResetEmail)
  .then(() => {
    window.alert('O link para atualizar sua senha foi mandado para seu email, verifique sua caixa. ')
  }).catch((error => {
    
    console.error(error)
  })) 
}

/* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
SetUserDataDB(userPwd: any, userAuth: any) {
  const userRef: AngularFirestoreDocument<any> = this.angFireStore.doc(`users/${userAuth.uid}`)
  const userData: User = {
    uid: userAuth.uid,
    email: userAuth.email,
    displayName: userAuth.displayName,
    photoURL: userAuth.photoURL,
    emailVerified: userAuth.emailVerified,
    password: userPwd.password
  }

  return userRef.set(userData, {
    merge: true
  })
}

// Sign out
SignOut() {
  return this.angFireAuth.signOut().then(() => {
    localStorage.removeItem('user');
    this.router.navigate(['landing-page']).then(() => {
      document.location.reload()
    })
  })
}


}
