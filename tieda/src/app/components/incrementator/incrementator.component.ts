import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementator',
  templateUrl: './incrementator.component.html',
  styleUrls: ['./incrementator.component.css']
})
export class IncrementatorComponent {

  @Input() progres: number = 33;
  @Input() progres2: number = 53;

  @Input() btn:any = "algo";

  @Output() exitValue: EventEmitter<number> = new EventEmitter();

  get getProgres1() {
    return `${this.progres}`
  }
  get getProgres2() {
    return `${this.progres2}`
  }

  changeValueOn(value:number){
    if(this.progres >= 100 && value>=0){
      this.exitValue.emit(100);
      return this.progres = 100;
      
    } 
    if( this.progres <= 0 && value < 0 ){
      this.exitValue.emit(0);

      return this.progres = 0;
    } 
    
    this.progres = this.progres + value;
    this.exitValue.emit(this.progres);

    return this.progres
    
  }

  cambioValorHijo(){
    console.log("UILERE IULERE")
  }

  onChange( value:number ) {
    if(value >= 100){
      this.exitValue.emit(100);
    } else if(value <= 0){
      this.exitValue.emit(0);
    } else {
      this.exitValue.emit(value);
    }
    
  }

}
