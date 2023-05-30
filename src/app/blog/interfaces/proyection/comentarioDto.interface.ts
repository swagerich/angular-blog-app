import { UserDto } from "./userDto.interface";

export interface ComentarioDTo{
    id:number;
    nombre:string;
    email:string;
    texto:string
    user:UserDto;
}