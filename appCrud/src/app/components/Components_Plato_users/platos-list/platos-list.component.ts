import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PlatosService } from 'src/app/services/platos.service';
import { PaisesService } from 'src/app/services/paises.service';
import { CiudadesBDService } from 'src/app/services/ciudades-bd.service';
import { IonicModule } from '@ionic/angular';
import { PlatosViewComponent } from '../platos-view/platos-view.component';

@Component({
  selector: 'app-platos-list',
  templateUrl: './platos-list.component.html',
  styleUrls: ['./platos-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonicModule,
    PlatosViewComponent
  ]
})
export class PlatosListComponent implements OnInit {
  @Input() platos: any[] = [];         
  @Input() titulo: string = 'Platos típicos'; 
  @Input() subtitulo: string = '';    

  platosMostrados: any[] = [];
  paisId: string = '';
  isModalOpen = false;
  platoIdSeleccionado: string | null = null;

  // Mapas para cachear nombres
  mapaPaises: { [id: string]: string } = {};
  mapaCiudades: { [id: string]: string } = {};

  // Paginación
  page: number = 0;
  pageSize: number = 10;
  hasMore: boolean = true;
  allPlatos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private platosService: PlatosService,
    private paisesService: PaisesService,
    private ciudadesService: CiudadesBDService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Escucha cambios en los parámetros de la ruta para recargar platos al cambiar de país
    this.route.queryParams.subscribe(() => {
      this.cargarPlatos(true);
    });
  }

  cargarPlatos(reset: boolean = false) {
    if (reset) {
      this.page = 0;
      this.platosMostrados = [];
      this.hasMore = true;
      this.allPlatos = [];
    }
    this.paisId = this.route.snapshot.queryParamMap.get('pais') || '';
    if (this.paisId) {
      this.platosService.getPlatosPorPais(this.paisId).subscribe((data: any) => {
        this.allPlatos = Array.isArray(data) ? data : data.platos || [];
        this.agregarPagina();
      });
    } else if (this.platos && this.platos.length > 0) {
      this.allPlatos = this.platos;
      this.agregarPagina();
    }
  }

  agregarPagina() {
    const start = this.page * this.pageSize;
    const end = start + this.pageSize;
    const nextPlatos = this.allPlatos.slice(start, end);
    this.platosMostrados = this.platosMostrados.concat(nextPlatos);
    this.hasMore = end < this.allPlatos.length;
    this.cargarNombresPaisesCiudades();
    this.cdr.detectChanges();
  }

  // Cargar nombres de país y ciudad para cada plato
  cargarNombresPaisesCiudades() {
    this.platosMostrados.forEach(plato => {
      // País
      const paisId = typeof plato.pais === 'object' ? plato.pais._id : plato.pais;
      if (paisId && !this.mapaPaises[paisId]) {
        this.paisesService.getUnPais(paisId).subscribe((data: any) => {
          this.mapaPaises[paisId] = data.nombre || data.pais?.nombre || paisId;
          this.cdr.detectChanges();
        });
      }
      // Ciudad
      const ciudadId = typeof plato.ciudad === 'object' ? plato.ciudad._id : plato.ciudad;
      if (ciudadId && !this.mapaCiudades[ciudadId]) {
        this.ciudadesService.getUnaCiudad(ciudadId).subscribe((data: any) => {
          this.mapaCiudades[ciudadId] = data.nombre || data.ciudad?.nombre || ciudadId;
          this.cdr.detectChanges();
        });
      }
    });
  }

  reload() {
    this.cargarPlatos(true);
  }

  verPlato(platoId: string) {
    this.platoIdSeleccionado = platoId;
    this.isModalOpen = true;
  }

  cancel() {
    this.isModalOpen = false;
    this.platoIdSeleccionado = null;
  }

  onWillDismiss(event: any) {
    this.isModalOpen = false;
    this.platoIdSeleccionado = null;
  }

  getNombrePais(plato: any): string {
    const paisId = typeof plato.pais === 'object' ? plato.pais._id : plato.pais;
    return this.mapaPaises[paisId] || '';
  }

  getNombreCiudad(plato: any): string {
    const ciudadId = typeof plato.ciudad === 'object' ? plato.ciudad._id : plato.ciudad;
    return this.mapaCiudades[ciudadId] || '';
  }

  loadData(event: any) {
    this.page++;
    this.agregarPagina();
    setTimeout(() => {
      event.target.complete();
      if (!this.hasMore) {
        event.target.disabled = true;
      }
    }, 300);
  }
}