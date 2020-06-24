import { Injectable } from "@angular/core";
import {
  AbstractControl,
  ValidatorFn,
  FormGroup,
  ValidationErrors
} from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class ValidatorsService {
  constructor() {}

  confirmPassword(password: string) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.value === password ? { confirmPassword: true } : null;
    };
  }
  passwordLength: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: any } | null => {
    debugger;
    if (control.value != "" && control.value != null) {
      return control.value.length > 6
        ? null
        : { invalidLength: { valid: false, value: control.value } };
    }
    return null;
  };

  patternValidation(pattern: RegExp) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      debugger;
      if (control.value != "" && control.value != null) {
        const forbidden = pattern.test(control.value);
        return forbidden
          ? null
          : { invalidPattern: { valid: false, value: control.value } };
      }
      return null;
    };
  }
  patternValidationTrainer(pattern: RegExp) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      debugger;
      if (control.value != "" && control.value != null) {
        const forbidden = pattern.test(control.value);
        return forbidden
          ? null
          : { invalidPattern: { valid: false, value: control.value } };
      }
      return null;
    };
  }

  confirmPasswordValidation: ValidatorFn = (
    control: FormGroup
  ): ValidationErrors | null => {
    debugger;
    const name = control.get("password");
    const alterEgo = control.get("confirmPassword");

    return name && alterEgo && name.value === alterEgo.value
      ? { invalidPattern: { confirmPasswordValidation: false } }
      : { invalidPattern: { confirmPasswordValidation: true } };
  };
}
