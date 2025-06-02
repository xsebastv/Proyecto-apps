import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FavoritosListComponent } from 'src/app/components/Components_Favoritos_user/favoritos-list/favoritos-list.component';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, FavoritosListComponent]
})
export class FavoritosPage implements OnInit {
  favoritos: any[] = [];
  titulo: string = 'Favoritos';
  subtitulo: string = 'Listado general';

  constructor(
    private favoritosService: FavoritosService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarFavoritos();
  }

  cargarFavoritos() {
    const userId = this.authService.getUserId();
    if (!userId) {
      console.warn('No hay usuario en sesión');
      return;
    }

    this.favoritosService.getFavoritos().subscribe(
      (data: any) => {
        console.log('Respuesta del backend:', data); // <-- Agrega esto
        if (data && data.favoritos) {
          this.favoritos = data.favoritos;
        } else {
          console.warn('No se encontraron favoritos para el usuario.');
          this.favoritos = [];
        }
      },
      error => {
        console.error('Error al cargar favoritos:', error);
      }
    );
      }
}