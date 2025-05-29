import { Component, Input, AfterViewInit, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Ciudad } from 'src/app/interfaces/ciudad.interface';
import mapboxgl from 'mapbox-gl';
import { CiudadesBDService } from 'src/app/services/ciudades-bd.service';

@Component({
  selector: 'app-ciudades-view',
  templateUrl: './ciudades-view.component.html',
  styleUrls: ['./ciudades-view.component.scss'],
  standalone: true,
  imports: [FormsModule, IonicModule, CommonModule],
})
export class CiudadesViewComponent implements AfterViewInit, OnChanges {
  @Input() ciudadId!: string;
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;
  ciudad?: Ciudad;
  map?: mapboxgl.Map;
  verMapa: boolean = false;

  constructor(private ciudadesService: CiudadesBDService) {}

  ngAfterViewInit() {
    if (this.ciudadId) {
      this.cargarCiudad();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ciudadId'] && changes['ciudadId'].currentValue) {
      this.cargarCiudad();
    }
  }

  cargarCiudad() {
    this.ciudadesService.getUnaCiudad(this.ciudadId).subscribe((data: any) => {
      console.log('Respuesta de la API ciudad:', data);
      this.ciudad = data.resp || data;
      // Si el mapa está desplegado, inicialízalo al cambiar de ciudad
      if (this.verMapa) {
        setTimeout(() => this.initMap(), 0);
      }
    }, error => {
      console.error('Error al obtener la ciudad:', error);
    });
  }

  toggleMapa() {
    this.verMapa = !this.verMapa;
    if (this.verMapa && this.ciudad && this.ciudad.latitud && this.ciudad.longitud) {
      setTimeout(() => this.initMap(), 0);
    }
  }
  formatPoblacion(poblacion: number): string {
    if (poblacion >= 1000000) {
      return (poblacion / 1000000).toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' millones';
    }
    return poblacion.toLocaleString('es-CO');
  }
  initMap() {
    if (!this.ciudad?.latitud || !this.ciudad?.longitud || !this.mapContainer) return;

    // Elimina el mapa anterior si existe
    if (this.map) {
      this.map.remove();
    }

    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoieHNlYmFzdHYiLCJhIjoiY21iOGRydGxwMGh1cjJqcHR1Z3E4eml4bCJ9._fz4Xmgls-0TIabepvFpJA',
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.ciudad.longitud, this.ciudad.latitud],
      zoom: 10
    });

    new mapboxgl.Marker()
      .setLngLat([this.ciudad.longitud, this.ciudad.latitud])
      .addTo(this.map);
  }
}