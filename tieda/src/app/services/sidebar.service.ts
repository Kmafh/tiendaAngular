import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any = [
    {
      title: 'Dashboard',
      icons: 'mdi-mdi-image',
      submenu: [
        { title: 'Dashboard', icons: 'mdi-mdi-image', url: '/dashboard' },
        { title: 'Barra progreso', icons: 'mdi-mdi-image', url: 'progress' },
        { title: 'Gráfica', icons: 'mdi-mdi-image', url: 'graphic' },
        { title: 'Rxjs', icons: 'mdi-mdi-image', url: 'rxjs' },
      ],
    },
  ];
  constructor() {}
}
