import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/blog/auth/services/auth.service';
import { UserDto } from 'src/app/blog/interfaces/proyection/userDto.interface';

@Component({
  selector: 'app-welcome-page-user',
  templateUrl: './welcome-page-user.component.html',
  styleUrls: ['./welcome-page-user.component.css'],
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class WelcomePageUserComponent implements OnInit {
 
  private authService:AuthService = inject(AuthService);

  public username? : UserDto;

  ngOnInit(): void {
  this.username  = this.authService.getUser();
  }

}
