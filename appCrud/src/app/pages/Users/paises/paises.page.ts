import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaisesService } from 'src/app/services/paises.service';
import { PaisesListComponent } from 'src/app/components/Components_Pais_users/paises-list/paises-list.component';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.page.html',
  styleUrls: ['./paises.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, PaisesListComponent]
})
export class PaisesPage implements OnInit {
  paises: any[] = [];
  paisesFiltrados: any[] = [];
  continentes: string[] = [];
  continenteSeleccionado: string = '';
  titulo: string = 'Países';
  subtitulo: string = 'Listado general';

  constructor(private paisesService: PaisesService) {}

  ngOnInit() {
    this.cargarPaises();
  }

  cargarPaises() {
    this.paisesService.getPaises().subscribe((data: any) => {
      this.paises = data || [];
      this.paisesFiltrados = this.paises;
      this.continentes = [...new Set(this.paises.map((p: any) => p.continente).filter(Boolean))];
    }, error => {
      console.error('Error al cargar países:', error);
    });
  }

  filtrarPorContinente() {
    if (this.continenteSeleccionado) {
      this.paisesFiltrados = this.paises.filter(
        p => p.continente === this.continenteSeleccionado
      );
    } else {
      this.paisesFiltrados = this.paises;
    }
  }
}