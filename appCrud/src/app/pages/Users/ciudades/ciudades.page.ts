import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaisesService } from 'src/app/services/paises.service';
import { CiudadesBDService } from 'src/app/services/ciudades-bd.service';
import { CiudadesListComponent } from 'src/app/components/Components_Ciudad_users/ciudades-list/ciudades-list.component';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.page.html',
  styleUrls: ['./ciudades.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, CiudadesListComponent]
})
export class CiudadesPage implements OnInit {
  paises: any[] = [];
  ciudades: any[] = [];
  ciudadesFiltradas: any[] = [];
  paisSeleccionado: string = '';
  titulo: string = 'Ciudades';
  subtitulo: string = 'Listado general';

  constructor(
    private paisesService: PaisesService,
    private ciudadesService: CiudadesBDService
  ) {}

  ngOnInit() {
    this.cargarPaises();
    this.cargarCiudades();
  }

  cargarPaises() {
    this.paisesService.getPaises().subscribe((data: any) => {
      this.paises = data.resp || data.paises || data || [];
    }, error => {
      console.error('Error al cargar países:', error);
    });
  }

  cargarCiudades() {
    this.ciudadesService.getCiudades().subscribe((data: any) => {
      this.ciudades = data.resp || data || [];
      this.filtrarPorPais();
    }, error => {
      console.error('Error al cargar ciudades:', error);
    });
  }

  filtrarPorPais() {
    if (this.paisSeleccionado) {
      this.ciudadesFiltradas = this.ciudades.filter(
        c => c.pais && (c.pais._id === this.paisSeleccionado || c.pais === this.paisSeleccionado)
      );
    } else {
      this.ciudadesFiltradas = this.ciudades;
    }
  }

  onPaisChange(event: any) {
    this.paisSeleccionado = event.detail.value;
    this.filtrarPorPais();
  }
}