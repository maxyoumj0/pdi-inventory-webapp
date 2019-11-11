import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';

import { Restaurant } from '../../models/restaurant';
import { InvenService } from '../../services/inven.service';
import { Name } from '../../models/name';

@Component({
  selector: 'app-stock-management',
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.css']
})
export class StockManagementComponent implements OnInit {
  action: string;
  name: string;
  rest: string;
  submitted = false;

  selectedName = null;
  selectedRest = null;

  names: Name[] = [];
  restaurants: Restaurant[] = [];

  constructor(private inven: InvenService) { }

  ngOnInit() {
    this.inven.getRestaurant();
    this.inven.getRestaurantUpdateListener()
      .subscribe((items: Restaurant[]) => {
        this.restaurants = items;
      });

    this.inven.getName();
    this.inven.getNameUpdateListener()
      .subscribe((items: Name[]) => {
        this.names = items;
      });
  }

  callType(value) {
    this.name = value;
  }

  onSubmit(actions: HTMLSelectElement, names: HTMLSelectElement, rests: HTMLSelectElement) {
    this.action = actions.value;
    this.rest = rests.value;
    this.name = names.value;
    this.submitted = true;
  }
}
