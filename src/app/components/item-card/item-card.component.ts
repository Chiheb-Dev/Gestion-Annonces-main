import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent {

  @Input() product: {
    title: string;
    category: string;
    price: number;
    image: string;
    owner: string; // Assuming owner is the user's UID
    // Add other fields as needed
  };
}

