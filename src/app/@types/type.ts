
interface RegisterTypes {
    id?:string;
    name:string;
    email:string;
    password:string;
    image:any;
}
interface SessionProps {
    email: string;
    exp: number;
    iat: number;
    jti: string;
    name: string;
    picture: string;
    sub: string;
  }