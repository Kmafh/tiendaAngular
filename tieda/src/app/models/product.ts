export class Product {
    title:string = '';
    marca:string = '';
    category:string = '';
    stock!:number;
    price!:number;
    createAt:Date = new Date();
    seg_mano:boolean = false;
    VID:string = '';
    description:string = '';
    img:string = '';
}
