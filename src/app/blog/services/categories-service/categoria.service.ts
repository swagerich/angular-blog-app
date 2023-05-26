import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { CategoriaDto } from '../../interfaces/proyection/categoriaDto.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private endPoint: string = environments.baseUrl;
  private http = inject(HttpClient);

  allCategories(): Observable<CategoriaDto[]> {
    return this.http.get<CategoriaDto[]>(`${this.endPoint}/categoria/all`);
  }

  addCategorie(categorie:CategoriaDto) : Observable<CategoriaDto> {
    return this.http.post<CategoriaDto>(`${this.endPoint}/categoria`,categorie);
  }

  updateCategorie(id:number,categorie:CategoriaDto) : Observable<CategoriaDto  | undefined>{
    return this.http.put<CategoriaDto>(`${this.endPoint}/categoria/${id}`,categorie);
  }

  getCategorieById(id:number): Observable<CategoriaDto>{
    return this.http.get<CategoriaDto>(`${this.endPoint}/categoria/${id}`);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endPoint}/categoria/${id}`);
  }
}
