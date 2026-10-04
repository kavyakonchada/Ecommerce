import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../common/product';
import { CurrencyPipe, NgClass } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';
@Component({
  selector: 'product-list',
  standalone: true,
  imports: [CurrencyPipe, NgClass, ProductCardComponent],
  template:`
  <div class="row">
    @for (product of products; track $index) {
      <product-card class="col-md-3" [productValue]="product"/>
    }
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item"><button class="page-link" (click)="handlePaginate('prev')">Previous</button></li>
        @for (item of [].constructor(totalPage); track $index) {
          <li class="page-item" [ngClass]="{'active': pageNumber == $index}"><button class="page-link" (click)="handlePaginate($index)">{{$index + 1}}</button></li>
        }
        <li class="page-item"><button class="page-link" (click)="handlePaginate('next')">Next</button></li>
      </ul>
    </nav>
  </div>
  `,
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{

  products!:Product[];
  currentCategoryId!: number | null;

  pageNumber: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  totalPage : number = 1;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params  => {
        this.currentCategoryId = Number(params.get('id'));
        this.listProducts();
      }
    );
  }

  handlePaginate(page : any){
    if (page == 'prev' && this.pageNumber > 0) {
      this.pageNumber--;
      this.listProducts();
    }
    else if(page == 'next' && this.pageNumber < this.totalPage - 1){
      this.pageNumber++;
      this.listProducts();
    }
    else{
      this.pageNumber = page;
      this.listProducts();
    }
  }

  listProducts(){
    if (!this.route.snapshot.paramMap.has('id')) {
      this.currentCategoryId = 1;
    }
    if(this.route.snapshot.paramMap.has('keyword')){
      console.log('search...')
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }
    
  }

  handleListProducts(){
    this.productService.getProductListPaginate( this.pageNumber,
                                                this.pageSize,
                                                this.currentCategoryId)
                                                .subscribe(
                                                  response => {
                                                    this.products = response.content;
                                                    this.pageNumber = response.number;
                                                    this.pageSize = response.size;
                                                    this.totalElements = response.totalElements;
                                                    this.totalPage = response.totalPages;
                                                  })
  }

  handleSearchProducts(){
    const theKeyWord: string|null = this.route.snapshot.paramMap.get('keyword');
    
    this.productService.getProductSearchList(theKeyWord)
    .subscribe(
      products => this.products = products
    )
  }
}
