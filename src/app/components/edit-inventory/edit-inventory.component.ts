import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InvenService } from '../../services/inven.service';
import { Inventory } from '../../models/inventory';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.css']
})
export class EditInventoryComponent implements OnInit {
  id: string;
  inventorys: Inventory[];
  inventoryGet: Inventory;

  nameInput: string;
  supplierInput: string;
  unitInput: string;
  locationInput: string;
  qtyInput: number;
  priceInput: number;

  confirm: boolean;
  confirmInput: string;

  constructor(private inven: InvenService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.id = paramMap.get('id');
        this.inven.getInventoryById(this.id).subscribe(data => {
          this.inventoryGet = {pdi_code: data.posts[0].PDI_Code, ctg_code: data.posts[0].Ctg_code, item: data.posts[0].Item,
            ctg: data.posts[0].Category, descrpt: data.posts[0].Description, supplier: data.posts[0].Supplier, unit:
            data.posts[0].Handling_Unit, location: data.posts[0].Location, qty: data.posts[0].Qty, price: data.posts[0].Price};
        });
      }
    });
  }

  onSubmit() {
    if (this.nameInput == undefined) {
      this.nameInput = this.inventoryGet.descrpt;
    }
    if (this.supplierInput == undefined) {
      this.supplierInput = this.inventoryGet.supplier;
    }
    if (this.unitInput == undefined) {
      this.unitInput = this.inventoryGet.unit;
    }
    if (this.locationInput == undefined) {
      this.locationInput = this.inventoryGet.location;
    }
    if (this.qtyInput == undefined) {
      this.qtyInput = this.inventoryGet.qty;
    }
    if (this.priceInput == undefined) {
      this.priceInput = this.inventoryGet.price;
    }
    console.log(this.nameInput, this.supplierInput, this.unitInput, this.priceInput);
    this.inven.updateInventoryEdit(this.nameInput, this.supplierInput, this.unitInput, this.locationInput,
      this.qtyInput, this.priceInput, this.inventoryGet.pdi_code);
  }

  onDelete() {
    if (!this.confirm) {
      this.confirm = true;
      return;
    }

    if (this.confirmInput === 'yes' || this.confirmInput === 'Yes') {
      this.inven.deleteInventory(this.id);
      this.router.navigate(['/inventory']);
    }
  }
}
