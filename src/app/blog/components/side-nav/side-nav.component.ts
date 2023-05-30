import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { UserDto } from '../../interfaces/proyection/userDto.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'blog-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  
  private authService:AuthService = inject(AuthService);

  private router = inject(Router);

  isLoggedIn = false;
  user!: UserDto;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.user = this.authService.getUser();

    //subject automaticametne cambia el tipo de user en el navbar
    this.authService.loginStatusSubject.asObservable().subscribe({
      next: () => {
        this.isLoggedIn = this.authService.isLoggedIn();
        this.user = this.authService.getUser();
      },
    });
  }


  logout() : void {
    this.authService.logout();
    window.location.reload();

  }

  role():void{
    if(this.authService.getUserRole() == "ROLE_USER"){
      this.router.navigate(['/user/profile'])
    }else if(this.authService.getUserRole() == 'ROLE_ADMIN'){
      this.router.navigate(['/admin/profile'])
    }
  }
}
