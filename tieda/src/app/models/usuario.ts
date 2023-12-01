import { environment } from "src/enviroments/environment.prod"

const endpoint = environment.base_url
export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public img: string,
        public uid: string,
        public role?: string,
        public google?: boolean,
        public password?: string,
    ){

    }
    get getImg(){
        console.log("Imagen"+this.img)
        if(this.img.includes('http')){
            return this.img;
        } else if(this.img){
            return `${endpoint}/upload/usuarios/${this.img}`
        } else {
            return `${endpoint}/upload/usuarios/not-image`

        }
        return ''
    }
}
