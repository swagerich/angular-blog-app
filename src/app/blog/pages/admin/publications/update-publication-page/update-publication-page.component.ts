import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/validators.service';
import { PublicationDto } from '../../../../interfaces/proyection/publicationDto.interface';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PublicationService } from 'src/app/blog/services/publication-service/publication.service';
import { switchMap, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-publication-page',
  templateUrl: './update-publication-page.component.html',
  styleUrls: ['./update-publication-page.component.css']
})
export class UpdatePublicationPageComponent implements OnInit,OnDestroy{


  private validatorService = inject(ValidatorsService);
  private activateRoute  = inject(ActivatedRoute);
  private router = inject(Router);
  
  private  publicationService = inject(PublicationService);

  private fb = inject(FormBuilder);

  private subscription : Subscription = new Subscription;

  public categories : PublicationDto[] = [];
  
  public myForm: FormGroup = this.fb.group({
    id: 0,
    titulo: ['', [Validators.required, Validators.minLength(10)]],
    descripcion: ['', [Validators.required, Validators.minLength(20)]],
    contenido: ['',[Validators.required]],
    categoria: ['',[Validators.required]]
  });

  ngOnInit(): void {
    this.categoriesAll();
    this.categoryId();
  }
  get currentPublication() : PublicationDto{
    return this.myForm.value as PublicationDto;
  }

  onSubmit() : void {
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    if(this.currentPublication.id){
    this.subscription = this.publicationService.updatePublication(this.currentPublication.id,this.currentPublication).subscribe({
        next:(publication) =>{
          Swal.fire('Succesfull',`${publication.titulo} se actualizo con exito!`,'success')
          .then(resp =>{
            if(resp.isConfirmed){
              this.router.navigate(['/admin/publications']);
            }
          })
        },
        error:() =>{
          this.validatorService.validateSnackBar('Ocurrio un problema en el sistema!')
        }
      });
    }
   
  }


  categoryId(): void {
   this.subscription = this.activateRoute.params.pipe(
      switchMap((params:Params) => this.publicationService.publicationById(+params['id']))
    ).subscribe({
      next:(publication) =>{
      this.myForm.reset(publication);
      },
      error:() =>{
        this.validatorService.validateSnackBar('Ocurrio un problema en el sistema!')
      }
    })
  }

  categoriesAll(): void {
   this.subscription = this.publicationService.allPublications().subscribe({
      next:(categories) =>{
        this.categories =  categories;
      },
      error:() =>{
        this.validatorService.validateSnackBar('Ocurrio un problema en el sistema!')
      }
    })
  }
  
  
  onValidateField(field: string): boolean | null {
    return this.validatorService.isValidField(this.myForm, field);
  }
  onValidateLengthField(field: string): string | null {
    return this.validatorService.isValidFieldLength(this.myForm, field);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
