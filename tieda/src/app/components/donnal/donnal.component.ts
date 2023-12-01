import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';

@Component({
  selector: 'app-donnal',
  templateUrl: './donnal.component.html',
  styleUrls: ['./donnal.component.css']
})
export class DonnalComponent implements OnInit{
 
  @Input() colors: any = ['#745af2','#ffb22b','#06d79c']
  @Input() title:any = "Sin titulo"
  @Input() dataInput:number[] = [ 0, 0, 0 ]
   // Doughnut
   @Input('labels') doughnutChartLabels: string[] = [ 'A', 'B', 'C' ];
   @Input('data') doughnutChartData: ChartData<'doughnut'> = {
     labels: this.doughnutChartLabels,
     datasets: [
       { data: this.dataInput , backgroundColor: this.colors },
     ]
   };
   public doughnutChartType: ChartType = 'doughnut';
 
   ngOnInit(): void {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: this.dataInput , backgroundColor: this.colors },
      ]
    };
  }

}
