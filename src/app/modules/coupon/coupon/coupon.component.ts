import { Component, ViewChild } from '@angular/core';
import { CouponsService } from '../../../services/coupons.service';
import { Coupon } from '../../../../types';
import { CouponItemComponent } from '../../../components/coupon-item/coupon-item.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { CouponEditPopupComponent } from '../../../components/coupon-edit-popup/coupon-edit-popup.component'; 
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-coupon',
  standalone: true,
  imports: [
    CouponItemComponent,
    CommonModule,
    PaginatorModule,
    CouponEditPopupComponent,
    ButtonModule,
  ],
  templateUrl: './coupon.component.html',
  styleUrl: './coupon.component.scss',
})
export class CouponComponent {
  constructor(private couponService: CouponsService) {}

  @ViewChild('paginator') paginator: Paginator | undefined;

  coupons: Coupon[] = [];

  totalRecords: number = 0;
  rows: number = 12;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  toggleEditPopup(coupon: Coupon) {
    this.selectedCoupon = coupon;
    console.log(this.selectedCoupon);
    this.displayEditPopup = true;
  }

  toggleDeletePopup(coupon: Coupon) {
    if (!coupon.id) {
      return;
    }

    this.deleteProduct(coupon.id);
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  selectedCoupon: Coupon = {
    id: 0,
    value:0,
    numberOfUses: 0,
    code:'',
    fixed: true,
    expirationDate: '2024-12-31',
  };

  onConfirmEdit(coupon: Coupon) {
    if (!this.selectedCoupon.id) {
      return;
    }

    this.editCoupon(coupon, this.selectedCoupon.id);

    console.log(this.selectedCoupon);
    this.displayEditPopup = false;
  }

  onConfirmAdd(coupon: Coupon) {
    this.addCoupon(coupon);
    this.displayAddPopup = false;
  }

  onProductOutput(coupon: Coupon) {
    console.log(coupon, 'Output');
  }

  onPageChange(event: any) {
    this.fetchCoupons();
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }


  editCoupon(coupon: Coupon, id: number) {
    this.couponService
      .editCoupon(`http://localhost:8080/coupons/update/${id}`, coupon)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchCoupons();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteProduct(id: number) {
    this.couponService
      .deleteCoupon(`http://localhost:8080/coupons/delete/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchCoupons();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addCoupon(coupon: Coupon) {
    this.couponService
      .addCoupon(`http://localhost:8080/coupons/create`, coupon)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchCoupons();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit() {
    this.fetchCoupons();
  }

  fetchCoupons() {
    this.couponService
      .getCoupons('http://localhost:8080/coupons/all')
      .subscribe({
        next: (data: Coupon[]) => {
          console.log(data);
          this.coupons = data;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
