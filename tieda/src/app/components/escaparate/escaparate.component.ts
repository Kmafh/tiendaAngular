import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/enviroments/environment.prod';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { ScrollDispatcher } from '@angular/cdk/scrolling';

const endpoint: any = environment.base_url;

@Component({
  selector: 'app-escaparate',
  templateUrl: './escaparate.component.html',
  styleUrls: ['./escaparate.component.css'],
})
export class EscaparateComponent implements OnInit {
  @ViewChild('scrollable') scrollable: ElementRef | undefined;
  @Input() table: string = 'dentro';
  displayedItems: any[] = [];
  resp: any;
  items!: any;
  imgUrl: string;
  constructor(
    private utilsService: UtilsService,
    private scrollDispatcher: ScrollDispatcher
  ) {
    this.imgUrl = endpoint + '/upload/productos/';
  }

  respSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  cambiarResp(nuevoValorResp: any) {
    // Cambia el valor de resp
    this.respSubject.next(nuevoValorResp);
  }
  async ngOnInit(): Promise<void> {
    
    switch (this.table) {
      case 'product':
        this.resp = await this.utilsService.getProducts();
        this.items = this.resp;
        this.respSubject.subscribe((newResp) => {
          // Actualiza items cuando resp cambia
          this.items = newResp;
          this.displayItems();
        this.scrollDispatcher.scrolled().subscribe(() => {
          this.onScroll();
        });
        });
        
        // Simula un cambio en resp (puedes reemplazar esto con tu lógica real)
        this.cambiarResp(this.resp);
        break;
      case 'provee':
        this.resp = this.utilsService.getProducts();
        this.items = this.resp;
        break;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['table']) {
      console.log('Table changed: ', changes['table'].currentValue);
    }
  }

  displayItems() {
    // Muestra los primeros elementos (por ejemplo, los primeros 10)
    this.displayedItems = this.items.slice(0, 10);
  }

  onScroll() {
    if (this.shouldLoadMore()) {
      // Carga más elementos (por ejemplo, los siguientes 5)
      const startIndex = this.displayedItems.length;
      const endIndex = startIndex + 5;
      this.displayedItems = [
        ...this.displayedItems,
        ...this.items.slice(startIndex, endIndex),
      ];
    }
  }
  shouldLoadMore() {
    if (!this.scrollable) {
      return false;
    }

    const element = this.scrollable.nativeElement;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;

    // Carga más elementos cuando el usuario llega al final del contenedor
    return scrollTop + clientHeight >= scrollHeight;
  }
}
