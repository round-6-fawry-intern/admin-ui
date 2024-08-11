import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouponComponent } from './coupon/coupon.component';

const routes: Routes = [
  // Home route
  {
    path: '',
    component: CouponComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponesRoutingModule {}
