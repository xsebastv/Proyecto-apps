import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonInput, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Sitio } from 'src/app/interfaces/sitio.interface';

@Component({
  selector: 'app-sitios-view-admin',
  templateUrl: './sitios-view-admin.component.html',
  styleUrls: ['./sitios-view-admin.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonButton, IonInput, IonItem, IonLabel]
})
export class SitiosViewAdminComponent implements OnChanges {
  @Input() sitio: Partial<Sitio> = {};
  @Input() modo: 'ver' | 'editar' | 'crear' = 'ver';
  @Output() guardar = new EventEmitter<Partial<Sitio>>();
  @Output() cancelar = new EventEmitter<void>();

  sitioEditado: Partial<Sitio> = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sitio'] && this.sitio) {
      this.sitioEditado = { ...this.sitio };
    }
  }

  onGuardar() {
    // Validación mínima para evitar errores 400
    if (
      !this.sitioEditado.nombre ||
      !this.sitioEditado.pais ||
      !this.sitioEditado.longitud ||
      !this.sitioEditado.direccion ||
      !this.sitioEditado.tipo // Validar campo tipo
    ) {
      alert('Completa los campos obligatorios: nombre, país, dirección, longitud y tipo.');
      return;
    }
    this.guardar.emit(this.sitioEditado);
  }

  onCancelar() {
    this.cancelar.emit();
  }
}