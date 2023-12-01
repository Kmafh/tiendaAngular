import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { ProgressComponent } from './progress/progress.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { GraficaComponent } from './grafica/grafica.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    NotfoundpageComponent,
    DashboardComponent,
    PagesComponent,
    ProgressComponent,
    GraficaComponent,
    AccountSettingComponent,
    RxjsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ComponentsModule
  ],
  exports:[
    PagesComponent,
    AccountSettingComponent

  ]
})
export class PagesModule { }
