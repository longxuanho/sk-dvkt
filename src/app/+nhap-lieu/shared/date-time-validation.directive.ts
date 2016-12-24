import { ValidatorFn, AbstractControl } from '@angular/forms';

declare var moment: any;

/** Thời gian (String) phải hợp lệ để chuyển đổi sang DateTime - Ref: https://angular.io/docs/ts/latest/cookbook/form-validation.html#!#reactive */
export function dateTimeValidator(dateTimeFormat: string = 'DD/MM/YYYY hh:mm A'): ValidatorFn {
  
  return (control: AbstractControl): {[key: string]: any} => {
    const dateTime = control.value;
    const no = !moment(dateTime, dateTimeFormat).isValid();
    return no ? {'dateTimeInvalid': {dateTime}} : null;
  };
}