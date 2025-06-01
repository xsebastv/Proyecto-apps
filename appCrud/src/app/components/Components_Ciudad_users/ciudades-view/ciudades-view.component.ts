import { Component, Input, AfterViewInit, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular'; // <-- MODAL
import { CommonModule } from '@angular/common';
import { Ciudad } from 'src/app/interfaces/ciudad.interface';
import mapboxgl from 'mapbox-gl';
import { CiudadesBDService } from 'src/app/services/ciudades-bd.service';
import { PlatosService } from 'src/app/services/platos.service';
import { FamososService } from 'src/app/services/famosos.service';
import { SitiosService } from 'src/app/services/sitios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatosViewPageComponent } from 'src/app/components/Components_Plato_users/platos-view-page/platos-view-page.component'; // <-- MODAL
import { FamososViewComponent } from 'src/app/components/Components_Famoso_users/famosos-view/famosos-view.component'; // importa el componente

@Component({
  selector: 'app-ciudades-view',
  templateUrl: './ciudades-view.component.html',
  styleUrls: ['./ciudades-view.component.scss'],
  standalone: true,
  imports: [FormsModule, IonicModule, CommonModule],
})
export class CiudadesViewComponent implements AfterViewInit, OnChanges {
  @Input() ciudadId!: string;
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;
  ciudad?: Ciudad;
  map?: mapboxgl.Map;
  verMapa: boolean = false;

  platosTipicos: any[] = [];
  famosos: any[] = [];
  sitios: any[] = [];

  constructor(
    private ciudadesService: CiudadesBDService,
    private platosService: PlatosService,
    private famososService: FamososService,
    private sitiosService: SitiosService,
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController // <-- MODAL
  ) {}

  ngAfterViewInit() {
    if (this.ciudadId) {
      this.cargarCiudad();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ciudadId'] && changes['ciudadId'].currentValue) {
      this.cargarCiudad();
    }
  }

  cargarCiudad() {
    this.ciudadesService.getUnaCiudad(this.ciudadId).subscribe((data: any) => {
      this.ciudad = data.resp || data;
      this.cargarPlatosTipicos();
      this.cargarFamosos();
      this.cargarSitios();
      if (this.verMapa) {
        setTimeout(() => this.initMap(), 0);
      }
    }, error => {
      console.error('Error al obtener la ciudad:', error);
    });
  }

  cargarPlatosTipicos() {
    this.platosService.getPlatos().subscribe((data: any) => {
      const todos = data.resp || data.platos || data || [];
      this.platosTipicos = todos.filter((p: any) =>
        (p.ciudad && (p.ciudad._id === this.ciudad?._id || p.ciudad === this.ciudad?._id))
      );
    });
  }

  cargarFamosos() {
    this.famososService.getFamosos().subscribe((data: any) => {
      const todos = data.resp || data.famosos || data || [];
      this.famosos = todos.filter((f: any) =>
        (f.ciudad && (f.ciudad._id === this.ciudad?._id || f.ciudad === this.ciudad?._id))
      );
    });
  }

  cargarSitios() {
    this.sitiosService.getSitios().subscribe((data: any) => {
      const todos = data.resp || data.sitios || data || [];
      this.sitios = todos.filter((s: any) =>
        (s.ciudad && (s.ciudad._id === this.ciudad?._id || s.ciudad === this.ciudad?._id))
      );
    });
  }

  // FUNCIONES DE NAVEGACIÓN A DETALLE
  async verPlato(plato: any) {
    // Abre el detalle del plato como modal
    const modal = await this.modalCtrl.create({
      component: PlatosViewPageComponent,
      componentProps: { platoId: plato._id }
    });
    await modal.present();
  }

  async verFamoso(famoso: any) {
  const modal = await this.modalCtrl.create({
    component: FamososViewComponent,
    componentProps: { famosoId: famoso._id }
  });
  await modal.present();
}

  verSitio(sitio: any) {
    this.router.navigate(['/tabs/sitio', sitio._id]);
  }

  toggleMapa() {
    this.verMapa = !this.verMapa;
    if (this.verMapa && this.ciudad && this.ciudad.latitud && this.ciudad.longitud) {
      setTimeout(() => this.initMap(), 0);
    }
  }

  formatPoblacion(poblacion: number): string {
    if (poblacion >= 1000000) {
      return (poblacion / 1000000).toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' millones';
    }
    return poblacion.toLocaleString('es-CO');
  }

  initMap() {
    if (!this.ciudad?.latitud || !this.ciudad?.longitud || !this.mapContainer) return;

    // Elimina el mapa anterior si existe
    if (this.map) {
      this.map.remove();
    }

    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoieHNlYmFzdHYiLCJhIjoiY21iOGRydGxwMGh1cjJqcHR1Z3E4eml4bCJ9._fz4Xmgls-0TIabepvFpJA',
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.ciudad.longitud, this.ciudad.latitud],
      zoom: 10
    });

    new mapboxgl.Marker()
      .setLngLat([this.ciudad.longitud, this.ciudad.latitud])
      .addTo(this.map);
  }
}