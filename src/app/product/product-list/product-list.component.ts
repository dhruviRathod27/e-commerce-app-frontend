import { Component, Inject } from '@angular/core';
import { IProduct } from '../../shared/interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ProductService } from '../product.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { AuthService } from '../../auth/auth.service';
import { Role } from '../../shared/roles.enum';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  roleName= '';
  ROLE=Role;
  products: IProduct[] = []
  displayedColumns: string[] = ['name', 'description', 'price', 'image', 'actions'];
  constructor(
    private productService: ProductService, private dialog: MatDialog,
    private authService : AuthService
  ) {
  }
  ngOnInit() {
    this.roleName = this.authService.userRole;
    this.productService.getProducts().subscribe({
      next: result => {
        if (result && result.data) {
          this.products = result.data
          console.log(this.products)
        }
      },
      error: error => Notify.failure(error.message)
    });
  }
  openDialog(product?: IProduct): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '500px',
      data: product ? { ...product } : { name: '', description: '', price: 0 },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result._id) {
          this.productService.updateProduct(result).subscribe({
            next: result => {
              if (result && result.data) {
                Notify.success(result.message);
                window.location.reload();
              }
            },
            error: error => Notify.failure(error.message)
          });
        } else {
          this.productService.addProduct(result).subscribe({
            next: result => {
              if (result && result.data) {
                Notify.success(result.message);
                window.location.reload();
              }
            },
            error: error => Notify.failure(error.message)
          });
        }
      }
    });
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe({
      next :result => {
      window.location.reload();
      if (result && result.data) {
        Notify.success(result.message);
      }
    },
    error: error=>Notify.failure(error.message)
  });
  }

}
