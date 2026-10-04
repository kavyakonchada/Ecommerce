import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem, CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  template: `
    <main class="cart-page">
      <header class="cart-heading">
        <div>
          <p class="eyebrow">YOUR ORDER</p>
          <h1>Shopping cart</h1>
        </div>
        <span class="item-count">{{cartService.itemCount()}} items</span>
      </header>

      @if (paymentCompleted()) {
        <p class="payment-success" role="status" aria-live="polite">
          Payment completed, order placed.
        </p>
      }

      @if (cartService.items().length > 0) {
        <div class="cart-table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col"><span class="visually-hidden">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              @for (item of cartService.items(); track item.product.id) {
                <tr>
                  <th scope="row">
                    <span class="product-name">{{item.product.name}}</span>
                    <span class="product-sku">{{item.product.sku}}</span>
                  </th>
                  <td>{{item.product.unitPrice | currency:'USD'}}</td>
                  <td>
                    <div class="quantity-control" [attr.aria-label]="'Quantity for ' + item.product.name">
                      <button type="button" (click)="changeQuantity(item, item.quantity - 1)" [attr.aria-label]="'Decrease ' + item.product.name + ' quantity'">−</button>
                      <span>{{item.quantity}}</span>
                      <button type="button" (click)="changeQuantity(item, item.quantity + 1)" [attr.aria-label]="'Increase ' + item.product.name + ' quantity'">+</button>
                    </div>
                  </td>
                  <td class="line-total">{{item.product.unitPrice * item.quantity | currency:'USD'}}</td>
                  <td><button type="button" class="remove-item" (click)="remove(item)" [attr.aria-label]="'Remove ' + item.product.name">Remove</button></td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <section class="order-summary" aria-label="Order summary">
          <div class="summary-row"><span>Items ({{cartService.itemCount()}})</span><span>{{cartService.totalAmount() | currency:'USD'}}</span></div>
          <div class="summary-row summary-total"><span>Total</span><strong>{{cartService.totalAmount() | currency:'USD'}}</strong></div>
          <button type="button" class="pay-button" (click)="completePayment()">Click to Pay</button>
        </section>
      } @else {
        <section class="empty-cart">
          <i class="bi bi-cart3" aria-hidden="true"></i>
          <h2>Your cart is empty</h2>
          <p>Add a few books and they’ll appear here.</p>
          <a routerLink="/products">Continue shopping</a>
        </section>
      }
    </main>
  `,
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {
  readonly cartService = inject(CartService);
  readonly paymentCompleted = signal(false);

  changeQuantity(item: CartItem, quantity: number): void {
    this.cartService.setQuantity(item.product.id, quantity);
  }

  remove(item: CartItem): void {
    this.cartService.remove(item.product.id);
  }

  completePayment(): void {
    if (this.cartService.items().length === 0) {
      return;
    }

    this.cartService.clear();
    this.paymentCompleted.set(true);
  }
}