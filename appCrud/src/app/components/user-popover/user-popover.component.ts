import { Component } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-user-popover',
  standalone: true,
  templateUrl: './user-popover.component.html',
  styleUrls: ['./user-popover.component.scss'],
  imports: [IonicModule]
})
export class UserPopoverComponent {
  constructor(private popoverCtrl: PopoverController) {}

  logout() {
    this.popoverCtrl.dismiss('logout');
  }
}