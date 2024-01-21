import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  get historial(){ return this.Service.historial; }

  constructor( private Service:GifsService){}

  buscar( data:string){
    // console.log(data);
    this.Service.buscar(data);
  }

}
