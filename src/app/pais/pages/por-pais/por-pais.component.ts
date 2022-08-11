import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer
      }
    `
  ]
})
export class PorPaisComponent {
 
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];

  mostrarSugerencias: boolean = false;

  constructor( private paisService: PaisService) { }

  buscar( termino: string) {

    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarPais( this.termino ).subscribe({
      next: (paisesResp) => {
        console.log(paisesResp) 
        this.paises = paisesResp;
      },
      error: (err) => {
        console.log(err);   
        this.hayError = true;   
        this.paises = [];  
      }
    });
  }

  sugerencias(termino: string){
    this.hayError= false;
    this.mostrarSugerencias= true;
    this.termino = termino;
    this.paisService.buscarPais( termino ).subscribe({
      next: (paisesResp) => {
        this.paisesSugeridos = paisesResp.splice(0, 5);
      },
      error: (err) => {
        this.paisesSugeridos = [];  
      }
    });
  }

  buscarSugerido(termino: string){
    this.buscar(termino);
  }
 
}
