import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { PublicationDto } from 'src/app/blog/interfaces/proyection/publicationDto.interface';
import { PublicationService } from 'src/app/blog/services/publication-service/publication.service';


@Component({
  selector: 'app-publication-details-page',
  templateUrl: './publication-details-page.component.html',
  styleUrls: ['./publication-details-page.component.css'],
})
export class PublicationDetailsPageComponent implements OnInit {
  private activateRoute = inject(ActivatedRoute);

  private publicationService: PublicationService = inject(PublicationService);

  private router = inject(Router);

  public publication?: PublicationDto;

  ngOnInit(): void {
    this.getPublicationById();
  }

  getPublicationById(): void {
    this.activateRoute.params
      .pipe(
        switchMap((params: Params) =>
          this.publicationService.publicationById(+params['id'])
        )
      )
      .subscribe((publication) => {
        if (!publication) {
          return this.router.navigate(['/load']);
        }
        return (this.publication = publication);
      });
  }
}
