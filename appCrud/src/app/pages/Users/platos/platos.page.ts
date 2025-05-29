import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { PlatosService } from 'src/app/services/platos.service';
import { PlatosListComponent } from 'src/app/components/Components_Plato_users/platos-list/platos-list.component';

@Component({
  selector: 'app-platos',
  templateUrl: './platos.page.html',
  styleUrls: ['./platos.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule,
    PlatosListComponent
  ]
})
export class PlatosPage implements OnInit {
  platos: any[] = [];
  paisId: string | null = null;
  titulo: string = 'Platos';
  subtitulo: string = 'Listado general';

  constructor(
    private platosService: PlatosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.paisId = params['pais'] || null;
      this.cargarPlatos();
    });
  }

  cargarPlatos() {
    if (this.paisId) {
      this.platosService.getPlatosPorPais(this.paisId).subscribe(data => {
        this.platos = data || [];
        this.subtitulo = 'Platos típicos del país';
      });
    } else {
      this.platosService.getPlatos().subscribe(data => {
        this.platos = data || [];
        this.subtitulo = 'Listado general';
      });
    }
  }
}