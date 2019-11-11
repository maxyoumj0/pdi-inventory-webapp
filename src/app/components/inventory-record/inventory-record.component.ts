import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { InvenService } from '../../services/inven.service';
import { Translation } from '../../models/translation';
import { Inventory } from '../../models/inventory';
import { FormsModule, NgModel } from '@angular/forms';
import { Transaction } from 'src/app/models/transaction';
import { Subscription } from 'rxjs';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inventory-record',
  templateUrl: './inventory-record.component.html',
  styleUrls: ['./inventory-record.component.css']
})
export class InventoryRecordComponent implements OnInit, OnDestroy {
  @Input() name: string;
  @Input() action: string;
  @Input() rest: string;
  @Input() submitted: boolean;

  validCode: boolean;
  code: string;
  submittedSecond = false;
  codes: Translation[] = [];
  existCode = false;
  inventorys: Inventory[] = [];
  transactions: Transaction[] = [];
  item: string;
  location: string;
  initial: number;
  pdiCode: string;
  unit: string;
  index: number;

  transSuccess: string;
  transComplete: boolean;

  formComplete: boolean;
  qty: number;

  currentDate: string;

  transSub: Subscription;
  invensSub: Subscription;
  transactionSub: Subscription;

  constructor(private datePipe: DatePipe, private inven: InvenService) { }

  ngOnInit() {
    this.inven.getTranslation();
    this.transSub = this.inven.getTranslationUpdateListener()
      .subscribe((items: Translation[]) => {
        this.codes = items;
      });

    this.inven.getInventory();
    this.invensSub = this.inven.getInventoryUpdateListener()
      .subscribe((items: Inventory[]) => {
        this.inventorys = items;
      });

    this.inven.getTransaction();
    this.transactionSub = this.inven.getTransactionUpdateListener()
      .subscribe((items: Transaction[]) => {
        this.transactions = items;
      });

    this.transComplete = false;
    this.formComplete = false;
  }

  onClear() {
    document.getElementById('code').focus();
  }

  onSubmit(qtys: NgModel, dates: NgModel) {
    this.inven.getInventory();
    this.invensSub = this.inven.getInventoryUpdateListener()
      .subscribe((items: Inventory[]) => {
        this.inventorys = items;
      });

    let initialQty;
    let i;
    for (i = 0; i < this.inventorys.length; ++i) {
      if (this.inventorys[i].pdi_code === this.pdiCode) {
        initialQty = this.inventorys[i].qty;
        break;
      }
    }
    this.qty = qtys.value;

    const tempDate = dates.value;
    let tempYear = '';
    let tempMonth: string;
    let tempDay: string;

    for (i = 0; i < 4; ++i) {
      tempYear = tempYear + tempDate[i];
    }
    if (tempDate[5] === '0') {
      tempMonth = tempDate[6];
    } else {
      tempMonth = tempDate[5] + tempDate[6];
    }
    if (tempDate[8] === '0') {
      tempDay = tempDate[9];
    } else {
      tempDay = tempDate[8] + tempDate[9];
    }
    this.currentDate = tempMonth + '/' + tempDay + '/' + tempYear;
    console.log(tempMonth, tempDay, tempYear, tempDate);

    // Add to Transaction
    if (this.action === 'Add') {
      this.transSuccess = this.inven.addTransaction((parseInt(this.transactions[this.transactions.length - 1].transId) + 1).toString(), this.codes[this.index].supply_code,
        this.pdiCode, this.item, this.name, this.action, qtys.value, this.unit, this.location, this.currentDate, this.rest);
    } else if (this.action === 'Remove') {
      this.transSuccess = this.inven.addTransaction((parseInt(this.transactions[this.transactions.length - 1].transId) + 1).toString(), this.codes[this.index].supply_code,
        this.pdiCode, this.item, this.name, this.action, qtys.value * -1, this.unit, this.location, this.currentDate , this.rest);
    } else if (this.action === 'Adjust(+)') {
      this.transSuccess = this.inven.addTransaction((parseInt(this.transactions[this.transactions.length - 1].transId) + 1).toString(), this.codes[this.index].supply_code,
        this.pdiCode, this.item, 'SYSTEM', this.action, qtys.value, this.unit, this.location, this.currentDate , this.rest);
    } else if (this.action === 'Adjust(-)') {
      this.transSuccess = this.inven.addTransaction((parseInt(this.transactions[this.transactions.length - 1].transId) + 1).toString(), this.codes[this.index].supply_code,
        this.pdiCode, this.item, 'SYSTEM', this.action, qtys.value * -1, this.unit, this.location, this.currentDate , this.rest);
    }
    console.log(this.transSuccess);

    if (this.transSuccess === 'success') {
      this.transComplete = true;
    } else {
      this.transComplete = false;
    }

    if (this.action === 'Add' || this.action === 'Adjust(+)') {
      this.inven.updateInventory(parseInt(initialQty) + parseInt(qtys.value), this.pdiCode);
    } else if (this.action === 'Remove' || this.action === 'Adjust(-)') {
      this.inven.updateInventory(initialQty - qtys.value, this.pdiCode);
    }

    this.formComplete = true;
    document.getElementById('code').focus();
  }

  updateCode(event: Event) {
    console.log('CODE READ');

    let i;
    for (i = 0; i < this.codes.length; i++) {
      let comparison: string;
      if (this.codes[i].supply_code == null) {
        comparison = 'NULL234';
      } else {
        comparison = this.codes[i].supply_code;
      }
      if ((event.target as HTMLInputElement).value === comparison) {
        this.existCode = true;
        this.pdiCode = this.codes[i].pdi_code;
        this.index = i;
        break;
      } else {
        this.existCode = false;
      }
    }
    if (!this.existCode) {
      for (i = 0; i < this.codes.length; i++) {
        let comparison: string;
        if (this.codes[i].pdi_code == null) {
          comparison = 'NULL234';
        } else {
          comparison = this.codes[i].pdi_code.toString();
        }
        if ((event.target as HTMLInputElement).value === comparison) {
          this.existCode = true;
          this.pdiCode = this.codes[i].pdi_code;
          this.index = i;
          break;
        } else {
          this.existCode = false;
        }
      }
    }

    if (this.existCode) {
      this.fillItem(this.pdiCode);
      console.log(this.initial);
    } else {
      this.item = null;
      this.location = null;
      this.initial = null;
    }
  }

  fillItem(pdiCode: string) {
    this.inven.getInventory();
    this.invensSub = this.inven.getInventoryUpdateListener()
      .subscribe((items: Inventory[]) => {
        this.inventorys = items;
      });

    let i;
    for (i = 0; i < this.inventorys.length; i++) {
      if (this.inventorys[i].pdi_code === pdiCode) {
        this.unit = this.inventorys[i].unit;
        this.item = this.inventorys[i].descrpt;
        this.location = this.inventorys[i].location;
        this.initial = 1;
        const tempDate = this.datePipe.transform(new Date(), 'M/d/y, h:mm:ss a');
        this.currentDate = this.extractDate(tempDate)[2] + '-' + this.extractDate(tempDate)[1] + '-' + this.extractDate(tempDate)[0];
        break;
      }
    }
    this.formComplete = false;
    this.transComplete = false;
  }

  extractDate(input: string) {
    let arr: string[] = [];
    let day: string;
    let month: string;
    let year: string;
    let index = 0;

    if (input[1] === '/') {
      month = '0' + input[0];
      index = 2;
    } else if (input[2] === '/'){
      month = input[0] + input[1];
      index = 3;
    }

    if (input[index + 1] === '/') {
      day = '0' + input[index];
      index += 2;
    } else if (input[index + 2] === '/') {
      day = input[index] + input[index + 1];
      index += 3;
    }
    let j;
    let tempYear = '';
    for (j = index; j < 4 + index; ++j) {
      tempYear = tempYear + input[j];
    }
    year = tempYear;

    arr = [day, month, year];
    return arr;
  }

  ngOnDestroy() {
    this.invensSub.unsubscribe();
    this.transSub.unsubscribe();
    this.transactionSub.unsubscribe();
  }
}
