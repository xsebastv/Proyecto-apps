import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButtons, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatosService } from 'src/app/services/platos.service';
import { PlatosListComponent } from 'src/app/components/Components_Plato_users/platos-list/platos-list.component';

@Component({
  selector: 'app-platos',
  templateUrl: './platos.pages.html',
  styleUrls: ['./platos.pages.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButtons, IonButton, IonIcon,
    CommonModule, FormsModule,
    PlatosListComponent
  ]
})
export class PlatosComponent implements OnInit {
  platos: any[] = [];
  paisId: string | null = null;
  titulo: string = 'Platos';
  subtitulo: string = 'Listado general';

  constructor(
    private platosService: PlatosService,
    private route: ActivatedRoute,
    private router: Router
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
        this.platos = Array.isArray(data) ? data : (data?.platos || []);
        this.subtitulo = 'Platos típicos del país';
      });
    } else {
      this.platosService.getPlatos().subscribe(data => {
        this.platos = Array.isArray(data) ? data : (data?.platos || []);
        this.subtitulo = 'Listado general';
      });
    }
  }

  regresarAlPais() {
    if (this.paisId) {
      this.router.navigate(['/tabs/paises'], { queryParams: { pais: this.paisId } });
    } else {
      this.router.navigate(['/tabs/paises']);
    }
  }
}