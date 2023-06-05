import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { PublicationService } from 'src/app/blog/services/publication-service/publication.service';
import { PublicationDto } from '../../../../interfaces/proyection/publicationDto.interface';
import Swal from 'sweetalert2';
import { ValidatorsService } from 'src/app/shared/validators.service';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/blog/services/comments-service/comment.service';

@Component({
  selector: 'blog-publications-page',
  templateUrl: './publications-page.component.html',
  styleUrls: ['./publications-page.component.css'],
})
export class PublicationsPageComponent implements OnInit,OnDestroy {
  
  private publicationService = inject(PublicationService);

  private validatorService = inject(ValidatorsService);

  private commentService = inject(CommentService);

  private subscription : Subscription = new Subscription;

  public commentCounts: number[] = [];

  public publications: PublicationDto[] = [];

  ngOnInit(): void {
    this.getAllPublications();
  }

  getAllPublications(): void {
    this.subscription = this.publicationService.allPublicationsAdmin().subscribe({
      next: (publications) => {
        this.publications = publications;
        this.getCommentCounts();
      },
    });
  }
  
  getCommentCounts(): void {
   this.publications.forEach(publication =>{
    this.subscription = this.commentService.getAllComentInpublicationId(publication.id).subscribe({
      next:(coments) =>{
        this.commentCounts[publication.id] = coments.length;
      }
    });
   });
  }


  deletePublication(id: number): void {
    const publicationToDelete = this.publications.find(p => p.id === id);

    if (publicationToDelete) {
      Swal.fire({
        title: `Estas seguro de eliminar la publicacion ${publicationToDelete.titulo}?`,
        text: 'Atento, Eliminarias la publicacion con todos sus comentarios!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!',
      }).then((resp) => {
        if (resp.isConfirmed) {
          this.subscription =  this.publicationService.deletePublication(id).subscribe({
            next: () => {
              Swal.fire(
                'Eliminado!',
                'Publicacion fue eliminada con exito!',
                'success'
              );
              if (resp.isConfirmed) {
                this.publications = this.publications.filter(
                  (p) => p.id !== id
                );
              }
            },
            error: (e) => {
              if(e.status == 500){
                console.log("error aqui !!");
                
                this.validatorService.validateSnackBar(
                  'Ocurrio un problema en el servidor!'
                );
              }
            },
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
