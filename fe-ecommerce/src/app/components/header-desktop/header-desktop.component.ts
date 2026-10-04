import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'header-desktop',
  standalone: true,
  imports: [SearchBarComponent, CartComponent],
  template: `
      <header class="header-desktop">
        <div class="section-content section-content-p30">
            <div class="container-fluid">
                <div class="header-wrap">
                  <search-bar/>
                  <cart/>
                </div>
                <div class="account-wrap"></div>
            </div>
        </div>
    </header>
  `,
  // templateUrl: './header-desktop.component.html',
  styleUrl: './header-desktop.component.scss'
})
export class HeaderDesktopComponent {

}
