import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent implements OnInit {

  public product: Product | null = null;
  public errorMessage: string | null = null;
  public addedToCart = false;

  private readonly cartService = inject(CartService);

  constructor(private productService : ProductService,
              private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    this.handleProduct(productId);
  }

  handleProduct(id : string | null): void  {
    if (id === null) {
      this.errorMessage = 'Product not found.';
      return;
    }

    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: () => this.errorMessage = 'Unable to load this product.'
    });
  }

  addToCart(): void {
    if (this.product === null) {
      return;
    }

    this.cartService.add(this.product);
    this.addedToCart = true;
  }
}
