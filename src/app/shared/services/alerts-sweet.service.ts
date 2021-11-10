import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

enum AlertTypes {
  DANGER = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info'
}

@Injectable({
  providedIn: 'root'
})
export class AlertsSweetService {

  constructor() { }

  showSweetAlertSuccess(message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: AlertTypes.SUCCESS,
      iconColor: '#198754',
      title: `<spam class='text-success'>${message}</spam>`,
      background: '#d1e7dd'
    })

  }

  showSweetAlertWarning(message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: AlertTypes.WARNING,
      iconColor: 'white',
      title: `<spam class='text-light'>${message}</spam>`,
      background: '#ffc107'
    })

  }

  showSweetAlertError(message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: AlertTypes.DANGER,
      iconColor: 'white',
      title: `<spam class='text-light'>${message}</spam>`,
      background: '#dc3545'
    })

  }

  showSweetAlertInfo(message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: AlertTypes.INFO,
      iconColor: 'white',
      title: `<spam class='text-light'>${message}</spam>`,
      background: '#0d6efd'
    })

  }


}
