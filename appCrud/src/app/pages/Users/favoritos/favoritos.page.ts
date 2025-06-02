import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { FavoritosListComponent } from 'src/app/components/Components_Favoritos_user/favoritos-list/favoritos-list.component';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FavoritosListComponent]
})
export class FavoritosPage implements OnInit {
  favoritos: any[] = [];
  titulo: string = 'Favoritos';
  subtitulo: string = 'Listado general';

  constructor(private favoritosService: FavoritosService) {}

  ngOnInit() {
    this.cargarFavoritos();
  }

  ionViewWillEnter() {
    this.cargarFavoritos(); // Recarga los favoritos cada vez que la vista se activa
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