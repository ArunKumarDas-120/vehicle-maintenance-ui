import { Directive } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[dateValidator][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DateValidator, multi: true }]
})
export class DateValidator implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors {

    if (control.value == undefined) {
      return [{ "invalidDate": true }];
    }
    else {
      let currentDate = new Date();
      let controlDate = new Date(control.value);
	  if(controlDate.getFullYear() > currentDate.getFullYear())
		   return [{ "invalidDate": true }];
	  if(controlDate.getFullYear() == currentDate.getFullYear()){ 
		  if(controlDate.getMonth() > currentDate.getMonth()){
			  return [{ "invalidDate": true }]; 
		  }  
		  if((controlDate.getMonth() == currentDate.getMonth()) && (controlDate.getDate() > currentDate.getDate())){
			   return [{ "invalidDate": true }]; 
		  }
	  }
    }
    return null
  }


}
