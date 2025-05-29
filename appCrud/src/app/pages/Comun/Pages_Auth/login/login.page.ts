import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
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
export class LoginPage {
  correo: string = '';
  password: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  login() {
    if (!this.correo || !this.password) {
      this.presentToast('Por favor, completa todos los campos');
      return;
    }

    const loginData = { correo: this.correo, password: this.password };
    console.log('Datos enviados al backend:', loginData);

    this.auth.login(this.correo, this.password).subscribe({
      next: (res: any) => {
        if (res && res.ok && res.token && res.usuario && res.usuario.nombre) {
          this.auth.setToken(res.token);
          this.auth.setUserName(res.usuario.nombre);
          this.auth.setUserImg(
            res.usuario.img ||
            'https://images-ext-1.discordapp.net/external/8PKEw82fwWr9hL98_twl4z1E6x-cAXkn1MwA3SdlNjQ/https/www.shutterstock.com/image-illustration/blank-whatsapp-profile-photo-cute-260nw-2273582947.jpg?format=webp'
          );
          // Guarda el rol del usuario en localStorage
          if (res.usuario.rol) {
            this.auth.setUserRole(res.usuario.rol);
          }
          // Guarda el usuario como objeto para tab1
          localStorage.setItem('user', JSON.stringify({
            name: res.usuario.nombre,
            image: res.usuario.img ||
              'https://images-ext-1.discordapp.net/external/8PKEw82fwWr9hL98_twl4z1E6x-cAXkn1MwA3SdlNjQ/https/www.shutterstock.com/image-illustration/blank-whatsapp-profile-photo-cute-260nw-2273582947.jpg?format=webp'
          }));
          this.presentToast('Inicio de sesión exitoso');
          // Fuerza recarga para que los tabs detecten el cambio de rol
          window.location.href = '/tabs/tab1';
        } else {
          this.presentToast('Respuesta inesperada del servidor');
          console.error('Estructura de respuesta inesperada:', res);
        }
      },
      error: (err: any) => {
        const errorMessage = err.error?.message || 'Error al iniciar sesión. Verifica tus credenciales';
        this.presentToast(errorMessage);
        console.error('Error del backend:', err.error || err.message || err);
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']); // Redirige a la página de registro
  }

  goToHome() {
    this.router.navigate(['/tabs/tab1']); // Redirige a la página principal
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }
}