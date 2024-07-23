import { Component, Inject } from '@angular/core';
import { IProduct } from '../../shared/interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: IProduct[] =[{
    "id":1,
    "name":"abc",
    "description":"abc",
    "imageUrl":"https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU",
    "price":34000
  }]
  displayedColumns: string[]=['id','name','description','price','image','actions'];
  constructor(
    private productService: ProductService, private dialog: MatDialog
  ) {
  }
  ngOnInit(){
    this.productService.getProducts().subscribe(products => {
      this.products = products
      console.log(this.products)
    });
  }
  openDialog(product?: IProduct): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '250px',
      data: product ? { ...product } : { name: '', description: '', price: 0 },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.productService.updateProduct(result);
        } else {
          this.productService.addProduct(result);
        }
      }
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id);
  }

}
