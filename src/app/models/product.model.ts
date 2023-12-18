export enum ProductCategory {
    Sell = 'sell',
    Rent = 'rent',
  }
  
  export interface Product {
    id?: string;
    title: string;
    category: string;
    price: number;
    owner: string; // User ID
    imageUrl?: string;
  }
  