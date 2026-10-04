import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {CategoryService} from '../../services/category/category.service'
import { Category } from '../../common/category';

@Component({
  selector: 'category-menu-list',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './category-menu.component.html',
  styleUrl: './category-menu.component.scss'
})
export class CategoryMenuComponent implements OnInit{

  categories!: Category[];

  constructor(private categoryService :  CategoryService) { }

  ngOnInit()  {
    this.listCategories();
  }

  listCategories() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
      }
    );
  }
}
