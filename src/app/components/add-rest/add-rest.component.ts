import { Component, OnInit, OnDestroy } from '@angular/core';
import { InvenService } from '../../services/inven.service';
import { Restaurant } from '../../models/restaurant';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-rest',
  templateUrl: './add-rest.component.html',
  styleUrls: ['./add-rest.component.css']
})
export class AddRestComponent implements OnInit, OnDestroy {
  restName: string;
  no: number;
  rest: Restaurant[] = [];
  private restsSub: Subscription;

  constructor(private inven: InvenService) { }

  ngOnInit() {
    this.inven.getRestaurant();
    this.restsSub = this.inven.getRestaurantUpdateListener()
      .subscribe((items: Restaurant[]) => {
        this.rest = items;
      });
  }

  onSubmit(rests) {
    this.no = this.rest[this.rest.length - 1].no + 10;
    this.restName = rests.value;
    this.inven.addRestaurant(this.no, this.restName);
  }

  onSub(drests) {
    this.inven.deleteRestaurant(drests.value);
  }

  ngOnDestroy() {
    this.restsSub.unsubscribe();
  }
}
