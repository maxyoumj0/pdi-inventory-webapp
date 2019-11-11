import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Inventory } from '../../models/inventory';
import { Translation } from '../../models/translation';
import { CategoryCode } from '../../models/category_code';
import { InvenService } from '../../services/inven.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit, OnDestroy {
  pdi_code: string; // FORM HERE
  ctg_code: string; // FORM HERE
  item: string; // FORM HERE
  ctg: string;
  descrpt: string;
  supplier: string;
  unit: string;
  location: string;
  qty: number;
  price: number;
  transId: number;
  supplyCode: string;
  success: boolean;
  success1: boolean;
  success2: boolean;

  pdi: string; // INPUT
  price2: number; // INPUT
  supplier2: string; // INPUT
  supply_code2: string; // INPUT
  ctg2: string;
  ctg_code2: string;
  descrpt2: string;
  item2: string;
  unit2: string;
  location2: string;
  transId2: number;
  qty2: number; // INPUT
  oldQty2: number;

  invenSub: Subscription;
  transSub: Subscription;
  ctgSub: Subscription;

  ditem: string;

  inventorys: Inventory[] = [];
  translations: Translation[] = [];
  ctgCodes: CategoryCode[] = [];

  constructor(private inven: InvenService) { }

  ngOnInit() {
    this.success = false;
    this.success1 = false;
    this.success2 = false;

    this.inven.getInventory();
    this.invenSub = this.inven.getInventoryUpdateListener()
      .subscribe((items: Inventory[]) => {
        this.inventorys = items;
      });

    this.inven.getTranslation();
    this.transSub = this.inven.getTranslationUpdateListener()
      .subscribe((items: Translation[]) => {
        this.translations = items;
      });

    this.inven.getCategory();
    this.ctgSub = this.inven.getCategoryUpdateListener()
      .subscribe((items: CategoryCode[]) => {
        this.ctgCodes = items;
      });
  }

  onSubmit(ctg: NgModel, loc: NgModel) {
    this.ctg_code = ctg.value;
    this.location = loc.value;

    // Find Item Code
    this.item = this.findHighestItem();

    // Create PDI Code
    this.pdi_code = this.ctg_code + this.item;

    // Find Category Name
    this.ctg = this.findCtg();

    // Post on Translation
    this.transId = this.findHighestTransId();
    this.inven.addTranslation(this.transId, this.supplyCode, this.pdi_code, this.descrpt, this.supplier, this.price);

    console.log(this.pdi_code, this.ctg_code, this.item, this.ctg, this.descrpt, this.supplier, this.unit,
      this.location, this.qty, this.price);

    this.inven.addInventory(this.pdi_code, this.ctg_code, this.item, this.ctg, this.descrpt, this.supplier, this.unit,
      this.location, this.qty, this.price);

    this.success = true;
  }

  onSub() {
    this.setup(this.pdi);
    console.log(this.transId2, this.supply_code2, this.pdi, this.descrpt2, this.supplier2, this.price2);
    console.log(this.pdi, this.ctg_code2, this.item2, this.ctg2, this.descrpt2, this.supplier2, this.unit2,
      this.location2, (+this.qty2 + +this.oldQty2), this.price2);

    this.inven.addTranslation(this.transId2, this.supply_code2, this.pdi, this.descrpt2, this.supplier2, this.price2);
    this.inven.updateInventory((+this.oldQty2 + +this.qty2), this.pdi);

    this.success1 = true;
  }

  setup(pdi: string) {
    let i = 0;
    for (i = 0; i < this.inventorys.length; ++i) {
      if (this.inventorys[i].pdi_code === pdi) {
        this.ctg_code2 = this.inventorys[i].ctg_code;
        this.ctg2 = this.inventorys[i].ctg;
        this.descrpt2 = this.inventorys[i].descrpt;
        this.unit2 = this.inventorys[i].unit;
        this.location2 = this.inventorys[i].location;
        this.oldQty2 = this.inventorys[i].qty;
      }
    }
    this.transId2 = this.findHighestTransId();
    this.item2 = this.findHighestItem();
  }

  findHighestItem() {
    let highest = '0';
    let i;
    for (i = 0; i < this.inventorys.length; ++i) {
      if (parseInt(this.inventorys[i].item) > parseInt(highest)) {
        highest = this.inventorys[i].item;
      }
    }
    let temp: string = (parseInt(highest) + 1).toString();
    while (temp.length < 5) {
      temp = '0' + temp;
    }
    return temp;
  }

  findHighestTransId() {
    let highest = 0;
    let i;
    for (i = 0; i < this.translations.length; ++i) {
      if (this.translations[i].translation_id > highest) {
        highest = this.translations[i].translation_id;
      }
    }
    return highest + 1;
  }

  findCtg() {
    let i;
    for (i = 0; i < this.ctgCodes.length; ++i) {
      if (this.ctgCodes[i].ctg_code.toString() === this.ctg_code.toString()) {
        return this.ctgCodes[i].category;
      }
    }
  }

  ngOnDestroy() {
    this.invenSub.unsubscribe();
    this.ctgSub.unsubscribe();
    this.transSub.unsubscribe();
  }
}
