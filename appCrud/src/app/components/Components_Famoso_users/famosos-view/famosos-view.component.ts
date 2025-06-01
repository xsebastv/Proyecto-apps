import { Component, OnInit, Input } from '@angular/core';
import { FamososService } from 'src/app/services/famosos.service';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-famosos-view',
  templateUrl: './famosos-view.component.html',
  styleUrls: ['./famosos-view.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class FamososViewComponent implements OnInit {
  @Input() famosoId!: string;
  famoso: any;

  constructor(
    private famososService: FamososService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    if (this.famosoId) {
      this.cargarFamoso();
    }
  }

  cargarFamoso() {
    this.famososService.getUnFamoso(this.famosoId).subscribe((data: any) => {
      this.famoso = data.resp || data;
    });
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}