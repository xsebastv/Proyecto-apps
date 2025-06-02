import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { MisVisitasViewComponent } from '../mis-visitas-view/mis-visitas-view.component';

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

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async verSitio(visitaId: string) {
    const modal = await this.modalCtrl.create({
      component: MisVisitasViewComponent,
      componentProps: { visitaId }
    });
    await modal.present();
  }
}