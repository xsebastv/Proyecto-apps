import { Component, OnInit, Input } from '@angular/core';
import { FamososService } from 'src/app/services/famosos.service';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FamosoTag } from 'src/app/interfaces/famoso-tag.interface';
import { FormsModule } from '@angular/forms';

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

  constructor(
    private famososService: FamososService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    if (this.famosoId) {
      this.cargarFamoso();
      this.cargarTags();
    }
  }

  cargarFamoso() {
    this.famososService.getUnFamoso(this.famosoId).subscribe((data: any) => {
      this.famoso = data.resp || data;
    });
  }

  cargarTags() {
    this.famososService.getTagsDeFamoso(this.famosoId).subscribe((tags: FamosoTag[]) => {
      // Normaliza para que usuario siempre sea un objeto con nombre
      this.tags = tags.map(tag => ({
        ...tag,
        usuario: typeof tag.usuario === 'string' ? { nombre: tag.usuario } : tag.usuario
      }));
    });
  }

  agregarTag() {
    if (!this.nuevoComentario.trim()) return;
    this.famososService.agregarTagAFamoso(this.famosoId, { comentario: this.nuevoComentario }).subscribe(() => {
      this.nuevoComentario = '';
      this.cargarTags();
    });
  }
  getNombreUsuario(usuario: string | { nombre: string }): string {
    if (!usuario) return 'Usuario';
    if (typeof usuario === 'string') return usuario;
    return usuario.nombre || 'Usuario';
  }
  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}