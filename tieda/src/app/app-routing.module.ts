import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotfoundpageComponent } from './pages/notfoundpage/notfoundpage.component';
import { PagesComponent } from './pages/pages.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { GraficaComponent } from './pages/grafica/grafica.component';
import { AccountSettingComponent } from './pages/account-setting/account-setting.component';
import { RxjsComponent } from './pages/rxjs/rxjs.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent,data:{title:'Dashboard'} },
      { path: 'progress', component: ProgressComponent,data:{title:'Barras Progreso'} },
      { path: 'graphic', component: GraficaComponent,data:{title:'Gráfica'} },
      { path: 'account', component: AccountSettingComponent,data:{title:'Ajustes de cuenta'} },
      { path: 'rxjs', component: RxjsComponent,data:{title:':RXJS:'} },
      { path: 'profile', component: ProfileComponent,data:{title:'Perfil'} }

    ],
  },
  { path: '', redirectTo: "/dashboard", pathMatch: 'full'},
  { path: 'login', component: PagesComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotfoundpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
