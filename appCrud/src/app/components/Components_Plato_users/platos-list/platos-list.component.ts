import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PlatosService } from 'src/app/services/platos.service';
import { IonicModule } from '@ionic/angular';
import { PlatosViewComponent } from '../platos-view/platos-view.component';

@Component({
  selector: 'app-platos-list',
  templateUrl: './platos-list.component.html',
  styleUrls: ['./platos-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonicModule,
    PlatosViewComponent
  ]
})
export class PlatosListComponent implements OnInit {
  platosMostrados: any[] = [];
  paisId: string = '';
  titulo = 'Platos típicos';
  subtitulo = '';
  isModalOpen = false;
  platoIdSeleccionado: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private platosService: PlatosService
  ) {}

  ngOnInit() {
    this.paisId = this.route.snapshot.queryParamMap.get('pais') || '';
    if (this.paisId) {
      this.platosService.getPlatosPorPais(this.paisId).subscribe((data: any) => {
        this.platosMostrados = Array.isArray(data) ? data : data.platos || [];
      });
    }
  }

  verPlato(platoId: string) {
    this.platoIdSeleccionado = platoId;
    this.isModalOpen = true;
  }

  cancel() {
    this.isModalOpen = false;
    this.platoIdSeleccionado = null;
  }

  onWillDismiss(event: any) {
    this.isModalOpen = false;
    this.platoIdSeleccionado = null;
  }

  getNombre(obj: any): string {
    // Si obj es un string, lo retorna, si es un objeto, retorna el nombre
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj.nombre || '';
  }

  loadData(event: any) {
    // Si tienes paginación, implementa aquí la lógica para cargar más platos
    event.target.complete();
  }
}