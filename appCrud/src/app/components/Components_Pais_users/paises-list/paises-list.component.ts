import { Component, Input, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonList, IonItem, IonLabel, IonListHeader, IonContent, IonHeader,
  IonModal as StandaloneIonModal, IonTitle, IonToolbar, IonCard, IonCardContent,
  IonInfiniteScroll, IonInfiniteScrollContent, IonButtons, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { IonModal } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Pais } from 'src/app/interfaces/pais.interface';
import { PaisesViewComponent } from '../paises-view/paises-view.component';

@Component({
  selector: 'app-paises-list',
  templateUrl: './paises-list.component.html',
  styleUrls: ['./paises-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonList, IonItem, IonLabel, IonListHeader, IonContent, IonHeader,
    StandaloneIonModal, IonTitle, IonToolbar, IonCard,
    IonInfiniteScroll, IonInfiniteScrollContent, IonButtons, IonButton,
    IonIcon,
    PaisesViewComponent
  ]
})
export class PaisesListComponent implements OnInit, OnChanges {
  @Input() paises: Pais[] = [];
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';

  @ViewChild(IonModal) modal!: IonModal;

  paisIdSeleccionado: string | null = null;
  isModalOpen = false;

  paisesMostrados: Pais[] = [];
  pageSize: number = 10;
  currentPage: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

ngOnInit() {
  this.resetInfiniteScroll();
  this.route.queryParams.subscribe(params => {
    const paisId = params['pais'];
    if (paisId) {
      // Fuerza el cierre y reapertura del modal para asegurar que siempre se muestre
      if (this.isModalOpen) {
        this.setOpen(false);
        setTimeout(() => {
          this.verPais(paisId);
        }, 0);
      } else {
        this.verPais(paisId);
      }
    } else {
      // Si no hay paisId en query, cierra el modal si está abierto
      if (this.isModalOpen) {
        this.setOpen(false);
        this.paisIdSeleccionado = null;
      }
    }
  });
}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['paises']) {
      this.resetInfiniteScroll();
    }
  }

  resetInfiniteScroll() {
    this.currentPage = 0;
    this.paisesMostrados = this.paises.slice(0, this.pageSize);
  }

  loadData(event: any) {
    this.currentPage++;
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    const nuevosPaises = this.paises.slice(start, end);
    this.paisesMostrados = [...this.paisesMostrados, ...nuevosPaises];

    setTimeout(() => {
      event.target.complete();
      if (this.paisesMostrados.length >= this.paises.length) {
        event.target.disabled = true;
      }
    }, 500);
  }

  verPais(id: string) {
    this.paisIdSeleccionado = id;
    this.setOpen(true);
    // Actualiza el query param 'pais' al abrir el modal
    this.router.navigate([], {
      queryParams: { pais: id },
      queryParamsHandling: 'merge'
    });
  }

  cancel() {
    this.setOpen(false);
    // Limpia el query param 'pais' al cerrar el modal
    this.router.navigate([], {
      queryParams: { pais: null },
      queryParamsHandling: 'merge'
    });
    this.paisIdSeleccionado = null;
  }

  onWillDismiss(event: any) {
    this.paisIdSeleccionado = null;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}