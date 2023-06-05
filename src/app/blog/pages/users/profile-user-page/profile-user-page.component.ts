import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/blog/auth/services/auth.service';

@Component({
  selector: 'app-profile-user-page',
  templateUrl: './profile-user-page.component.html',
  styleUrls: ['./profile-user-page.component.css'],
})
export class ProfileUserPageComponent implements OnInit {
  private authService = inject(AuthService);

  public user: any;

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }
}
