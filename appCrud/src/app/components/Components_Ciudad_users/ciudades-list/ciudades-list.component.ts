import { Component, Input, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonList,
  IonItem,
  IonLabel,
  IonListHeader,
  IonContent,
  IonHeader,
  IonModal as StandaloneIonModal,
  IonTitle,
  IonToolbar,
  IonCard,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonButtons,
  IonButton,
  IonIcon // <-- IMPORTA IonIcon
} from '@ionic/angular/standalone';
import { IonModal } from '@ionic/angular';
import { Ciudad } from 'src/app/interfaces/ciudad.interface';
import { CiudadesViewComponent } from '../ciudades-view/ciudades-view.component';

@Component({
  selector: 'app-ciudades-list',
  templateUrl: './ciudades-list.component.html',
  styleUrls: ['./ciudades-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonList,
    IonItem,
    IonLabel,
    IonListHeader,
    IonContent,
    IonHeader,
    StandaloneIonModal,
    IonTitle,
    IonToolbar,
    IonCard,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonButtons,
    IonButton,
    IonIcon, // <-- AGREGA IonIcon AQUÍ
    CiudadesViewComponent
  ]
})
export class CiudadesListComponent implements OnInit, OnChanges {
  @Input() ciudades: Ciudad[] = [];
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';

  @ViewChild(IonModal) modal!: IonModal;

  ciudadIdSeleccionada: string | null = null;
  isModalOpen = false;

  // Infinite Scroll
  ciudadesMostradas: Ciudad[] = [];
  pageSize: number = 10;
  currentPage: number = 0;

  ngOnInit() {
    this.resetInfiniteScroll();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ciudades']) {
      this.resetInfiniteScroll();
    }
  }

  resetInfiniteScroll() {
    this.currentPage = 0;
    this.ciudadesMostradas = this.ciudades.slice(0, this.pageSize);
  }

  loadData(event: any) {
    this.currentPage++;
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    const nuevasCiudades = this.ciudades.slice(start, end);
    this.ciudadesMostradas = [...this.ciudadesMostradas, ...nuevasCiudades];

    setTimeout(() => {
      event.target.complete();
      if (this.ciudadesMostradas.length >= this.ciudades.length) {
        event.target.disabled = true;
      }
    }, 500);
  }

  verCiudad(id: string) {
    this.ciudadIdSeleccionada = id;
    this.setOpen(true);
  }

  cancel() {
    this.setOpen(false);
  }

  onWillDismiss(event: any) {
    this.ciudadIdSeleccionada = null;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}