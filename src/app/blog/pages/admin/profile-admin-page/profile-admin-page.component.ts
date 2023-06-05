import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/blog/auth/services/auth.service';

@Component({
  selector: 'blog-profile-admin-page',
  templateUrl: './profile-admin-page.component.html',
  styleUrls: ['./profile-admin-page.component.css'],
})
export class ProfileAdminPageComponent implements OnInit {
  private authService = inject(AuthService);

  public user: any;

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }
}
