import { Component, inject, Input, OnInit } from '@angular/core';
import { PublicationService } from 'src/app/blog/services/publication-service/publication.service';
import { PublicationDto } from '../../../../interfaces/proyection/publicationDto.interface';
import Swal from 'sweetalert2';
import { ValidatorsService } from 'src/app/shared/validators.service';

@Component({
  selector: 'blog-publications-page',
  templateUrl: './publications-page.component.html',
  styleUrls: ['./publications-page.component.css'],
})
export class PublicationsPageComponent implements OnInit {
  private publicationService = inject(PublicationService);
  private validatorService = inject(ValidatorsService);

  @Input()
  public publications: PublicationDto[] = [];

  ngOnInit(): void {
    this.getAllPublications();
  }

  getAllPublications(): void {
    this.publicationService.allPublications().subscribe({
      next: (publications) => {
        this.publications = publications;
      },
    });
  }

  deletePublication(id: number): void {
    const publicationToDelete = this.publications.find(p => p.id === id);

    if (publicationToDelete) {
      Swal.fire({
        title: `Estas seguro de eliminar la publicacion ${publicationToDelete.titulo}?`,
        text: 'No podras recuperarlo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si,Eliminar !',
      }).then((resp) => {
        if (resp.isConfirmed) {
          this.publicationService.deletePublication(id).subscribe({
            next: () => {
              Swal.fire(
                'Eliminado!',
                'Publicacion eliminada con exito!',
                'success'
              );
              if (resp.isConfirmed) {
                this.publications = this.publications.filter(
                  (p) => p.id !== id
                );
              }
            },
            error: () => {
              this.validatorService.validateSnackBar(
                'Ocurrio un problema al eliminar!'
              );
            },
          });
        }
      });
    }
  }
}