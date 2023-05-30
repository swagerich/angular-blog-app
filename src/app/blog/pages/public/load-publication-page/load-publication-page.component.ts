import { Component, OnInit, inject } from '@angular/core';
import { PublicationService } from '../../../services/publication-service/publication.service';
import { PublicationDto } from '../../../interfaces/proyection/publicationDto.interface';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'load-publication-page',
  templateUrl: './load-publication-page.component.html',
  styleUrls: ['./load-publication-page.component.css'],
})
export class LoadPublicationPageComponent implements OnInit {

  private publicationService: PublicationService = inject(PublicationService);

  public loadPublications: PublicationDto[] = [];


  ngOnInit(): void {
    this.getPublications();
  }

  getPublications(): void {
    this.publicationService.allPublications().subscribe({
      next: (publications) => {
        this.loadPublications = publications;
      },
    });
  }
}
