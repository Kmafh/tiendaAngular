import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementatorComponent } from './incrementator/incrementator.component';
import { FormsModule } from '@angular/forms';
import { DonnalComponent } from './donnal/donnal.component';
import { NgChartsModule } from 'ng2-charts';
import { EscaparateComponent } from './escaparate/escaparate.component';



@NgModule({
  declarations: [
    IncrementatorComponent,
    DonnalComponent,
    EscaparateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports:[
    IncrementatorComponent,
    DonnalComponent,
    EscaparateComponent

  ]
})
export class ComponentsModule { }
