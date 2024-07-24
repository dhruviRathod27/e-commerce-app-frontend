import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../shared/interface';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css'],
})
export class ProductDialogComponent {
  productForm: FormGroup;
  formattedAmount:any;
  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProduct,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      _id: [data._id],
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      imageUrl: [data.imageUrl, Validators.required],
      price: [data.price, [Validators.required, Validators.min(0)]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }
  
}
