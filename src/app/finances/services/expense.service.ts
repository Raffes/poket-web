import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { Expense } from '../modal/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
    private angFireDB: AngularFirestore,
    private alertService: AlertModalService,
  ) { }

     // Cria desepesa no firestore
     createExpense(expense: Expense, uid: any, conta: any, valor: any, valorNaConta: any) {
      return this.angFireDB.collection("despesas").doc(uid).collection(uid).add(expense)
        .then(() => {
  
            // atualizar a conta incrementando a renda
            // if(parseInt(valorNaConta) > parseInt(valor)) {
              let subWallet =  parseInt(valorNaConta) - parseInt(valor)
              return this.angFireDB
                .collection("contas").doc(uid).collection(uid)
                .doc(conta)
                .update({
                  valor: subWallet
                }).then(() => this.alertService.showAlertSuccess("Despesa adicionada com sucesso"))
                
            // }else{
            //   return
            //   this.alertService.showAlertDanger("Não há saldo na conta")
            // }
            
          
          
          
  
        }).catch((error) => {
          this.alertService.showAlertDanger(error)
        })
    }



  //Atualiza dados de um documento
  updateExpense(expense: Expense, uid: any, idExpense: any, idWalletAntigo: any, idWallet: any, valorNaContaAntiga: any, valorNaConta: any) {
    return this.angFireDB
      .collection("despesas").doc(uid).collection(uid)
      .doc(idExpense)
      .update({
        despesa: expense.despesa,
        valorDespesa: expense.valorDespesa,
        dataDespesa: expense.dataDespesa,
        tipoDespesa: expense.tipoDespesa,
        conta: expense.conta,
        observacao: expense.observacao

      }).then(() => {
         // atualizar a conta incrementando a renda
         let subWallet =  parseInt(valorNaContaAntiga) - expense.valorDespesa
         let sumWallet =  parseInt(valorNaConta) + expense.valorDespesa

         this.angFireDB
           .collection("contas").doc(uid).collection(uid)
           .doc(idWalletAntigo)
           .update({
             valor: sumWallet
           })

         return this.angFireDB
           .collection("contas").doc(uid).collection(uid)
           .doc(idWallet)
           .update({
             valor: subWallet
           })
      })

  }

    // Deleta um documento de uma coleção
    deleteExpense(uid: any, idExpense: any, idWallet: any, valorNaContaAntiga: any, valorNaConta: any) {
      return this.angFireDB.collection("despesas").doc(uid)
        .collection(uid)
        .doc(idExpense)
        .delete()
        .then(() => {
          // atualizar a conta incrementando a renda
          let subWallet =  parseInt(valorNaContaAntiga) + valorNaConta
 
          this.angFireDB
            .collection("contas").doc(uid).collection(uid)
            .doc(idWallet)
            .update({
              valor: subWallet
            })
 
          
       })
    }

  // Listar todos os documetos de uma coleção
  getExpenseList(uid: any) {
    return this.angFireDB.collection("despesas").doc(uid)
      .collection(uid)
      .snapshotChanges();
  }

    // Lista dados de um documento
    getExpenseDoc(uid: any, idExpense: any) {
      return this.angFireDB.collection("despesas").doc(uid)
        .collection(uid).doc(idExpense)
        .valueChanges()
    }

}
