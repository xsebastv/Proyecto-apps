import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { SitiosService } from 'src/app/services/sitios.service';
import { PaisesService } from 'src/app/services/paises.service';
import { CiudadesBDService } from 'src/app/services/ciudades-bd.service';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { AuthService } from 'src/app/services/auth.service';
import { VisitasService } from 'src/app/services/visitas.service';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-sitios-view',
  templateUrl: './sitios-view.component.html',
  styleUrls: ['./sitios-view.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class SitiosViewComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() sitioId!: string;
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;
  sitio: any;
  nombrePais: string = '';
  nombreCiudad: string = '';
  favoritos: string[] = [];
  yaVisitado: boolean = false;
  idVisita: string | null = null;
  verMapa: boolean = false;
  map?: mapboxgl.Map;

  constructor(
    private sitiosService: SitiosService,
    private paisesService: PaisesService,
    private ciudadesService: CiudadesBDService,
    private favoritosService: FavoritosService,
    private authService: AuthService,
    private visitasService: VisitasService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    if (!this.sitioId) {
      const pathParts = window.location.pathname.split('/');
      const idx = pathParts.indexOf('sitio');
      if (idx !== -1 && pathParts[idx + 1]) {
        this.sitioId = pathParts[idx + 1];
      }
    }
    this.cargarFavoritos();
    if (this.sitioId) {
      this.cargarSitio();
    }
  }

  ngAfterViewInit() {
    // Si el mapa ya debe mostrarse al cargar
    if (this.verMapa && this.sitio && this.sitio.latitud && this.sitio.longitud) {
      this.initMap();
    }
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  cargarSitio() {
    this.sitiosService.getUnSitio(this.sitioId).subscribe((data: any) => {
      this.sitio = data;
      this.cargarNombrePaisYCiudad();
      this.verificarVisita();
      if (this.verMapa && this.sitio.latitud && this.sitio.longitud) {
        setTimeout(() => this.initMap(), 0);
      }
    });
  }

  cargarNombrePaisYCiudad() {
    const paisId = typeof this.sitio?.pais === 'object' ? this.sitio.pais._id : this.sitio?.pais;
    if (paisId) {
      this.paisesService.getUnPais(paisId).subscribe((data: any) => {
        this.nombrePais = data.nombre || data.pais?.nombre || '';
      });
    } else {
      this.nombrePais = '';
    }
    const ciudadId = typeof this.sitio?.ciudad === 'object' ? this.sitio.ciudad._id : this.sitio?.ciudad;
    if (ciudadId) {
      this.ciudadesService.getUnaCiudad(ciudadId).subscribe((data: any) => {
        this.nombreCiudad = data.nombre || data.ciudad?.nombre || '';
      });
    } else {
      this.nombreCiudad = '';
    }
  }

  // --- Favoritos desde API ---
  cargarFavoritos() {
    this.favoritosService.getFavoritos().subscribe({
      next: (resp: any) => {
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

  toggleFavorito(sitio: any) {
    if (this.esFavorito(sitio._id)) {
      this.favoritosService.quitarFavorito(sitio._id).subscribe({
        next: () => {
          this.cargarFavoritos();
          console.log('Quitado de favoritos');
        },
        error: err => {
          console.error('Error al quitar favorito', err);
        }
      });
    } else {
      this.favoritosService.agregarFavorito(sitio._id).subscribe({
        next: (res) => {
          this.cargarFavoritos();
          console.log('Agregado a favoritos', res);
        },
        error: err => {
          console.error('Error al agregar favorito', err);
        }
      });
    }
  }

  registrarVisita() {
    this.visitasService.registrarVisita(this.sitioId).subscribe({
      next: (visita: any) => {
        alert('¡Visita registrada!');
        this.yaVisitado = true;
        this.idVisita = visita?._id || null;
      },
      error: err => {
        alert('Error al registrar visita');
        console.error(err);
      }
    });
  }

  quitarVisita() {
    if (this.idVisita && confirm('¿Estás seguro de quitar la visita de este sitio?')) {
      this.visitasService.eliminarVisitaPorId(this.idVisita).subscribe({
        next: () => {
          alert('Visita eliminada');
          this.yaVisitado = false;
          this.idVisita = null;
        },
        error: err => {
          alert('Error al eliminar visita');
          console.error(err);
        }
      });
    }
  }

  verificarVisita() {
    this.visitasService.obtenerVisitaUsuarioSitio(this.sitioId).subscribe({
      next: (resp: any) => {
        // Si tu backend devuelve un array de visitas:
        if (Array.isArray(resp) && resp.length > 0) {
          // Filtra solo las visitas del usuario actual
          const userId = this.authService.getUserId();
          const visitasUsuario = resp.filter((v: any) =>
            (v.usuario?._id || v.usuario) === userId
          );
          if (visitasUsuario.length > 0) {
            this.yaVisitado = true;
            this.idVisita = visitasUsuario[0]._id;
          } else {
            this.yaVisitado = false;
            this.idVisita = null;
          }
        } else if (resp && resp._id) {
          // Si es un solo objeto, verifica el usuario
          const userId = this.authService.getUserId();
          if ((resp.usuario?._id || resp.usuario) === userId) {
            this.yaVisitado = true;
            this.idVisita = resp._id;
          } else {
            this.yaVisitado = false;
            this.idVisita = null;
          }
        } else {
          this.yaVisitado = false;
          this.idVisita = null;
        }
      },
      error: err => {
        this.yaVisitado = false;
        this.idVisita = null;
      }
    });
  }

  volverACiudad() {
    this.modalCtrl.dismiss();
  }

  toggleMapa() {
    this.verMapa = !this.verMapa;
    if (this.verMapa && this.sitio && this.sitio.latitud && this.sitio.longitud) {
      setTimeout(() => this.initMap(), 0);
    }
  }

  initMap() {
    if (!this.sitio?.latitud || !this.sitio?.longitud || !this.mapContainer) return;

    if (this.map) {
      this.map.remove();
    }

    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoieHNlYmFzdHYiLCJhIjoiY21iOGRydGxwMGh1cjJqcHR1Z3E4eml4bCJ9._fz4Xmgls-0TIabepvFpJA',
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.sitio.longitud, this.sitio.latitud],
      zoom: 15
    });

    new mapboxgl.Marker()
      .setLngLat([this.sitio.longitud, this.sitio.latitud])
      .addTo(this.map);
  }
}