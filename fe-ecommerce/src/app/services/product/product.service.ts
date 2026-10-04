import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../../common/product';
import { environment } from '../../../environments/environment';
import { GetResponseProducts } from '../../common/get-response.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId : number | null): Observable<Product[]> {
    let params = new HttpParams();
    if (theCategoryId !== null) {
      params = params.set('categoryId', theCategoryId);
    }

    return this.httpClient.get<GetResponseProducts>(environment.productsURL, { params }).pipe(
      map(response => response.content)
    );
  }

  getProductListPaginate( page: number,
                          pageSize: number,
                          theCategoryId : number | null): Observable<GetResponseProducts>{

    let params = new HttpParams()
      .set('page', page)
      .set('size', pageSize);
    if (theCategoryId !== null) {
      params = params.set('categoryId', theCategoryId);
    }

    return this.httpClient.get<GetResponseProducts>(environment.productsURL, { params });
  }

  getProductSearchList(input : string | null): Observable<Product[]>{
    let params = new HttpParams().set('size', 100);
    if (input !== null) {
      params = params.set('name', input);
    }

    return this.httpClient.get<GetResponseProducts>(environment.productsURL, { params })
    .pipe(
      map(response => response.content)
    );
  }

  getProduct(id : string | null): Observable<Product>{
    const searchUrl = `${environment.productsURL}/${id}`;

    return this.httpClient.get<Product>(searchUrl);
  }

}

