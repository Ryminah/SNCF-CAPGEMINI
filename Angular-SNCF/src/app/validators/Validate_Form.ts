import { AbstractControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';



export function urlValidator(control: AbstractControl) {
  var test = (/[a-zA-Z]/.test(control.value))

  var nbr=control.value;
  console.log(isNaN(nbr))

  if (!(isNaN(nbr))) {
    return { urlValid: true };
  }

  return null;
}


