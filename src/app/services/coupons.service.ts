import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import {  Coupon } from '../../types';

@Injectable({
  providedIn: 'root',
})

export class CouponsService {
  constructor(private apiService: ApiService) {}

  // Getting products from the API
  getCoupons = (url: string): Observable<Coupon[]> => {
    return this.apiService.get(url, {
      responseType: 'json',
    });
  };

  // Adding a product via the API
  addCoupon = (url: string, body: any): Observable<any> => {
    return this.apiService.post(url, body, {});
  };

  // Editing a product via the API
  editCoupon = (url: string, body: any): Observable<any> => {
    return this.apiService.put(url, body, {});
  };

  // Deleting a product via the API
  deleteCoupon = (url: string): Observable<any> => {
    return this.apiService.delete(url, {});
  };
}