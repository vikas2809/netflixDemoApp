import { AbstractControl } from '@angular/forms';
export class ValidationService {
 
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
      let config = {
          'required': 'Required',
          'invalidEmailAddress': 'Invalid email address',
          'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
          'minlength': `Minimum length ${validatorValue.requiredLength}`,
          'matchPassword': 'password doesnot match'
      };

      return config[validatorName];
  }

  static emailValidator(control) {
      // RFC 2822 compliant regex
      if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
          return null;
      } else {
          return { 'invalidEmailAddress': true };
      }
  }

  static passwordValidator(control) {
      // {6,100}           - Assert password is between 6 and 100 characters
      // (?=.*[0-9])       - Assert a string has at least one number
      if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
          return null;
      } else {
          return { 'invalidPassword': true };
      }
  }

  static MatchPassword(abstractControl:AbstractControl){
      let password = abstractControl.get('password').value; //to get value in input tag
    //   console.log(password);
      let password_confirmation = abstractControl.get('password_confirmation').value;
    //   console.log(password_confirmation);
      if(password !== password_confirmation){
        //   console.log('false');
          abstractControl.get('password_confirmation').setErrors( {'matchPassword' : true});
          return { 'matchPassword': true}
      }
      else
      {
        // return { 'matchPassword': true };
          return null;
      }
  }
//   static confirmPasswordValidator(control)
//   {
//       // {6,100}           - Assert password is between 6 and 100 characters
//       // (?=.*[0-9])       - Assert a string has at least one number
//       if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
//         return null;
//     } else {
//         return { 'invalidPassword': true };
//     }
//   }
}