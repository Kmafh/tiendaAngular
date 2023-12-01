import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent {
public labels1: string[] = ['Pan','leche','Sal'];
public labels2: string[] = ['Mas','tru','Cal'];
public labels3: string[] = ['NBG','CDV','DCA'];
public labels4: string[] = ['FV','FVFC','DC'];
data1:number[] = [ 350,520,320 ];
data2:number[] = [ 12,2,34 ];
data3:number[] = [ 23,4,655 ];
data4:number[] = [ 33,44,55 ];
}
