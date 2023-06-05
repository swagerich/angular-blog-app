import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, map, tap, Subscription } from 'rxjs';
import { CategoriaDto } from 'src/app/blog/interfaces/proyection/categoriaDto.interface';
import { CategoriaService } from 'src/app/blog/services/categories-service/categoria.service';
import { ValidatorsService } from 'src/app/shared/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category-page',
  templateUrl: './update-category-page.component.html',
  styleUrls: ['./update-category-page.component.css'],
})
export class UpdateCategoryPageComponent implements OnInit,OnDestroy {
  
  private categoriaService: CategoriaService = inject(CategoriaService);
  private activateRoute = inject(ActivatedRoute);
  private validatorService = inject(ValidatorsService);
  private router  = inject(Router);
  private fb = inject(FormBuilder);
  private subcription: Subscription = new Subscription;

  public myForm: FormGroup = this.fb.group({
    id: 0,
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required, Validators.minLength(20)]],
  });

  ngOnInit(): void {
    this.categoryById();
  }
  get currentCategory(): CategoriaDto {
    return this.myForm.value as CategoriaDto;
  }

  categoryById(): void {
   this.subcription = this.activateRoute.params
      .pipe(
        switchMap((params: Params) =>
          this.categoriaService.getCategorieById(+params['id']))).subscribe((category) => {
          this.myForm.reset(category);
      });
  }
  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    if (this.currentCategory.id) {
      this.subcription = this.categoriaService.updateCategorie(this.currentCategory.id,this.currentCategory).subscribe({
        next:(category) =>{
          Swal.fire('Succesfull',`${category?.nombre} se actualizo con exito!`,'success')
          .then(resp =>{
            if(resp.isConfirmed){
              this.router.navigate(['/admin/categories'])
            }
          });
        },
        error:() =>{
            this.validatorService.validateSnackBar('Ocurrio un problema en el sistema');
        }
      })
    }
  }

  onValidateField(field:string) : boolean | null {
    return this.validatorService.isValidField(this.myForm,field);
   }
 
   onValidateLengthField(field:string): string | null {
     return this.validatorService.isValidFieldLength(this.myForm,field);
   }

   ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
