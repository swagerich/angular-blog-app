import { CategoriaDto } from "./categoriaDto.interface";

export interface PublicationDto{
    id:number;
    titulo:string;
    descripcion:string;
    contenido:string;
    categoria:CategoriaDto;
    likes_count:number;
    getPhotoHashCode:number;
}