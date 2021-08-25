import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {

@Input() msgError: string = '';
@Input() showError?: boolean;


  @Input()
  control: FormControl = new FormControl;

  constructor() { }

  ngOnInit(): void {
  }

  get errorMessage() {

    for(const propertyName in this.control.errors)
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {

          }

    return null;
  }

}
