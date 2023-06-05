import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaDto } from 'src/app/blog/interfaces/proyection/categoriaDto.interface';
import { CategoriaService } from 'src/app/blog/services/categories-service/categoria.service';
import { ValidatorsService } from 'src/app/shared/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category-page',
  templateUrl: './add-category-page.component.html',
  styleUrls: ['./add-category-page.component.css']
})
export class AddCategoryPageComponent {

  private categoriaService:CategoriaService = inject(CategoriaService);

  private validatorService = inject(ValidatorsService);

  private fb = inject(FormBuilder);

  public myForm:FormGroup = this.fb.group({
    id:0,
    nombre:['',[Validators.required]],
    descripcion:['',[Validators.required,Validators.minLength(20)]],
  })


  get currentCategory() : CategoriaDto {
    return this.myForm.value as CategoriaDto;
  }

  onSubmit(): void {
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    this.categoriaService.addCategorie(this.currentCategory).subscribe({
      next:() =>{
       const name = this.myForm.get('nombre')?.value;
       Swal.fire('Exito!',`${name} Agregado con exito!`,'success')
       .then(resp =>{
        if(resp.isConfirmed){
          this.myForm.reset();
        }
       });
      },
      error:() => {
          this.validatorService.validateSnackBar('Ocurrio un problema en el sistema!')
        
      }
    })

  }

  onValidateField(field:string) : boolean | null {
   return this.validatorService.isValidField(this.myForm,field);
  }

  onValidateLengthField(field:string): string | null {
    return this.validatorService.isValidFieldLength(this.myForm,field);
  }
}
