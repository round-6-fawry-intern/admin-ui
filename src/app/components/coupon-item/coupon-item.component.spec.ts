import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponItemComponent } from './coupon-item.component';

describe('CouponComponent', () => {
  let component: CouponItemComponent;
  let fixture: ComponentFixture<CouponItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CouponItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
