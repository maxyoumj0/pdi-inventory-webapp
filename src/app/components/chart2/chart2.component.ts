import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InvenService } from '../../services/inven.service';
import { Inventory } from '../../models/inventory';
import { Transaction } from '../../models/transaction';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.css']
})
export class Chart2Component implements OnInit {
  private id: string;
  inventoryGet: Inventory;
  inventorys: Inventory[] = [];
  transactions: Transaction[] = [];
  dateInput: string;

  type = 'LineChart';
  data = [];
  columnNames = ['Week', 'In', 'Out'];
  options = {
    hAxis: {
      title: 'Week'
    },
    vAxis: {
      title: 'Quantity'
    },
  };
  width = 800;
  height = 500;

  itemName: string;

  constructor(private inven: InvenService, public route: ActivatedRoute) { }

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

    this.inven.getTransaction();
    this.inven.getTransactionUpdateListener()
      .subscribe((items: Transaction[]) => {
        this.transactions = items.reverse();
      });

    this.inven.getInventory();
    this.inven.getInventoryUpdateListener()
      .subscribe((items: Inventory[]) => {
        this.inventorys = items;
      });
  }

  onClick() {
    this.data = [
      ['', 0, 0]
    ];

    let i;
    let temp: Transaction[] = [];
    let count = 0;
    for (i = 0; i < this.transactions.length; ++i) {
      if (this.transactions[i].descrpt === this.inventoryGet.descrpt && parseInt(this.transactions[i].date[0]) !== NaN) {
        temp[count] = this.transactions[i];
        ++count;
      }
    }

    let weeks = [];
    const firstyear = parseInt(this.dateInput[0] + this.dateInput[1] + this.dateInput[2] + this.dateInput[3]);
    const firstmonth = parseInt(this.dateInput[5] + this.dateInput[6]);
    const firstdate = parseInt(this.dateInput[8] + this.dateInput[9]);
    const first = new Date(firstyear, firstmonth, firstdate);
    weeks[0] = first;
    for (i = 1; i < 13; ++i) {
      weeks[i] = this.addDays(weeks[i - 1], -7);
    }
    weeks.reverse();

    let j;
    for (i = 0; i < 12; ++i) {
      let tempMonth = weeks[i].getMonth();
      let tempYear = weeks[i].getFullYear();
      let tempMonth1 = weeks[i + 1].getMonth();
      let tempYear1 = weeks[i + 1].getFullYear();
      if (tempMonth === 0) {
        tempMonth = 12;
        tempYear -= 1;
      }
      if (tempMonth1 === 0) {
        tempMonth1 = 12;
        tempYear1 -= 1;
      }

      this.data.push([tempMonth + '/' + weeks[i].getDate() + '/' + tempYear + ' ~ ' + tempMonth1 + '/' + this.addDays(weeks[i + 1], -1).getDate() + '/' + tempYear1, 0, 0 ]);
      for (j = 0; j < temp.length; ++j) {
        const todayVal = this.extractDate(temp[j].date)[1] * 30 + this.extractDate(temp[j].date)[0];
        const compareVal1 = weeks[i].getMonth() * 30 + weeks[i].getDate();
        const compareVal2 = weeks[i + 1].getMonth() * 30 + this.addDays(weeks[i + 1], -1).getDate();
        if (todayVal < compareVal2 && todayVal > compareVal1) {
          if (temp[j].qty < 0) {
            this.data[i][2] = -1 * temp[j].qty;
          } else {
            this.data[i][1] = temp[j].qty;
          }
        }
      }
    }
  }

  extractDate(input: string) {
    let arr: number[] = [];
    let day: number;
    let month: number;
    let year: number;
    let index = 0;

    if (input[1] === '/') {
      month = parseInt(input[0]);
      index = 2;
    } else if (input[2] === '/'){
      month = parseInt(input[0] + input[1]);
      index = 3;
    }

    if (input[index + 1] === '/') {
      day = parseInt(input[index]);
      index += 2;
    } else if (input[index + 2] === '/') {
      day = parseInt(input[index] + input[index + 1]);
      index += 3;
    }
    let j;
    let tempYear = '';
    for (j = index; j < 4 + index; ++j) {
      tempYear = tempYear + input[j];
    }
    year = parseInt(tempYear);

    arr = [day, month, year];
    return arr;
  }

  addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
