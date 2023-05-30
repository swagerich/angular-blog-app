import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PublicationDto } from 'src/app/blog/interfaces/proyection/publicationDto.interface';
import { PublicationService } from 'src/app/blog/services/publication-service/publication.service';
import { delay, switchMap, tap } from 'rxjs';
import { CommentService } from 'src/app/blog/services/comments-service/comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComentarioDTo } from 'src/app/blog/interfaces/proyection/comentarioDto.interface';
import Swal from 'sweetalert2';
import { ValidatorsService } from 'src/app/shared/validators.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/blog/auth/services/auth.service';
import { UserDto } from 'src/app/blog/interfaces/proyection/userDto.interface';

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

  private authService: AuthService = inject(AuthService);

  private router = inject(Router);

  private fb = inject(FormBuilder);

  public publication?: PublicationDto;

  public publicationId: number = 0;

  public userId!: UserDto;

  displayedColumns: string[] = ['nombre', 'email', 'texto'];

  dataPaginacion = new MatTableDataSource<ComentarioDTo>([]);
  comments: ComentarioDTo[] = [];
  showSpinner: boolean = false;
  pageSize: number = 5;
  page: number = 0;
  totalComments: number = 0;
  totalPages: number = 0;

  public myFormComment: FormGroup = this.fb.group({
    id: [0],
    nombre: [''], //aqui  ya esta seteado el nombre del usuario si se logea
    email: [''], //aqui ya esta seteado el email del usuario si se logea
    texto: ['', [Validators.required, Validators.maxLength(1500)]], //falta validar maxLength
  });

  ngOnInit(): void {
    this.getPublicationById();

    this.showCommentsPageWithPublication();

    this.currentUser();

    if (this.isLogged()) {
      this.displayedColumns.push('actions');
    }
  }

  get currentComment(): ComentarioDTo {
    return this.myFormComment.value as ComentarioDTo;
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

  currentUser(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      //  this.myFormComment.get('id')?.setValue(user.id);
      this.myFormComment.get('nombre')?.setValue(user.nombre);
      this.myFormComment.get('email')?.setValue(user.email);
      this.userId = user;
    });
  }

  isLogged(): boolean {
    return this.authService.isLoggedIn();
  }

  onSubmitCommentPublication(): void {
    if (this.myFormComment.invalid) return;
    this.commentService
      .addCommentToPublication(
        this.currentComment,
        this.publicationId,
        this.userId.id
      )
      .subscribe({
        next: () => {
          Swal.fire('Exito!', 'Comentario agregado', 'success').then((resp) => {
            if (resp.isConfirmed) {
              let name = this.myFormComment.get('nombre')?.value;
              let email = this.myFormComment.get('email')?.value;
              this.myFormComment.reset({ nombre: name, email: email });
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
    Swal.fire({
      title: `Estas seguro de eliminar tu comentario ?`,
      text: 'No podras recuperarlo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar !',
    }).then((resp) => {
      if (resp.isConfirmed) {
        this.commentService
          .deleteCommentIdInPublicationId(comenid, this.publicationId)
          .subscribe({
            next: () => {
              Swal.fire(
                'Eliminado!',
                `Comentario eliminado con exito`,
                'success'
              );
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
    });
  }

  onValidateLengthField(field:string) : string | null {
    return this.validatorService.isValidFieldLength(this.myFormComment,field);
  }
  onValidateField(field:string) : boolean | null {
    return this.validatorService.isValidField(this.myFormComment,field);
  }

  // ==== pagination ======

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
          this.dataPaginacion = new MatTableDataSource<ComentarioDTo>(
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
          this.dataPaginacion = new MatTableDataSource<ComentarioDTo>(
            this.comments
          );
        },
      });
  }
}
