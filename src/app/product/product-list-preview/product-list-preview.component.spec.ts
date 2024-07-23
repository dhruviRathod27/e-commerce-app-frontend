import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListPreviewComponent } from './product-list-preview.component';

describe('ProductListPreviewComponent', () => {
  let component: ProductListPreviewComponent;
  let fixture: ComponentFixture<ProductListPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
