import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaDto } from 'src/app/blog/interfaces/proyection/categoriaDto.interface';
import { PublicationDto } from 'src/app/blog/interfaces/proyection/publicationDto.interface';
import { CategoriaService } from 'src/app/blog/services/categories-service/categoria.service';
import { PublicationService } from 'src/app/blog/services/publication-service/publication.service';
import { ValidatorsService } from 'src/app/shared/validators.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'blog-add-post-page',
  templateUrl: './add-post-page.component.html',
  styleUrls: ['./add-post-page.component.css'],
})
export class AddPostPageComponent implements OnInit {
  private publicationService: PublicationService = inject(PublicationService);

  private validatorService = inject(ValidatorsService);

  private categoriesService: CategoriaService = inject(CategoriaService);

  private fb = inject(FormBuilder);

  public categories: CategoriaDto[] = [];

  public myForm: FormGroup = this.fb.group({
    id: 0,
    titulo: ['', [Validators.required, Validators.minLength(10)]],
    descripcion: ['', [Validators.required, Validators.minLength(20)]],
    contenido: ['',[Validators.required]],
    categoria: ['',Validators.required]
  });

  ngOnInit(): void {
    this.getCategories();
  }

  get currentPublication(): PublicationDto {
    return this.myForm.value as PublicationDto;
  }

  getCategories(): void {
    this.categoriesService.allCategories().subscribe({
      next: (categories: CategoriaDto[]) => {
        this.categories = categories;
      },
      error:() =>{
        console.error('no cargo las categorias');
      }
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
    
    this.publicationService.addPublication(this.currentPublication).subscribe({
      next:()=>{
        const title = this.myForm.get('titulo')?.value;
        Swal.fire('Exito!',`${title} Agregado con exito!`,'success');
      },
      error:() =>{
        this.validatorService.validateSnackBar('Ocurrio un error, inténtelo de nuevo porfavor !');
      },
      complete:() =>{
        this.myForm.reset();
      }
    });

  }


  onValidateField(field: string): boolean | null {
    return this.validatorService.isValidField(this.myForm, field);
  }
  onValidateLengthField(field: string): string | null {
    return this.validatorService.isValidFieldLength(this.myForm, field);
  }
}
