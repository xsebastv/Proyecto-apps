import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-gestion-sitios',
  templateUrl: './gestion-sitios.page.html',
  styleUrls: ['./gestion-sitios.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GestionSitiosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
