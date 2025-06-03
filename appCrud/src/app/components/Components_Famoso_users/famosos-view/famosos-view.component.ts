import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { FamosotagsService } from 'src/app/services/famosotags.service';
import { FamososService } from 'src/app/services/famosos.service';
import { FamosoTag } from 'src/app/interfaces/famoso-tag.interface';
import { FavoritosService } from 'src/app/services/favoritos.service';

@Component({
  selector: 'app-famosos-view',
  templateUrl: './famosos-view.component.html',
  styleUrls: ['./famosos-view.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class FamososViewComponent implements OnInit {
  @Input() famosoId!: string;
  famoso: any;
  tags: FamosoTag[] = [];
  nuevoComentario: string = '';
  rankingFavoritos: any[] = [];

  constructor(
    private famososService: FamososService,
    private famososTagsService: FamosotagsService,
    private favoritosService: FavoritosService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    if (this.famosoId) {
      this.cargarFamoso();
      this.cargarTags();
    }
    this.cargarRankingFavoritos();
  }

  ionViewWillEnter() {
    // Se ejecuta cada vez que entras al tab
    this.cargarRankingFavoritos();
  }

  cargarFamoso() {
    this.famososService.getUnFamoso(this.famosoId).subscribe((data: any) => {
      this.famoso = data.resp || data;
    });
  }

  cargarTags() {
    this.famososTagsService.getTagsDeFamoso(this.famosoId).subscribe((resp: any) => {
      const tags = resp.tags || resp;
      this.tags = tags.map((tag: FamosoTag) => ({
        ...tag,
        usuario: typeof tag.usuario === 'string' ? { nombre: tag.usuario } : tag.usuario
      }));
    });
  }

  agregarTag() {
    if (!this.nuevoComentario.trim()) return;
    this.famososTagsService.agregarTagAFamoso(this.famosoId, { comentario: this.nuevoComentario }).subscribe(() => {
      this.nuevoComentario = '';
      this.cargarTags();
    });
  }

  getNombreUsuario(usuario: string | { nombre: string }): string {
    if (!usuario) return 'Usuario';
    if (typeof usuario === 'string') return usuario;
    return usuario.nombre || 'Usuario';
  }

  cargarRankingFavoritos() {
    this.favoritosService.getTodosFavoritos().subscribe({
      next: (favoritos: any[]) => {
        // Mostrar en consola los favoritos tal como llegan
        console.log('Favoritos recibidos (raw):', favoritos);

        const conteo: { [id: string]: { nombre: string, count: number } } = {};
        favoritos.forEach(fav => {
          if (fav && fav._id && fav.nombre) {
            if (!conteo[fav._id]) {
              conteo[fav._id] = { nombre: fav.nombre, count: 1 };
            } else {
              conteo[fav._id].count++;
            }
          }
        });
        this.rankingFavoritos = Object.entries(conteo)
          .map(([sitioId, data]) => ({ sitioId, ...data }))
          .sort((a, b) => b.count - a.count)
          .reverse(); // Si quieres de mayor a menor, puedes quitar el .reverse()
        console.log('Ranking:', this.rankingFavoritos);
      },
      error: (err) => {
        console.error('Error al cargar ranking de favoritos', err);
      }
    });
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}