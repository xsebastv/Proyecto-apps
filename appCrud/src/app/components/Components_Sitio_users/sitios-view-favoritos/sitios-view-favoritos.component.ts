import { Component, OnInit, Input } from '@angular/core';
import { SitiosService } from 'src/app/services/sitios.service';
import { PaisesService } from 'src/app/services/paises.service';
import { CiudadesBDService } from 'src/app/services/ciudades-bd.service';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { AuthService } from 'src/app/services/auth.service';
import { VisitasService } from 'src/app/services/visitas.service';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sitios-view-favoritos',
  templateUrl: './sitios-view-favoritos.component.html',
  styleUrls: ['./sitios-view-favoritos.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class SitiosViewFavoritosComponent implements OnInit {
  @Input() sitioId!: string;
  sitio: any;
  nombrePais: string = '';
  nombreCiudad: string = '';
  favoritos: string[] = [];
  yaVisitado: boolean = false;
  idVisita: string | null = null;

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

  cargarSitio() {
    this.sitiosService.getUnSitio(this.sitioId).subscribe((data: any) => {
      this.sitio = data;
      this.cargarNombrePaisYCiudad();
      this.verificarVisita();
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
      next: () => {
        alert('¡Visita registrada!');
        this.yaVisitado = true;
        this.verificarVisita();
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
        if (Array.isArray(resp) && resp.length > 0) {
          this.yaVisitado = true;
          this.idVisita = resp[0]._id;
        } else if (resp && resp._id) {
          this.yaVisitado = true;
          this.idVisita = resp._id;
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

  volverAFavoritos() {
    this.modalCtrl.dismiss({
      updateFavoritos: true
    });
  }
}