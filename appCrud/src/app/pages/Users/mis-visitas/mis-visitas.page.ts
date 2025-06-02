import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { VisitasService } from 'src/app/services/visitas.service';
import { MisVisitasListComponent } from 'src/app/components/Components_visitas_user/mis-visitas-list/mis-visitas-list.component';

@Component({
  selector: 'app-mis-visitas',
  templateUrl: './mis-visitas.page.html',
  styleUrls: ['./mis-visitas.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MisVisitasListComponent]
})
export class MisVisitasPage implements OnInit {
  visitas: any[] = [];
  titulo: string = 'Mis visitas';
  subtitulo: string = 'Sitios visitados';

  constructor(private visitasService: VisitasService) { }

  ngOnInit() {
    this.cargarVisitas();
  }

  cargarVisitas() {
    this.visitasService.obtenerVisitasUsuario().subscribe({
      next: (data: any) => {
        this.visitas = data;
      },
      error: (err) => {
        console.error('Error al cargar visitas:', err);
      }
    });
  }
}