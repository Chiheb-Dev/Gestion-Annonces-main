import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage {

  
  constructor(private router: Router) {}

  goToSignUp() {
    // Define the action for Sign Up button
    this.router.navigate(['/signup']);
  }

  goToSignIn() {
    // Define the action for Sign In button
    this.router.navigate(['/login']);
  }

}
