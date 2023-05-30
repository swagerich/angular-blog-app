import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/blog/auth/services/auth.service';

@Component({
  selector: 'app-profile-user-page',
  templateUrl: './profile-user-page.component.html',
  styleUrls: ['./profile-user-page.component.css']
})
export class ProfileUserPageComponent implements OnInit {
  

  private fb = inject(FormBuilder);

  private authService = inject(AuthService);

  public user:any;

  public myForm:FormGroup = this.fb.group({
    nombre:[''],
    apellido:[''],
    email:[''],
    password:[{value:'developeando',disabled:true}],
  });

  ngOnInit(): void {
    this.user = this.authService.getUser();
    
    this.myForm.get('nombre')?.setValue(this.user.nombre);
    this.myForm.get('apellido')?.setValue(this.user.apellido);
    this.myForm.get('email')?.setValue(this.user.email);

    
  }

}
