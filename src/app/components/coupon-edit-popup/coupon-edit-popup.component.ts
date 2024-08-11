import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Coupon } from '../../../types';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'coupon-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './coupon-edit-popup.component.html',
  styleUrl: './coupon-edit-popup.component.scss',
})
export class CouponEditPopupComponent {
  constructor(private formBuilder: FormBuilder) {}

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  @Input() header!: string;

  @Input() coupon: Coupon={
    code:'',
    expirationDate:'',
    fixed: true,
    numberOfUses:0,
    value:0,
  };


  @Output() confirm = new EventEmitter<Coupon>();

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
        control.value
      );

      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }

  couponForm = this.formBuilder.group({
    code: ['', [Validators.required, this.specialCharacterValidator()]],
    value: [0],
    fixed: [true],
    numberOfUses: [0],
    expirationDate: [this.formatDate(new Date())]  // Initializes with the current date formatted as yyyy-MM-dd
});

// Helper method to format the date
formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

  ngOnChanges() {
    this.couponForm.patchValue(this.coupon);
  }

  onConfirm() {
    const { code, fixed, value, numberOfUses, expirationDate } =
      this.couponForm.value;

    this.confirm.emit({
      code: code || '',
      fixed: fixed || true,
      value: value || 0,
      numberOfUses: numberOfUses || 0,
      expirationDate: expirationDate || this.formatDate(new Date()),
    });

    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
