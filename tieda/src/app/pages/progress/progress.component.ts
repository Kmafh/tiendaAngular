import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {
  progres: number = 30;
  progres2: number = 20;

  get getProgres1() {
    return `${this.progres}%`;
  }
  get getProgres2() {
    return `${this.progres2}%`;
  }

  

  cambioValorHijo(value:number) {
    this.progres = value;
    console.log('Hey'+value);
  }
}
