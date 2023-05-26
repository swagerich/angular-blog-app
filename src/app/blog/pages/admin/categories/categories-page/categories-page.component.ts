import { Component, OnInit, inject } from '@angular/core';
import { CategoriaDto } from 'src/app/blog/interfaces/proyection/categoriaDto.interface';
import { CategoriaService } from '../../../../services/categories-service/categoria.service';
import { ValidatorsService } from 'src/app/shared/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'blog-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css'],
})
export class CategoriesPageComponent implements OnInit {
  private categoriaService: CategoriaService = inject(CategoriaService);
  private validatorService = inject(ValidatorsService);

  public categories: CategoriaDto[] = [];

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoriaService.allCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: () => {
        this.validatorService.validateSnackBar(
          'Ocurrio un problema al obtener las categorias!'
        );
      },
    });
  }

  deleteCategory(id: number): void {
    const categoryToDelete = this.categories.find((c) => c.id === id);

    if (categoryToDelete) {
      Swal.fire({
        title: `Estas seguro de eliminar la categoria ${categoryToDelete.nombre} ?`,
        text: 'No podras recuperarlo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si,Eliminar !',
      }).then((resp) => {
        if (resp.isConfirmed) {
          this.categoriaService.deleteCategory(id).subscribe({
            next: () => {
              Swal.fire(
                'Eliminado!',
                `Categoria eliminado con exito`,
                'success'
              );
              if (resp.isConfirmed) {
                this.categories = this.categories.filter((c) => c.id !== id);
              }
            },
            error: () => {
              this.validatorService.validateSnackBar(
                'Ocurrio un problema al eliminar la categoria!'
              );
            },
          });
        }
      });
    }
  }
}
