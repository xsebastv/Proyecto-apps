import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton, 
  IonButtons, 
  IonIcon 
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonButtons,
    IonIcon
  ]
})
export class RegisterPage {
  nombre: string = '';
  correo: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private router: Router,
    private toastController: ToastController,
    private authService: AuthService
  ) {}

  register() {
    if (!this.nombre || !this.correo || !this.password || !this.confirmPassword) {
      this.presentToast('Por favor, completa todos los campos');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.presentToast('Las contraseñas no coinciden');
      return;
    }

    const usuario = {
      nombre: this.nombre,
      correo: this.correo,
      password: this.password,
      img: 'Sin Imagen',
      rol: 'USER_ROLE' // <-- Agrega este campo
    };

    this.authService.register(usuario).subscribe({
      next: (res: any) => {
        if (res && res.usuario && res.usuario.rol) {
          this.authService.setUserRole(res.usuario.rol); // Guarda el rol en localStorage
        }
        this.presentToast('Registro exitoso', 'success');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.presentToast(err?.error?.msg || 'Error al registrar');
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async presentToast(mensaje: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
      color
    });
    await toast.present();
  }
}