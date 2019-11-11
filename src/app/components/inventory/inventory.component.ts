import { Component, OnInit } from '@angular/core';
import { InvenService } from '../../services/inven.service';
import { Inventory } from '../../models/inventory';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  inventorys: Inventory[] = [];
  displays: Inventory[] = [];
  action: string;
  name: string;
  rest: string;
  pdiCode: string;
  itemInput;
  codeInput;
  locInput;

  constructor(private inven: InvenService) { }

  ngOnInit() {
    this.inven.getInventory();
    this.inven.getInventoryUpdateListener()
      .subscribe((items: Inventory[]) => {
        this.inventorys = items;
      });

    console.log(this.inventorys.length);
    let i;
    for (i = 0; i < this.inventorys.length; ++i) {
      console.log(this.inventorys[i].qty);
    }
  }

  onSubmit() {
    console.log(this.itemInput, this.locInput);
    this.displays = [];
    let j = 0;
    let i;
    if ((this.itemInput === undefined || this.itemInput == null) && (this.locInput === undefined || this.locInput == null)) {
      this.displays = this.inventorys;
    } else if (this.itemInput !== undefined && (this.locInput == null || this.locInput === undefined)) {
      for (i = 0; i < this.inventorys.length; i++) {
        const compare: string = this.inventorys[i].descrpt;
        if (compare.toLowerCase().includes(this.itemInput.toLowerCase())) {
          this.displays[j] = this.inventorys[i];
          ++j;
          console.log(compare);
        }
      }
    } else if ((this.itemInput === undefined || this.itemInput == null) && this.locInput !== undefined) {
      for (i = 0; i < this.inventorys.length; i++) {
        const compare: string = this.inventorys[i].location;
        if (compare.toLowerCase().includes(this.locInput.toLowerCase())) {
          this.displays[j] = this.inventorys[i];
          ++j;
          console.log(compare);
        }
      }
    }
  }

  onAddSubmit(){

  }
}
