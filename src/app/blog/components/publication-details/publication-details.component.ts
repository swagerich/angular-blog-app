import { Component, Input, OnInit, inject } from '@angular/core';
import { PublicationDto } from '../../interfaces/proyection/publicationDto.interface';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'blog-publication-details-components',
  templateUrl: './publication-details.component.html',
  styleUrls: ['./publication-details.component.css']
})
export class PublicationDetailsComponent implements OnInit {

  private authService:AuthService = inject(AuthService);

  @Input()
  public publication?:PublicationDto;

  ngOnInit(): void {
    if(!this.publication) new Error('Publication is undefined');
  }

  login(): void {
    Swal.fire({
      title: 'Join the technology blogging community',
      text: 'we are waiting for you...!',
      showConfirmButton: false,
      imageUrl: `assets/search.png`,
      imageWidth: 400,
      imageHeight: 200,
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      footer: '<a href="login">Already have an account? Log in</a> ',
    });
  }

   isLogged() : boolean {
    return this.authService.isLoggedIn();
  }
}
