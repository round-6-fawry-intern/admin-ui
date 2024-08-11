import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  CouponesRoutingModule } from './coupones-routing.module';
import { CouponComponent } from './coupon/coupon.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, CouponesRoutingModule,CouponComponent],
  exports: [CouponComponent],
  providers: [],
})
export class CouponesModule
 {}
