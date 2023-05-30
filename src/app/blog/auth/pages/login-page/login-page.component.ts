import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginDto } from 'src/app/blog/interfaces/proyection/loginDto.interface';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidatorsService } from 'src/app/shared/validators.service';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private route = inject(Router);
  private validatorService = inject(ValidatorsService);

  public hide = signal(true);

  public myForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
 
  });

  ngOnInit(): void {
  }

  get currentLogin(): LoginDto {
    return this.myForm.value as LoginDto;
  }
  onSubmit(): void {
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    this.authService.userWithToken(this.currentLogin).subscribe({
      next: (data) => {
        this.authService.userSaveTokenLocalStorage(data.accessToken);
        this.authService.getCurrentUser().subscribe({
          //USER PRINCIPAL
          next: (user: any) => {
             this.authService.setUser(user);
             
            if (this.authService.getUserRole() == 'ROLE_ADMIN') {
              this.route.navigate(['/admin/welcome']);
              this.authService.loginStatusSubject.next(true);
            } else if (this.authService.getUserRole() == 'ROLE_USER') {
              this.route.navigate(['/user/welcome']);
              this.authService.loginStatusSubject.next(true);
            } else {
              this.authService.logout();
            } 
          },
        });
      },
      error:()=>{
          this.validatorService.validateSnackBar("Datos invalidos, inténtelo de nuevo porfavor !");
      }
    });
  }
 
  onFielValidators(field: string): boolean | null {
     return this.validatorService.isValidField(this.myForm,field);
  }
}
