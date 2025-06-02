import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { SitiosViewFavoritosComponent } from 'src/app/components/Components_Sitio_users/sitios-view-favoritos/sitios-view-favoritos.component';

@Component({
  selector: 'app-favoritos-list',
  templateUrl: './favoritos-list.component.html',
  styleUrls: ['./favoritos-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class FavoritosListComponent implements OnInit {
  @Input() favoritos: any[] = [];
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  @Output() favoritoEliminado = new EventEmitter<any>();

  cargando: boolean = false;

  constructor(
    private favoritosService: FavoritosService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {}

  eliminarFavorito(favoritoId: string) {
    this.cargando = true;
    this.favoritosService.quitarFavorito(favoritoId).subscribe({
      next: () => {
        this.favoritoEliminado.emit();
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al eliminar favorito:', err);
        this.cargando = false;
      }
    });
  }

  async verFavorito(favoritoId: string) {
    const modal = await this.modalCtrl.create({
      component: SitiosViewFavoritosComponent,
      componentProps: { sitioId: favoritoId }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data?.updateFavoritos) {
        this.cargarFavoritos(); // Recarga la lista de favoritos al cerrar el modal
      }
    });

    await modal.present();
  }

  esFavorito(id: string): boolean {
    return this.favoritos.some(fav => fav._id === id);
  }

  toggleFavorito(favorito: any) {
    if (this.esFavorito(favorito._id)) {
      this.favoritosService.quitarFavorito(favorito._id).subscribe({
        next: () => {
          this.favoritos = this.favoritos.filter(fav => fav._id !== favorito._id);
        },
        error: (err) => {
          console.error('Error al quitar favorito:', err);
        }
      });
    } else {
      this.favoritosService.agregarFavorito(favorito._id).subscribe({
        next: () => {
          this.favoritos.push(favorito);
        },
        error: (err) => {
          console.error('Error al agregar favorito:', err);
        }
      });
    }
  }

  cargarFavoritos() {
    this.favoritosService.getFavoritos().subscribe({
      next: (data: any) => {
        this.favoritos = data;
      },
      error: (err) => {
        console.error('Error al cargar favoritos:', err);
      }
    });
  }
}