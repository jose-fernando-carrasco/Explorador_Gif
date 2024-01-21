import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBusqueda') txtBusqueda!:ElementRef<HTMLInputElement>;

  constructor( private Service:GifsService){}

  buscar(){
    const valor = this.txtBusqueda.nativeElement.value;
    if( valor.trim().length == 0 ){ return; }
    this.Service.buscar(valor);
    this.txtBusqueda.nativeElement.value = '';
  }

}
