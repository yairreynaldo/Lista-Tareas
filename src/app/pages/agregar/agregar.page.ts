import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista-model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';

  constructor(private serviceDeseos: DeseosService,
              private route: ActivatedRoute) {
    const listaId = this.route.snapshot.paramMap.get('listaId')
    
    this.lista = this.serviceDeseos.obtenerLista(listaId);

    console.log(this.lista);
    }

  ngOnInit() {
  }

  agregarItem() {
    if(this.nombreItem.length === 0) {
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.nombreItem = '';
    this.serviceDeseos.guardarStorage();
  }

  cambioCheck(item: ListaItem) {
    const pendientes = this.lista.items.filter(itemData => !itemData.completado).length;

    if(pendientes === 0) {
      this.lista.terminadaEN = new Date();
      this.lista.terminada = true
    }else {
      this.lista.terminadaEN = null;
      this.lista.terminada = false
    }

    this.serviceDeseos.guardarStorage();

    console.log(this.serviceDeseos.listas);
  }

  borrar(i:number){
    this.lista.items.splice(i, 1);
    this.serviceDeseos.guardarStorage();
  }

}
