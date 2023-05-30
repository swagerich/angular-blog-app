import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PublicationDto } from 'src/app/blog/interfaces/proyection/publicationDto.interface';
import { PublicationService } from 'src/app/blog/services/publication-service/publication.service';
import { switchMap, Observable } from 'rxjs';

@Component({
  selector: 'app-load-publication-user-page',
  templateUrl: './load-publication-user-page.component.html',
  styleUrls: ['./load-publication-user-page.component.css'],
})
export class LoadPublicationUserPageComponent implements OnInit {
  private publicationService: PublicationService = inject(PublicationService);

  private activateRoute = inject(ActivatedRoute);

  public loadPublications: PublicationDto[] = [];

  public categoryId: number = 0;

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        switchMap((params: Params) => {
          this.categoryId = +params['pubId'];
          if (this.categoryId == 0) {
            return this.getPublications();
          } else {
            return this.publicationService.getAllPublicationInCategoryId(
              this.categoryId
            );
          }
        })
      )
      .subscribe((publications: PublicationDto[]) => {
        this.loadPublications = publications;
      });
  }

  getPublications(): Observable<PublicationDto[]> {
    return this.publicationService.allPublications();
  }
}
