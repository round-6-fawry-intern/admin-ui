import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponEditPopupComponent } from './coupon-edit-popup.component';

describe('EditPopupComponent', () => {
  let component: CouponEditPopupComponent;
  let fixture: ComponentFixture<CouponEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponEditPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CouponEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
