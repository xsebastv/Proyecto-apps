import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { VisitasService } from 'src/app/services/visitas.service';

@Component({
  selector: 'app-mis-visitas-view',
  templateUrl: './mis-visitas-view.component.html',
  styleUrls: ['./mis-visitas-view.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class MisVisitasViewComponent implements OnInit {
  @Input() visitaId!: string;
  visita: any;

  constructor(
    private visitasService: VisitasService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    if (this.visitaId) {
      this.visitasService.obtenerVisitaPorId(this.visitaId).subscribe({
        next: (data: any) => {
          this.visita = data;
        },
        error: (err) => {
          console.error('Error al cargar visita:', err);
        }
      });
    }
  }

  volverALista() {
    this.modalCtrl.dismiss();
  }
}