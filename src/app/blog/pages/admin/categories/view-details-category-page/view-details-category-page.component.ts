import { Component, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { PublicationDto } from 'src/app/blog/interfaces/proyection/publicationDto.interface';
import { PublicationService } from 'src/app/blog/services/publication-service/publication.service';
import { ValidatorsService } from 'src/app/shared/validators.service';

@Component({
  selector: 'app-view-details-category-page',
  templateUrl: './view-details-category-page.component.html',
  styleUrls: ['./view-details-category-page.component.css'],
})
export class ViewDetailsCategoryPageComponent {

  private publicationService: PublicationService = inject(PublicationService);
  private validatorService = inject(ValidatorsService);
  private activateRoute = inject(ActivatedRoute);

  displayedColumns: string[] = [
    'id',
    'titulo',
    'descripcion',
    'contenido',
    'categoria',
  ];

  dataPaginacion = new MatTableDataSource<PublicationDto>([]);
  publications: PublicationDto[] = [];
  showSpinner: boolean = false;
  pageSize: number = 5;
  page: number = 0;
  //currentPage: number = 0;
  totalPublications: number = 0;
  totalPages: number = 0;

  ngOnInit(): void {
    this.showPublicationsPageWithCategory();
  }

  showPublicationsPageWithCategory(): void {
    this.activateRoute.params
      .pipe(
        delay(1000),
        switchMap((parms: Params) =>
          this.publicationService.getAllPublicationsPageByCategorieId(
            +parms['id'],
            this.page,
            this.pageSize
          )
        )
      )
      .subscribe({
        next: (response) => {
          this.showSpinner = true;
          this.publications = response.publications;
          this.totalPages = response.pages.totalPages;
          this.totalPublications = response.pages.totalPublications;
          this.dataPaginacion = new MatTableDataSource<PublicationDto>(
            this.publications
          );
        },
        error:()=>{
          this.validatorService.validateSnackBar('Ocurrio un problema en el sistema!');
        }
      });
  }

  pageEvents(event: any) {
    console.log(event.pageIndex);
    this.getPage(event.pageIndex, event.pageSize);
  }

  getPage(nroPagina: number, cantidadPorPagina: number): void {
    this.activateRoute.params
      .pipe(
        switchMap((parms: Params) =>
          this.publicationService.getAllPublicationsPageByCategorieId(
            +parms['id'],
            nroPagina,
            cantidadPorPagina
          )
        )
      )
      .subscribe({
        next: (response) => {
          this.publications = response.publications;
          this.dataPaginacion = new MatTableDataSource<PublicationDto>(
            this.publications
          );
        },
      });
  }
}
