import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Auth, User } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: Auth,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const currentUser = this.authService.currentUser();

    if (currentUser) {
      return true;
    } else {
      const storedUser = localStorage.getItem('currentUser');

      if (storedUser) {
        const user: User = JSON.parse(storedUser);

        try {
          await this.auth.updateCurrentUser(user);
          return true;
        } catch (e) {
          console.error(e);
          this.showAlert('Token expired', 'Please login');
          this.authService.signout();
          this.router.navigateByUrl('/login', { replaceUrl: true });
          return false;
        }
      } else {
        this.showAlert('Token expired', 'Please login');
        this.router.navigateByUrl('/login', { replaceUrl: true });
        return false;
      }
    }
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Ok'],
    });
    await alert.present();
  }
}
