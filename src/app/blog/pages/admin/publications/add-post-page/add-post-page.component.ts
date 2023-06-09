import { Component, OnInit, OnDestroy } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaDto } from 'src/app/blog/interfaces/proyection/categoriaDto.interface';
import { PublicationDto } from 'src/app/blog/interfaces/proyection/publicationDto.interface';
import { CategoriaService } from 'src/app/blog/services/categories-service/categoria.service';
import { PublicationService } from 'src/app/blog/services/publication-service/publication.service';
import { ValidatorsService } from 'src/app/shared/validators.service';

import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'blog-add-post-page',
  templateUrl: './add-post-page.component.html',
  styleUrls: ['./add-post-page.component.css'],
})
export class AddPostPageComponent implements OnInit, OnDestroy {
  private publicationService: PublicationService = inject(PublicationService);

  private validatorService = inject(ValidatorsService);

  private categoriesService: CategoriaService = inject(CategoriaService);

  private router = inject(Router);

  private fb = inject(FormBuilder);

  public categories: CategoriaDto[] = [];

  private subscription: Subscription = new Subscription();

  public photo!: File | null;

  public myForm: FormGroup = this.fb.group({
    id: 0,
    titulo: ['', [Validators.required, Validators.minLength(10)]],
    descripcion: [
      '',
      [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(2500),
      ],
    ],
    contenido: ['', [Validators.required]],
    categoria: ['', Validators.required],
    getPhotoHashCode:[0]
  });
  ngOnInit(): void {
    this.getCategories();
  }

  get currentPublication(): PublicationDto {
    return this.myForm.value as PublicationDto;
  }

  getCategories(): void {
    this.subscription = this.categoriesService.allCategories().subscribe({
      next: (categories: CategoriaDto[]) => {
        this.categories = categories;
      },
      error: () => {
        console.error('no cargo las categorias');
      },
    });
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    //otra manera de mandarlo
    /* const formData = {
      ...this.myForm.value,
      categoria:this.myForm.value.categoria.id;
    }; */

    console.log(this.myForm.value);
    if(!this.photo){
      this.subscription = this.publicationService
      .addPublication(this.currentPublication)
      .subscribe({
        next: () => {
          const title = this.myForm.get('titulo')?.value;
          Swal.fire('Exito!', `${title} Agregado con exito!`, 'success')
          .then(resp =>{
            if(resp.isConfirmed){
              this.router.navigate(['/admin/publications']);
            }
          })
        },
        error: (e:HttpErrorResponse) => {
          if(e.status === 500){
            this.validatorService.validateSnackBar(
              'Ocurrio un problema en el servidor !'
            );
          }
          
        }
      });
    }else{
      this.publicationService.addPublicationWithPhoto(this.currentPublication,this.photo).subscribe({
        next:()=>{
          const title = this.myForm.get('titulo')?.value;
          Swal.fire('Exito!', `${title} Agregado con exito!`, 'success')
          .then(resp =>{
            if(resp.isConfirmed){
              this.router.navigate(['/admin/categories']);
            }
          });
        }
      });
      
    }
    
  }
  selectionPhoto(e:any): void{
    this.photo = e.target.files[0];
    if(this.photo!.type.indexOf('image') < 0){
      this.photo= null;
     this.validatorService.validateSnackBar('El archivo debe ser de tipo imagen');
    }
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
