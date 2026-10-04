import { Component } from '@angular/core';
import { CategoryMenuComponent } from '../category-menu/category-menu.component';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [CategoryMenuComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
