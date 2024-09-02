import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];

  constructor(private AuthService: AuthService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    debugger
    this.AuthService.getCategories()
      .subscribe(response => {
        this.categories = response;
        console.log(this.categories)
      }, error => {
        console.error('There was an error fetching the categories!', error);
      });
  }

  editCategory(id: number): void {
    console.log(`Editing category with ID: ${id}`);
  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.AuthService.deleteCategory(id).subscribe(
        () => {
          console.log(`Deleted category with ID: ${id}`);
          this.getCategories();
        },
        (error) => {
          console.error('There was an error deleting the category!', error);
        }
      );
    }
  }
}