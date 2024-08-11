import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Coupon } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { PricePipe } from '../../pipes/price.pipe';
import { TruncateNamePipe } from '../../pipes/truncate-name.pipe';

@Component({
  selector: 'coupon-item',
  standalone: true,
  imports: [
    RatingModule,
    FormsModule,
    ButtonModule,
    ConfirmPopupModule,
    ToastModule,
    PricePipe,
    TruncateNamePipe,
  ],
  providers: [ConfirmationService],
  templateUrl: './coupon-item.component.html',
  styleUrl: './coupon-item.component.scss',
})
export class CouponItemComponent {
  constructor(private confirmationService: ConfirmationService) {}

  @ViewChild('deleteButton') deleteButton: any;

  @Input() coupon!: Coupon;
  @Output() edit: EventEmitter<Coupon> = new EventEmitter<Coupon>();
  @Output() delete: EventEmitter<Coupon> = new EventEmitter<Coupon>();

  editCoupon() {
    this.edit.emit(this.coupon);
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: 'Are you sure that you want to delete this coupon ?',
      accept: () => {
        this.deleteCoupon();
      },
    });
  }

  deleteCoupon() {
    this.delete.emit(this.coupon);
  }

  ngOnInit() {}
}
