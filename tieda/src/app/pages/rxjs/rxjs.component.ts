import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent implements OnDestroy{

  public intervaSubs: Subscription;

  constructor() {

    this.intervaSubs = this.retornaInterval().subscribe(
      (valor) => console.log(valor)
      
      );
  }
  ngOnDestroy(): void {
    this.intervaSubs.unsubscribe();
  }

  retornaInterval() :Observable<number>{
    return interval(100)
    .pipe(
      map(valor => valor +1),
      filter(valor => ( valor % 2===0 ) ? true:false),
    );
  }

  retornaObs(): Observable<number> {
    let i = 0;

    return new Observable<number>((observer) => {
      const inteval = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(inteval);
          observer.complete();
        }
        if (i === 2) {
          observer.error('i llego a dos');
        }
      }, 1000);
    });
  }
}
