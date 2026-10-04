import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Product } from '../../common/product';
import { CartService } from '../../services/cart/cart.service';
import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let product: Product;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    product = new Product(1, 'sku-1', 'Test product', 'Description', 12.5, '', true, 5, new Date(), new Date());
    fixture.componentRef.setInput('productValue', product);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('adds the selected product to the cart when clicked', () => {
    const cartService = TestBed.inject(CartService);
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

    button.click();
    button.click();

    expect(cartService.items()).toEqual([{ product, quantity: 2 }]);
    expect(cartService.itemCount()).toBe(2);
    expect(cartService.totalAmount()).toBe(25);
  });
});
