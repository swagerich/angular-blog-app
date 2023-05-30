import { Injectable, inject } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../blog/auth/services/auth.service';
import {
  Observable,
  catchError,
  debounce,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  throwError,
  timer,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  private snackBar = inject(MatSnackBar);

  private authService: AuthService = inject(AuthService);

  /* VALIDACION CAMPOS */
  public isValidField = (myForm: FormGroup, field: string): boolean | null => {
    return myForm.controls[field].errors && myForm.controls[field].touched;
  };

  /* VALIDAR LONGITUD */
  public isValidFieldLength = (
    myForm: FormGroup,
    field: string
  ): string | null => {
    if (!myForm.controls[field]) return null;
    const error = myForm.controls[field].errors || {};
    for (let e of Object.keys(error)) {
      switch (e) {
        case 'required':
          return 'required';
        case 'minlength':
          return `the minimum length is ${error['minlength'].requiredLength} characters`;
        case 'maxlength':
          return `the maximun length is ${error['maxlength'].requiredLength} characters`;
      }
    }
    return null;
  };

  /* MOSTRAR SNACKBAR MATERIAL  */
  validateSnackBar(error: string): void {
    this.snackBar.open(error, 'done', {
      duration: 3000,
    });
  }

  //VALIDACION FUNCIONTS IS EXIST Username
  /* public cantBeUsername = (control: FormControl): ValidationErrors | null => {

    const value: string = control.value.trim().toLowerCase();
    if (value === 'admin') {
      return {
        noSwagerich: true,
      };
    }
    return null;
  }; */

  //VALIDACION FUNCTIONS IS EXIST Username
  public cantBeUsername(
    control: FormControl
  ): Observable<ValidationErrors | null> {
    const value: string = control.value.trim().toLowerCase();

    return timer(1000).pipe(
      switchMap(() => {
        return this.authService.existsName(value).pipe(
          map((exists: boolean) => {
            if (exists) {
              return { usernameExists: true };
            }
            return null;
          }),
          catchError((error) => {
            if (error.status === 404) {
              return of(null);
            } else {
              return throwError(() => error);
            }
          })
        );
      }),
      debounce(() => timer(1000)),
      distinctUntilChanged()
    );
  }

  //VALIDACION FUNCIONTS IS EXIST Email
  public cantBeMail(control: FormControl): Observable<ValidationErrors | null> {
    const value: string = control.value.trim().toLowerCase();

    return timer(1000).pipe(
      switchMap(() => {
        return this.authService.existsMail(value).pipe(
          map((exists: boolean) => {
            if (exists) {
              return { mailExists: true };
            }
            return null;
          }),
          catchError((e) => of(null))
        );
      }),
      catchError((error) => {
        if (error.status === 404) {
          return of(null);
        } else {
          return throwError(() => error);
        }
      }),
      debounce(() => timer(1000)),
      distinctUntilChanged()
    );
  }

  /* VALIDACIONES PATTERN */
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
}
