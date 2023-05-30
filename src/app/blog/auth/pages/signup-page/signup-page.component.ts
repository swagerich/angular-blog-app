import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from 'src/app/shared/validators.service';
import { SignupDto } from 'src/app/blog/interfaces/proyection/signupDto.interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent {
  private fb = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private route = inject(Router);
  private validatorService = inject(ValidatorsService);

  public myForm: FormGroup = this.fb.group({
    id: [0],
    nombre: ['',[Validators.required],[this.validatorService.cantBeUsername.bind(this.validatorService)]],
    apellido: ['', [Validators.required]],
    email: ['',[Validators.required,Validators.pattern(this.validatorService.emailPattern)],[this.validatorService.cantBeMail.bind(this.validatorService)]],
    password: ['', Validators.required]
  });

  get currentUser(): SignupDto {
    return this.myForm.value as SignupDto;
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.authService.signupUser(this.currentUser).subscribe({
      next: () => {
       // Swal.fire('¡Exito!', 'Registrado con exito.', 'success');
      },
      error: (e) => {
        if (e.status === 500) {
          this.validatorService.validateSnackBar(
            'A system error has occurred!'
          );
        }else{
          Swal.fire('¡Exito!', 'Registrado con exito.', 'success')
          .then(e =>{
            if(e.isConfirmed){
              //NAVEGAMOS A USER
              this.route.navigate(['login']);
            }
          });
        }
      },
      complete:() =>{
        this.myForm.reset();
      }
    });

  }

  onFielValidators(field: string): boolean | null {
    return this.validatorService.isValidField(this.myForm, field);
  }
  onFieldValitatorRequiredLength(field: string): string | null {
    return this.validatorService.isValidFieldLength(this.myForm, field);
  }
}
