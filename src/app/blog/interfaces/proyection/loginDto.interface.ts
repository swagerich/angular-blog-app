export interface LoginDto{
    username:string;
    password:string;
    token:Token;   
}

export interface Token {
    accesToken:string;
    refreshToken:string;
    bearer:string;
}