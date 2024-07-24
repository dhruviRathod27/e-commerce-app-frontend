import { Component, Inject } from '@angular/core';
import { IProduct } from '../../shared/interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ProductService } from '../product.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: IProduct[] =[]
  displayedColumns: string[]=['id','name','description','price','image','actions'];
  constructor(
    private productService: ProductService, private dialog: MatDialog
  ) {
  }
  ngOnInit(){
    this.productService.getProducts().subscribe(result => {
      if(result && result.data){
        this.products = result.data
        console.log(this.products)
      }
    });
  }
  openDialog(product?: IProduct): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '250px',
      data: product ? { ...product } : { name: '', description: '', price: 0 },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result._id) {
          this.productService.updateProduct(result).subscribe(result=>{
            if(result && result.data){
              Notify.success(result.message);
            }
          });
        } else {
          this.productService.addProduct(result).subscribe(result=>{
            if(result && result.data){
              Notify.success(result.message);
            }
          });
        }
      }
    });
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(result=>{
      window.location.reload();
      if(result && result.data){
        Notify.success(result.message);
      }
    });
  }

}
