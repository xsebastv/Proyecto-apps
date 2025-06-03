import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonList, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Sitio } from 'src/app/interfaces/sitio.interface';

@Component({
  selector: 'app-sitios-list-admin',
  templateUrl: './sitios-list-admin.component.html',
  styleUrls: ['./sitios-list-admin.component.scss'],
  standalone: true,
  imports: [CommonModule, IonList, IonItem, IonLabel, IonButton, IonIcon]
})
export class SitiosListAdminComponent {
  @Input() sitios: Sitio[] = [];
  @Output() verSitio = new EventEmitter<Sitio>();
  @Output() editarSitio = new EventEmitter<Sitio>();
  @Output() eliminarSitio = new EventEmitter<string>();

  onVer(sitio: Sitio) {
    this.verSitio.emit(sitio);
  }
  onEditar(sitio: Sitio) {
    this.editarSitio.emit(sitio);
  }
  onEliminar(id?: string) {
    if (id) this.eliminarSitio.emit(id);
  }
}