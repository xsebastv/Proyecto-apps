import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-mis-visitas-list',
  templateUrl: './mis-visitas-list.component.html',
  styleUrls: ['./mis-visitas-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class MisVisitasListComponent implements OnInit {
  @Input() visitas: any[] = [];
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  @Output() visitaEliminada = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  verSitio(sitioId: string) {
    // Aquí puedes abrir un modal o navegar a la vista del sitio si lo deseas
    // Ejemplo: this.modalCtrl.create({ ... });
    console.log('Ver sitio', sitioId);
  }
}