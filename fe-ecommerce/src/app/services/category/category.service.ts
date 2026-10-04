import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../common/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getCategories() : Observable<Category[]>{
    const searchUrl = `${environment.categoriesURL}`;
    return this.httpClient.get<Category[]>(searchUrl);
  }
}
