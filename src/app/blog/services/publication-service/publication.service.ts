import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable,tap } from 'rxjs';
import { PublicationDto } from '../../interfaces/proyection/publicationDto.interface';
import { environments } from 'src/environments/environments';
import { PageableResponse} from '../../interfaces/proyection/pageableResponse.interface';

@Injectable({
    providedIn: 'root',
  })
export class PublicationService{

 private endPoint:string = environments.baseUrl;
 private http = inject(HttpClient);

 allPublications() : Observable<PublicationDto[]>{
    return this.http.get<PublicationDto[]>(`${this.endPoint}/publicar/all`)

 }

 addPublication(publicar:PublicationDto) : Observable<PublicationDto>{
   return this.http.post<PublicationDto>(`${this.endPoint}/publicar`,publicar);
 }
 
 updatePublication(id:number,publication:PublicationDto) : Observable<PublicationDto>{
  return this.http.put<PublicationDto>(`${this.endPoint}/publicar/${id}`,publication);
 }

 getAllPublicationsPageByCategorieId(idCate:number,page:number,size:number) : Observable<PageableResponse>{
  return this.http.get<PageableResponse>(`${this.endPoint}/publicar/categoria/page?categId=${idCate}&page=${page}&size=${size}`);
 }

 deletePublication(id:number): Observable<void>{
    return this.http.delete<void>(`${this.endPoint}/publicar/${id}`);
 }

 publicationById(id:number) : Observable<PublicationDto | null> {
  return this.http.get<PublicationDto>(`${this.endPoint}/publicar/${id}`)
 }

}

