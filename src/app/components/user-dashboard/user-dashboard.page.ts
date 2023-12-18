import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage implements OnInit {
  activeUser: any;
  userId: string;
  allProducts: Product[] = [];
  selectedProducts: Product[] = [];
  selectedCategory: string = 'all';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    console.log("user dashboard launched");
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log('User ID:', this.userId);

    const currentUser = this.auth.currentUser();
    this.activeUser = currentUser;
    console.log(currentUser);

    this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    try {
      // Get all products
      this.allProducts = await this.productService.getAllProducts();

      // Filter products based on the selected category
      this.filterProducts();
    } catch (error) {
      console.error('Error loading products: ', error);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  }

  filterProducts(): void {
    if (this.selectedCategory === 'all') {
      // Show all products
      this.selectedProducts = this.allProducts;
    } else if (this.selectedCategory === 'user') {
      // Show user's products
      this.selectedProducts = this.allProducts.filter((product) => product.owner === this.activeUser.uid);
    } else if (this.selectedCategory === 'other') {
      // Show other users' products
      this.selectedProducts = this.allProducts.filter((product) => product.owner !== this.activeUser.uid);
    }
  }

  logout() {
    this.auth.signout();
    this.router.navigateByUrl('/login');
  }

  ToAddProduct() {
    console.log("ready to add product");
    this.router.navigate(['/user-dashboard/add-product']);
  }
}
