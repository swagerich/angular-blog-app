import {
  Component,
  OnInit,
  inject,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PublicationDto } from 'src/app/blog/interfaces/proyection/publicationDto.interface';
import { PublicationService } from 'src/app/blog/services/publication-service/publication.service';
import { delay, switchMap, tap } from 'rxjs';
import { CommentService } from 'src/app/blog/services/comments-service/comment.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComentariDTo } from 'src/app/blog/interfaces/proyection/comentarioDto.interface';
import Swal from 'sweetalert2';
import { ValidatorsService } from 'src/app/shared/validators.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/blog/auth/services/auth.service';

@Component({
  selector: 'add-comment-publication-page',
  templateUrl: './add-comment-publication.component.html',
  styleUrls: ['./add-comment-publication.component.css'],
})
export class AddCommentPublication implements OnInit {
  private activateRoute = inject(ActivatedRoute);

  private publicationService: PublicationService = inject(PublicationService);

  private commentService: CommentService = inject(CommentService);

  private validatorService = inject(ValidatorsService);

  private authService:AuthService = inject(AuthService);

  private router = inject(Router);

  private fb = inject(FormBuilder);

  public publication?: PublicationDto;

  public publicationId: number = 0;
  
  public myFormComment: FormGroup = this.fb.group({
    id: [0],
    nombre: [''], //aqui falta setear ya esta seteado el nombre del usuario si se logea
    email: [''], //aqui falta setear ya esta seteado el email del usuario si se logea
    texto: [''],
  });

  ngOnInit(): void {
    this.getPublicationById();
    this.showCommentsPageWithPublication();

    this.authService.getCurrentUser().subscribe(u =>{
     this.myFormComment.get('nombre')?.setValue(u.nombre);
     this.myFormComment.get('email')?.setValue(u.email);
    })
  }

  get currentComment(): ComentariDTo {
    return this.myFormComment.value as ComentariDTo;
  }

  getPublicationById(): void {
    this.activateRoute.params
      .pipe(
        switchMap((params: Params) => {
          this.publicationId = +params['id'];
          return this.publicationService.publicationById(this.publicationId);
        })
      )
      .subscribe((publication) => {
        if (!publication) {
          return this.router.navigate(['/load']);
        }
        return (this.publication = publication);
      });
  }
  

  onSubmitCommentPublication(): void {
    if (!this.myFormComment.value) return;
    this.commentService
      .addCommentToPublication(this.currentComment, this.publicationId)
      .subscribe({
        next: () => {
          Swal.fire('Exito!', 'Comentario agregado', 'success').then((resp) => {
            if (resp.isConfirmed) {
              let name = this.myFormComment.get('nombre')?.value;
              let email = this.myFormComment.get('email')?.value;
              this.myFormComment.reset({nombre:name,email:email});
            }
          });
        },
        error: (e) => {
          if (e.status === 500) {
            this.validatorService.validateSnackBar(
              'A system error has occurred!'
            );
          }
        },
      });
  }

  deleteComment(comenid: number): void {
    this.commentService
      .deleteCommentIdInPublicationId(comenid, this.publicationId)
      .subscribe({
        next: () => {
          this.validatorService.validateSnackBar('successfully eliminated!');
          this.showCommentsPageWithPublication();
        },
        error: (e) => {
          switch (e.status) {
            case 500:
              this.validatorService.validateSnackBar(
                'A system error has occurred!'
              );
              return;
            case 400:
              this.validatorService.validateSnackBar(
                'There was a problem deleting the comment'
              );
              return;
          }
        },
      });
  }

  // ==== pagination ======

  displayedColumns: string[] = ['nombre', 'email', 'texto', 'actions'];

  dataPaginacion = new MatTableDataSource<ComentariDTo>([]);
  comments: ComentariDTo[] = [];
  showSpinner: boolean = false;
  pageSize: number = 5;
  page: number = 0;
  totalComments: number = 0;
  totalPages: number = 0;

  showCommentsPageWithPublication(): void {
    this.activateRoute.params
      .pipe(
        delay(1000),
        switchMap(() =>
          this.commentService.getAllCommentPageInPublicationId(
            this.publicationId,
            this.page,
            this.pageSize
          )
        )
      )
      .subscribe({
        next: (response) => {
          this.showSpinner = true;
          this.comments = response.comments;
          this.totalPages = response.pages.totalPages;
          this.totalComments = response.pages.totalComments;
          this.dataPaginacion = new MatTableDataSource<ComentariDTo>(
            this.comments
          );
        },
        error: (e) => {
          if (e.status === 500) {
            this.validatorService.validateSnackBar(
              'A system error has occurred!'
            );
          }
        },
      });
  }

  pageEvents(event: any) {
    console.log(event.pageIndex);
    this.getPage(event.pageIndex, event.pageSize);
  }

  getPage(nroPagina: number, cantidadPorPagina: number): void {
    this.activateRoute.params
      .pipe(
        switchMap(() =>
          this.commentService.getAllCommentPageInPublicationId(
            this.publicationId,
            nroPagina,
            cantidadPorPagina
          )
        )
      )
      .subscribe({
        next: (response) => {
          this.comments = response.comments;
          this.dataPaginacion = new MatTableDataSource<ComentariDTo>(
            this.comments
          );
        },
      });
  }
}
