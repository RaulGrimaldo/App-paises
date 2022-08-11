import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
    button {
      margin-right: 5px;
    }
    `
  ]
})
export class PorRegionComponent {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];

  regionactiva: string = '';
  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  getClassCSS(region: string): string{
    return (region === this.regionactiva)? 'btn btn-primary':' btn btn-outline-primary';
  }

  activarRegion( region: string){
    
      if(this.regionactiva === region){
        return;
        
      }
      this.regionactiva = region;
      this.paises = [];  
      
      this.paisService.buscarRegion( this.regionactiva ).subscribe({
        next: (paisesResp) => {
          console.log(paisesResp) 
          this.paises = paisesResp;
        },
        error: (err) => {
          console.log(err);     
          this.paises = [];  
        }
      });

  }

}
