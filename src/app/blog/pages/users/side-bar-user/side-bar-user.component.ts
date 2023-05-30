import { Component, OnInit, inject } from '@angular/core';
import { CategoriaDto } from 'src/app/blog/interfaces/proyection/categoriaDto.interface';
import { CategoriaService } from '../../../services/categories-service/categoria.service';

@Component({
  selector: 'page-user-side-bar',
  templateUrl: './side-bar-user.component.html',
  styleUrls: ['./side-bar-user.component.css']
})
export class SideBarUserComponent implements OnInit {
 
  private categoriaService : CategoriaService = inject(CategoriaService);

  public categories : CategoriaDto[] =[];
  
  ngOnInit(): void {
  this.getCategoriesAll();
  }

 getCategoriesAll() : void {
  this.categoriaService.allCategories().subscribe({
    next:(categories) =>{
      this.categories = categories;
    },
    error:() =>{

    }
  })
 }
}
