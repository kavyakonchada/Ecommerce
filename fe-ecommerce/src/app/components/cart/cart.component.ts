import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  template: `
    <div class="cart-area" aria-live="polite">
      <a routerLink="/cart" class="cart-link" [attr.aria-label]="'Cart, ' + cartService.itemCount() + ' items'" title="View cart">
        <div class="total">{{cartService.totalAmount() | currency:'USD'}}</div>
        <span class="cart-icon-wrap">
          <i class="bi bi-cart3" aria-hidden="true"></i>
          <span class="cart-count">{{cartService.itemCount()}}</span>
        </span>
      </a>
    </div>
  `,
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  readonly cartService = inject(CartService);
}
