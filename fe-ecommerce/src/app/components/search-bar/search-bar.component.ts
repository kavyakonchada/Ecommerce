import { Component, OnInit } from '@angular/core';
import { Form, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit{

  searchControl: FormControl = new FormControl('');;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(250)  // 1 second delay
    ).subscribe(input => {
      if (input) {
        this.getProductsBySeach(input);
      }
      else{
        this.router.navigateByUrl('/');
      }
    });
  }

  getProductsBySeach(input : string){
    console.log(`value=${input}`);
    this.router.navigateByUrl(`/search/${input}`);
    
  }

}
