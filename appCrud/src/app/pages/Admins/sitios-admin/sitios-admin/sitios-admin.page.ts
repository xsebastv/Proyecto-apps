import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaisesService } from 'src/app/services/paises.service';
import { SitiosService } from 'src/app/services/sitios.service';
import { SitiosListAdminComponent } from 'src/app/components/Components_Sitio_admin/sitios-list-admin/sitios-list-admin.component';
import { SitiosViewAdminComponent } from 'src/app/components/Components_Sitio_admin/sitios-view-admin/sitios-view-admin.component';
import { Sitio } from 'src/app/interfaces/sitio.interface';

@Component({
  selector: 'app-sitios-admin',
  templateUrl: './sitios-admin.page.html',
  styleUrls: ['./sitios-admin.page.scss'],
  standalone: true,
  imports: [
    IonicModule, FormsModule, CommonModule,
    SitiosListAdminComponent, SitiosViewAdminComponent
  ]
})
export class SitiosAdminPage implements OnInit {
  paises: any[] = [];
  sitios: Sitio[] = [];
  sitiosFiltrados: Sitio[] = [];
  paisSeleccionado: string = '';
  titulo: string = 'Sitios';
  subtitulo: string = 'Listado general';
  cargando = false;

  sitioSeleccionado: Partial<Sitio> = {};
  modo: 'ver' | 'editar' | 'crear' | null = null;

  constructor(
    private paisesService: PaisesService,
    private sitiosService: SitiosService
  ) {}

  ngOnInit() {
    this.cargarPaises();
    this.cargarSitios();
  }

  cargarPaises() {
    this.paisesService.getPaises().subscribe((data: any) => {
      this.paises = data.resp || data.paises || data || [];
    }, error => {
      console.error('Error al cargar países:', error);
    });
  }

  cargarSitios() {
    this.cargando = true;
    this.sitiosService.getSitios().subscribe((data: any) => {
      this.sitios = data.resp || data.sitios || data || [];
      this.filtrarPorPais();
      this.cargando = false;
    }, error => {
      this.cargando = false;
      console.error('Error al cargar sitios:', error);
    });
  }

  filtrarPorPais() {
    if (this.paisSeleccionado) {
      this.sitiosFiltrados = this.sitios.filter(
        s => s.pais && (typeof s.pais === 'string'
          ? s.pais === this.paisSeleccionado
          : s.pais._id === this.paisSeleccionado)
      );
    } else {
      this.sitiosFiltrados = this.sitios;
    }
  }

  onPaisChange(event: any) {
    this.paisSeleccionado = event.detail.value;
    this.filtrarPorPais();
  }

  onVerSitio(sitio: Sitio) {
    this.sitioSeleccionado = sitio;
    this.modo = 'ver';
  }

  onEditarSitio(sitio: Sitio) {
    this.sitioSeleccionado = { ...sitio };
    this.modo = 'editar';
  }

  onEliminarSitio(id: string) {
    if (!id) return;
    const sitio: Sitio = { _id: id, nombre: '', pais: '' };
    this.sitiosService.crud_Sitio(sitio, 'eliminar').subscribe({
      next: () => this.cargarSitios()
    });
  }

  onCrearSitio() {
    this.sitioSeleccionado = { nombre: '', pais: '', direccion: '', longitud: 0 };
    this.modo = 'crear';
  }

  onGuardarSitio(sitio: Partial<Sitio>) {
    if (this.modo === 'crear') {
      this.sitiosService.crud_Sitio(sitio as Sitio, 'insertar').subscribe({
        next: () => {
          this.cargarSitios();
          this.modo = null;
          this.sitioSeleccionado = {};
        }
      });
    } else if (this.modo === 'editar' && sitio._id) {
      this.sitiosService.crud_Sitio(sitio as Sitio, 'modificar').subscribe({
        next: () => {
          this.cargarSitios();
          this.modo = null;
          this.sitioSeleccionado = {};
        }
      });
    }
  }

  onCancelar() {
    this.modo = null;
    this.sitioSeleccionado = {};
  }
}