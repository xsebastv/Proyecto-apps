import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Pais } from 'src/app/interfaces/pais.interface';
import { PaisesService } from 'src/app/services/paises.service';
import { PlatosService } from 'src/app/services/platos.service';

@Component({
  selector: 'app-paises-view',
  templateUrl: './paises-view.component.html',
  styleUrls: ['./paises-view.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class PaisesViewComponent implements OnChanges {
  @Input() paisId!: string;
  pais?: Pais;
  platosTipicos: any[] = [];

  constructor(
    private paisesService: PaisesService,
    private platosService: PlatosService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['paisId'] && changes['paisId'].currentValue) {
      this.cargarPais();
      this.cargarPlatosTipicos();
    }
  }

  cargarPais() {
    this.paisesService.getUnPais(this.paisId).subscribe({
      next: (data: any) => {
        this.pais = data;
      },
      error: (error) => {
        console.error('Error al obtener el país:', error);
      }
    });
  }

 cargarPlatosTipicos() {
  this.platosService.getPlatosPorPais(this.paisId).subscribe({
    next: (data: any) => {
      let platos: any[] = [];
      if (Array.isArray(data)) {
        platos = data;
      } else if (Array.isArray(data.platos)) {
        platos = data.platos;
      }
      this.platosTipicos = platos.slice(0, 3); // Solo los 3 primeros
    },
    error: (err) => {
      this.platosTipicos = [];
    }
  });
}

 verTodosPlatos() {
    this.router.navigate(['/platos-list'], { queryParams: { pais: this.paisId } });
  }

  formatPoblacion(poblacion: number): string {
    if (poblacion >= 1000000) {
      return (poblacion / 1000000).toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' millones';
    }
    return poblacion.toLocaleString('es-CO');
  }
}