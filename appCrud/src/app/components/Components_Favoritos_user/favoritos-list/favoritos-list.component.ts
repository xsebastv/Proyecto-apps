import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-favoritos-list',
  templateUrl: './favoritos-list.component.html',
  styleUrls: ['./favoritos-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class FavoritosListComponent implements OnInit {
  @Input() favoritos: any[] = [];
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  @Output() favoritoEliminado = new EventEmitter<any>();

  cargando: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}