import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable,tap } from 'rxjs';
import { environments } from 'src/environments/environments';
import { ComentarioDTo } from '../../interfaces/proyection/comentarioDto.interface';
import { PageableResponseComment } from '../../interfaces/proyection/pageableResponseComment.interface';

@Injectable({
    providedIn: 'root',
  })
export class CommentService{

 private endPoint:string = environments.baseUrl;

 private http = inject(HttpClient);

 addCommentToPublication(comentario:ComentarioDTo,publiId:number,userId:number) : Observable<ComentarioDTo>{
    return this.http.post<ComentarioDTo>(`${this.endPoint}/comentario/inPublicacion/${publiId}/${userId}`,comentario);
 }

 getAllCommentPageInPublicationId(publiId:number,page:number,size:number): Observable<PageableResponseComment>{
    return this.http.get<PageableResponseComment>(`${this.endPoint}/comentario/allcommentPage?publiId=${publiId}&page=${page}&size=${size}`);
 }

 deleteCommentIdInPublicationId(comentId:number,publiId:number): Observable<void>{
   return this.http.delete<void>(`${this.endPoint}/comentario/${comentId}/${publiId}`);
 }

 getAllComentInpublicationId(publiId:number):Observable<ComentarioDTo[]> {
  return this.http.get<ComentarioDTo[]>(`${this.endPoint}/comentario/comments/${publiId}`);
 }
}


