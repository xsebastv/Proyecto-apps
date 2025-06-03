import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonList, IonItem, IonLabel, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { SitiosService } from 'src/app/services/sitios.service';
import { FamososService } from 'src/app/services/famosos.service';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { FamosotagsService } from 'src/app/services/famosotags.service';
import { VisitasService } from 'src/app/services/visitas.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonCard, IonCardHeader, IonCardTitle, IonList, IonItem, IonLabel,
    IonIcon, IonSpinner,
    CommonModule, FormsModule
  ]
})
export class EstadisticasPage implements OnInit {
  topSitios: any[] = [];
  topFamosos: any[] = [];
  topFavoritos: any[] = [];
  loading = true;

  constructor(
    private sitiosService: SitiosService,
    private famososService: FamososService,
    private favoritosService: FavoritosService,
    private famososTagsService: FamosotagsService,
    private visitasService: VisitasService
  ) {}

  ngOnInit() {
    this.cargarEstadisticas();
  }

  // Función auxiliar para extraer arrays de diferentes respuestas
  private extraerArray(obj: any): any[] {
    if (Array.isArray(obj)) return obj;
    if (obj && typeof obj === 'object') {
      if ('resp' in obj && Array.isArray(obj.resp)) return obj.resp;
      if ('data' in obj && Array.isArray(obj.data)) return obj.data;
      if ('favoritos' in obj && Array.isArray(obj.favoritos)) return obj.favoritos;
    }
    return [];
  }

  cargarEstadisticas(): void {
    this.loading = true;
    forkJoin({
      sitios: this.sitiosService.getSitios(),
      famosos: this.famososService.getFamosos(),
      favoritos: this.favoritosService.getFavoritos(),
      famososTags: this.famososTagsService.getFamosotags(),
      visitas: this.visitasService.getVisitas()
    }).subscribe({
      next: ({ sitios, famosos, favoritos, famososTags, visitas }) => {
        // Asegura que visitas y famososTags sean arrays
        const visitasArray = this.extraerArray(visitas);
        const famososTagsArray = this.extraerArray(famososTags);

        // Top 10 sitios con más visitas (contando visitas en la colección)
        const visitasPorSitio: { [sitioId: string]: number } = {};
        visitasArray.forEach((v: any) => {
          const sitioId = v.sitio?._id || v.sitio;
          if (sitioId) {
            visitasPorSitio[sitioId] = (visitasPorSitio[sitioId] || 0) + 1;
          }
        });
        this.topSitios = (sitios || [])
          .map((s: any) => ({
            ...s,
            visitas: visitasPorSitio[s._id] || 0
          }))
          .sort((a: any, b: any) => b.visitas - a.visitas)
          .slice(0, 10);

        // Top 10 famosos con más tags (contando en la colección famososTags)
        const tagsPorFamoso: { [famosoId: string]: number } = {};
        famososTagsArray.forEach((tag: any) => {
          const famosoId = tag.famoso?._id || tag.famoso;
          if (famosoId) {
            tagsPorFamoso[famosoId] = (tagsPorFamoso[famosoId] || 0) + 1;
          }
        });
        this.topFamosos = (famosos || [])
          .map((f: any) => ({
            ...f,
            totalTags: tagsPorFamoso[f._id] || 0
          }))
          .sort((a: any, b: any) => b.totalTags - a.totalTags)
          .slice(0, 10);

        // Sitios con más favoritos (contando favoritos en la colección de usuarios)
        const favoritosPorSitio: { [sitioId: string]: number } = {};
        this.extraerArray(favoritos).forEach((fav: any) => {
          // Si el favorito es un array de sitios, recorre cada uno
          if (Array.isArray(fav.favoritos)) {
            fav.favoritos.forEach((sitio: any) => {
              const sitioId = sitio._id || sitio;
              if (sitioId) {
                favoritosPorSitio[sitioId] = (favoritosPorSitio[sitioId] || 0) + 1;
              }
            });
          } else {
            // Si es un solo sitio
            const sitioId = fav.sitio?._id || fav.sitio;
            if (sitioId) {
              favoritosPorSitio[sitioId] = (favoritosPorSitio[sitioId] || 0) + 1;
            }
          }
        });
        this.topFavoritos = (sitios || [])
          .map((sitio: any) => ({
            ...sitio,
            favoritos: favoritosPorSitio[sitio._id] || 0
          }))
          .sort((a: any, b: any) => b.favoritos - a.favoritos)
          .slice(0, 10);

        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener datos de la API en estadísticas:', err);
        this.loading = false;
      }
    });
  }
}