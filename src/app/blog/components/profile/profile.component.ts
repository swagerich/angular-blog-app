import { Component, Input, OnInit, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'blog-profile-components',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  private fb = inject(FormBuilder);

  private authService = inject(AuthService);

  @Input()
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
