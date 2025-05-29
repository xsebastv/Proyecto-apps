import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-mis-visitas',
  templateUrl: './mis-visitas.page.html',
  styleUrls: ['./mis-visitas.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MisVisitasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
