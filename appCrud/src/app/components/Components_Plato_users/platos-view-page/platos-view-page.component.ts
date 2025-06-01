import { Component, OnInit, Input } from '@angular/core';
import { PlatosService } from 'src/app/services/platos.service';
import { PaisesService } from 'src/app/services/paises.service';
import { CiudadesBDService } from 'src/app/services/ciudades-bd.service';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-platos-view-page',
  templateUrl: './platos-view-page.component.html',
  styleUrls: ['./platos-view-page.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class PlatosViewPageComponent implements OnInit {
  @Input() platoId!: string;
  plato: any;
  nombrePais: string = '';
  nombreCiudad: string = '';
  ciudadId: string | null = null;

  constructor(
    private platosService: PlatosService,
    private paisesService: PaisesService,
    private ciudadesService: CiudadesBDService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    // platoId puede venir por @Input (modal) o por ruta (router)
    if (!this.platoId) {
      // fallback por si se usa como página (no modal)
      // window.location.pathname: /tabs/ciudades/:ciudadId/plato/:id
      const pathParts = window.location.pathname.split('/');
      const idx = pathParts.indexOf('plato');
      if (idx !== -1 && pathParts[idx + 1]) {
        this.platoId = pathParts[idx + 1];
      }
    }
    if (this.platoId) {
      this.cargarPlato();
    }
  }

  cargarPlato() {
    this.platosService.getUnPlato(this.platoId).subscribe((data: any) => {
      this.plato = data;
      this.cargarNombrePaisYCiudad();
    });
  }

  cargarNombrePaisYCiudad() {
    // País
    const paisId = typeof this.plato?.pais === 'object' ? this.plato.pais._id : this.plato?.pais;
    if (paisId) {
      this.paisesService.getUnPais(paisId).subscribe((data: any) => {
        this.nombrePais = data.nombre || data.pais?.nombre || '';
      });
    } else {
      this.nombrePais = '';
    }
    // Ciudad
    const ciudadId = typeof this.plato?.ciudad === 'object' ? this.plato.ciudad._id : this.plato?.ciudad;
    if (ciudadId) {
      this.ciudadesService.getUnaCiudad(ciudadId).subscribe((data: any) => {
        this.nombreCiudad = data.nombre || data.ciudad?.nombre || '';
      });
    } else {
      this.nombreCiudad = '';
    }
  }

  volverACiudad() {
    this.modalCtrl.dismiss();
  }
}