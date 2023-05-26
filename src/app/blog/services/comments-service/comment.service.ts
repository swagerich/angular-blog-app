import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable,tap } from 'rxjs';
import { PublicationDto } from '../../interfaces/proyection/publicationDto.interface';
import { environments } from 'src/environments/environments';
import { PageableResponse} from '../../interfaces/proyection/pageableResponse.interface';
import { ComentariDTo } from '../../interfaces/proyection/comentarioDto.interface';
import { PageableResponseComment } from '../../interfaces/proyection/pageableResponseComment.interface';

@Injectable({
    providedIn: 'root',
  })
export class CommentService{

 private endPoint:string = environments.baseUrl;

 private http = inject(HttpClient);

 
 addCommentToPublication(comentario:ComentariDTo,publiId:number) : Observable<ComentariDTo>{
    return this.http.post<ComentariDTo>(`${this.endPoint}/comentario/inPublicacion/${publiId}`,comentario);
 }

 getAllCommentPageInPublicationId(publiId:number,page:number,size:number): Observable<PageableResponseComment>{
    return this.http.get<PageableResponseComment>(`${this.endPoint}/comentario/allcommentPage?publiId=${publiId}&page=${page}&size=${size}`);
 }

 deleteCommentIdInPublicationId(comentId:number,publiId:number): Observable<void>{
   return this.http.delete<void>(`${this.endPoint}/comentario/${comentId}/${publiId}`);
 }
}


