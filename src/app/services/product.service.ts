import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../models/product.model';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private firestore: AngularFirestore, private auth: Auth) {}

  addProduct(product: Product): Promise<void> {
    return this.firestore
      .collection('products')
      .add(product)
      .then((docRef) => {
        console.log('Product added with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding product: ', error);
      });
  }


  async getUserProducts(): Promise<Product[]> {
    try {
      const currentUserUid = this.auth.currentUser.uid;
      const snapshot = await this.firestore
        .collection<Product>('products', (ref) => ref.where('userId', '==', currentUserUid))
        .get()
        .toPromise();

      return snapshot.docs.map((doc) => doc.data() as Product);
    } catch (error) {
      console.error('Error getting user products: ', error);
      throw error;
    }
  }

  async getOtherUsersProducts(): Promise<Product[]> {
    try {
      const currentUserUid = this.auth.currentUser.uid;
      const snapshot = await this.firestore
        .collection<Product>('products', (ref) => ref.where('userId', '!=', currentUserUid))
        .get()
        .toPromise();

      return snapshot.docs.map((doc) => doc.data() as Product);
    } catch (error) {
      console.error('Error getting other users products: ', error);
      throw error;
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const snapshot = await this.firestore.collection<Product>('products').get().toPromise();

      return snapshot.docs.map((doc) => doc.data() as Product);
    } catch (error) {
      console.error('Error getting all products: ', error);
      throw error;
    }
  }
}
