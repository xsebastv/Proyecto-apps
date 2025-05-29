import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaisesService } from 'src/app/services/paises.service';
import { CiudadesBDService } from 'src/app/services/ciudades-bd.service';
import { CiudadesListComponent } from 'src/app/components/Components_Ciudad_users/ciudades-list/ciudades-list.component';

@Component({
  selector: 'app-ciudades-admin',
  templateUrl: './ciudades-admin.page.html',
  styleUrls: ['./ciudades-admin.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, CiudadesListComponent]
})
export class CiudadesAdminPage implements OnInit {
  paises: any[] = [];
  ciudades: any[] = [];
  ciudadesFiltradas: any[] = [];
  paisSeleccionado: string = '';

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
      console.log('Respuesta de la API de países:', data);
      this.paises = data.resp || data.paises || data || [];
    }, error => {
      console.error('Error al cargar países:', error);
    });
  }

  cargarCiudades() {
    this.ciudadesService.getCiudades().subscribe((data: any) => {
      this.ciudades = data.resp || data || [];
      this.filtrarPorPais();
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
}