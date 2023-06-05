import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { PageableResponse} from '../../interfaces/proyection/pageableResponse.interface';
import { PublicationDto } from 'src/app/blog/interfaces/proyection/publicationDto.interface';

@Injectable({
    providedIn: 'root',
  })
export class PublicationService{

 private endPoint:string = environments.baseUrl;
 private http = inject(HttpClient);

 allPublications() : Observable<PublicationDto[]>{
    return this.http.get<PublicationDto[]>(`${this.endPoint}/publicar/all`);
 }

 allPublicationsAdmin() : Observable<PublicationDto[]>{
   return this.http.get<PublicationDto[]>(`${this.endPoint}/publicar/allAdmin`);
}

 addPublication(publicar:PublicationDto) : Observable<PublicationDto>{
   return this.http.post<PublicationDto>(`${this.endPoint}/publicar`,publicar);
 }
 
 updatePublication(id:number,publication:PublicationDto) : Observable<PublicationDto>{
  return this.http.put<PublicationDto>(`${this.endPoint}/publicar/${id}`,publication);
 }

 getAllPublicationsPageByCategorieId(idCate:number,page:number,size:number) : Observable<PageableResponse>{
  return this.http.get<PageableResponse>(`${this.endPoint}/publicar/categories/page?categId=${idCate}&page=${page}&size=${size}`);
 }

 deletePublication(id:number): Observable<void>{
    return this.http.delete<void>(`${this.endPoint}/publicar/${id}`);
 }

 publicationById(id:number) : Observable<PublicationDto | null> {
  return this.http.get<PublicationDto>(`${this.endPoint}/publicar/${id}`)
 }
 publicationByIdAdmin(id:number) : Observable<PublicationDto | null> {
   return this.http.get<PublicationDto>(`${this.endPoint}/publicar/${id}/admin`)
  }

 increaseLikeInPublication(publiId:number): Observable<any>{
    return this.http.post<any>(`${this.endPoint}/publicar/${publiId}/like`,{});
 }

 getAllPublicationInCategoryId(cateId:number): Observable<PublicationDto[]> {
   return this.http.get<PublicationDto[]>(`${this.endPoint}/publicar/category/${cateId}`);
 }

 addPublicationWithPhoto(publication:PublicationDto,file:File):Observable<PublicationDto>{
    const formData = new FormData();
    formData.append('file',file);
    formData.append('titulo',publication.titulo);
    formData.append('descripcion',publication.descripcion);
    formData.append('contenido',publication.contenido);
    formData.append('categoria',publication.categoria.nombre);
   // formData.append('likes_count',JSON.stringify(publication.likes_count));

  return this.http.post<PublicationDto>(`${this.endPoint}/publicar/withPhoto`,formData);

 }

}

