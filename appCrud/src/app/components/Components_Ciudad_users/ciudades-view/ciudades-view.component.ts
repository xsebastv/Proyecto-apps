import { Component, Input, AfterViewInit, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Ciudad } from 'src/app/interfaces/ciudad.interface';
import mapboxgl from 'mapbox-gl';
import { CiudadesBDService } from 'src/app/services/ciudades-bd.service';
import { PlatosService } from 'src/app/services/platos.service';
import { FamososService } from 'src/app/services/famosos.service';
import { SitiosService } from 'src/app/services/sitios.service';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatosViewPageComponent } from 'src/app/components/Components_Plato_users/platos-view-page/platos-view-page.component';
import { FamososViewComponent } from 'src/app/components/Components_Famoso_users/famosos-view/famosos-view.component';
import { SitiosViewComponent } from 'src/app/components/Components_Sitio_users/sitios-view/sitios-view.component';

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

  favoritos: string[] = [];

  constructor(
    private ciudadesService: CiudadesBDService,
    private platosService: PlatosService,
    private famososService: FamososService,
    private sitiosService: SitiosService,
    private favoritosService: FavoritosService,
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController
  ) {}

  ngAfterViewInit() {
    this.cargarFavoritos();
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

  // --- FAVORITOS DESDE API ---
  cargarFavoritos() {
    this.favoritosService.getFavoritos().subscribe({
      next: (resp: any) => {
        // Ajusta aquí según la respuesta real de tu API
        if (Array.isArray(resp.favoritos)) {
          this.favoritos = resp.favoritos.map((f: any) => typeof f === 'string' ? f : f._id);
        } else if (Array.isArray(resp)) {
          this.favoritos = resp.map((f: any) => typeof f === 'string' ? f : f._id);
        } else {
          this.favoritos = [];
        }
      },
      error: err => {
        console.error('Error al cargar favoritos', err);
        this.favoritos = [];
      }
    });
  }

  esFavorito(id: string): boolean {
    return this.favoritos.includes(id);
  }

  toggleFavorito(sitio: any, event?: Event) {
    if (event) event.stopPropagation();
    if (this.esFavorito(sitio._id)) {
      this.favoritosService.quitarFavorito(sitio._id).subscribe({
        next: () => this.cargarFavoritos(),
        error: err => console.error('Error al quitar favorito', err)
      });
    } else {
      this.favoritosService.agregarFavorito(sitio._id).subscribe({
        next: () => this.cargarFavoritos(),
        error: err => console.error('Error al agregar favorito', err)
      });
    }
  }

  // FUNCIONES DE NAVEGACIÓN A DETALLE
  async verPlato(plato: any) {
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

  async verSitio(sitio: any) {
    const modal = await this.modalCtrl.create({
      component: SitiosViewComponent,
      componentProps: { sitioId: sitio._id }
    });
    await modal.present();
    await modal.onDidDismiss();
    this.cargarFavoritos(); // <-- Recarga favoritos al cerrar el modal
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