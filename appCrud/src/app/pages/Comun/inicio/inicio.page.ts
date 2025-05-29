import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, PopoverController } from '@ionic/angular';
import { UserPopoverComponent } from 'src/app/components/user-popover/user-popover.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class Tab1Page implements OnInit { // <-- Cambiado aquí
  isLoggedIn: boolean = false;
  userName: string = '';
  userImage: string = '';
  defaultImage: string = 'https://www.w3schools.com/howto/img_avatar.png';

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private popoverController: PopoverController,
    private authService: AuthService 
  ) {}

  ngOnInit() {
    this.checkLoginStatus();
  }

  ionViewWillEnter() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.name) {
      this.isLoggedIn = true;
      this.userName = user.name;
      this.userImage = (user.image && user.image !== 'Sin Imagen') ? user.image : this.defaultImage;
    } else {
      this.isLoggedIn = false;
      this.userName = '';
      this.userImage = '';
    }
    this.cd.detectChanges();
  }

  goToLogin() {
    this.router.navigate(['/login']).then(() => {
      this.checkLoginStatus();
    });
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.checkLoginStatus();
    window.location.reload();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: UserPopoverComponent,
      event: ev,
      translucent: true,
      showBackdrop: true,
      cssClass: 'user-popover-small'
    });

    popover.onDidDismiss().then((result) => {
      if (result.data === 'logout') {
        this.logout();
      }
    });

    await popover.present();
  }
}