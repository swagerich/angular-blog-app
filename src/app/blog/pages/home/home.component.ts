import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  private authService:AuthService = inject(AuthService);


  ngOnInit(): void {

  }
  
  isUserAuthenticated() : boolean {
    return this.authService.isLoggedIn();
   }
}
