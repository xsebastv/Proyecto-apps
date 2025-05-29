import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Plato } from 'src/app/interfaces/plato.interface';
import { PlatosService } from 'src/app/services/platos.service';

@Component({
  selector: 'app-platos-view',
  templateUrl: './platos-view.component.html',
  styleUrls: ['./platos-view.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class PlatosViewComponent implements OnChanges {
  @Input() platoId!: string;
  plato?: Plato;

  constructor(private platosService: PlatosService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['platoId'] && changes['platoId'].currentValue) {
      this.cargarPlato();
    }
  }

  cargarPlato() {
    this.platosService.getUnPlato(this.platoId).subscribe((data: any) => {
      this.plato = data;
    }, error => {
      console.error('Error al obtener el plato:', error);
    });
  }
  getNombre(obj: any): string {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj.nombre || obj._id || '';
}
}
