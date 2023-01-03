import { Injectable } from '@angular/core';
import { Lista } from '../models/lista-model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() {
    
    this.cargarStorage();

    /* const lista1: Lista = new Lista("Recolectar piedras del infinito");
    const lista2: Lista = new Lista("Heroes a desaparecer");

    this.listas.push(lista1, lista2); */

    console.log(this.listas);
  }

  crearLista(titulo: string) {
    const nuevaLista: Lista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();

    return nuevaLista.id;
  }

  borrarLista(lista: Lista) {
    this.listas = this.listas.filter(listaData => listaData.id !== lista.id);

    this.guardarStorage();
  }

  obtenerLista(id: string |number) {
    id = Number(id);
    return this.listas.find(listaData => listaData.id === id);
  }

  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas))
  }

  cargarStorage() {
    const _listas = localStorage.getItem('data');

    if(_listas !== null){
      this.listas = JSON.parse(_listas);
    }else{
      this.listas = [];
    }
  }
}
