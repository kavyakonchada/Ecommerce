import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../../common/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly cartItems = signal<CartItem[]>([]);

  readonly items = this.cartItems.asReadonly();
  readonly itemCount = computed(() =>
    this.cartItems().reduce((count, item) => count + item.quantity, 0)
  );
  readonly totalAmount = computed(() =>
    this.cartItems().reduce((total, item) => total + item.product.unitPrice * item.quantity, 0)
  );

  add(product: Product): void {
    this.cartItems.update(items => {
      const existingItem = items.find(item => item.product.id === product.id);

      if (existingItem) {
        return items.map(item => item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item);
      }

      return [...items, { product, quantity: 1 }];
    });
  }

  setQuantity(productId: number, quantity: number): void {
    if (quantity < 1) {
      this.remove(productId);
      return;
    }

    this.cartItems.update(items => items.map(item => item.product.id === productId
      ? { ...item, quantity }
      : item));
  }

  remove(productId: number): void {
    this.cartItems.update(items => items.filter(item => item.product.id !== productId));
  }

  clear(): void {
    this.cartItems.set([]);
  }
}