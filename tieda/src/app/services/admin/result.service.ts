import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private table: string = '';
  private tableSubject: Subject<string> = new Subject<string>();

  constructor() { }

  getTable(): string {
    return this.table;
  }

  setTable(table: string) {
    this.table = table;
    this.tableSubject.next(table); // Emitir el nuevo valor a los suscriptores
  }

  getTableObservable() {
    return this.tableSubject.asObservable();
  }
}
