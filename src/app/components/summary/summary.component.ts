import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../models/inventory';
import { InvenService } from '../../services/inven.service';
import { GoogleChartsModule } from 'angular-google-charts';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  inventorys: Inventory[] = [];
  displays: Inventory[] = [];
  sort: string;

  title: string;
  type = 'PieChart';
  data = [[]];
  column = [];
  options = {
    colors: [ '#003f5c', '#005a80', '#00779b', '#0094a7', '#00b1a2', '#00cd8b', '#00e763',
      '#03ff07'],
    is3D: true
  };
  height = 400;
  width = 550;

  total: number;

  constructor(private inven: InvenService) {  }

  ngOnInit() {
    this.inven.getInventory();
    this.inven.getInventoryUpdateListener()
      .subscribe((items: Inventory[]) => {
        this.inventorys = items;
      });

    this.column = ['Location', 'Number'];
  }

  onDry1() {
    this.data = [
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0]
    ];

    let i;
    let count = 0;
    this.total = 0;
    let temp: Inventory[] = [];
    for (i = 0; i < this.inventorys.length; ++i) {
      if (this.inventorys[i].location === 'Dry Storage1' || this.inventorys[i].location === 'Dry Storage 1') {
        temp[count] = this.inventorys[i];
        ++count;
      }
    }

    let j;
    let min;
    if (this.sort === 'qty') {
      for (i = 0; i < temp.length; ++i) {
        this.total += temp[i].qty;
      }

      for (i = temp.length - 1; i >= 0; i--) {
        for (j = 1; j <= i; j++) {
          if(temp[j - 1].qty > temp[j].qty) {
           var temporary = temp[j - 1];
           temp[j - 1] = temp[j];
           temp[j] = temporary;
          }
        }
      }
    } else if (this.sort === 'price') {
      for (i = 0; i < temp.length; ++i) {
        this.total += temp[i].qty * temp[i].price;
      }
      this.total = parseFloat(this.total.toFixed(2));

      for (i = temp.length - 1; i >= 0; i--) {
        for (j = 1; j <= i; j++) {
          if (temp[j - 1].price * temp[j - 1].qty > temp[j].price * temp[j].qty) {
           let temporary = temp[j - 1];
           temp[j - 1] = temp[j];
           temp[j] = temporary;
          }
        }
      }
    }

    this.displays = temp.reverse();

    if (this.sort === 'qty') {
      const leng = this.displays.length;
      for (i = 0; i < 15; ++i) {
        this.data[i][0] = this.displays[i].descrpt;
        this.data[i][1] = this.displays[i].qty;
      }
      this.data[15][0] = 'Others';
      let sum = 0;
      for (i = 0; i < leng - 16; ++i) {
        sum += this.displays[i].qty;
      }
      this.data[15][1] = sum;
    } else if (this.sort === 'price') {
      const leng = this.displays.length;
      for (i = 0; i < 15; ++i) {
        this.data[i][0] = this.displays[i].descrpt;
        console.log(this.data[i][0]);
        this.data[i][1] = this.displays[i].qty * this.displays[i].price;
      }
      this.data[15][0] = 'Others';
      let sum = 0;
      for (i = 0; i < leng - 16; ++i) {
        sum += this.displays[i].qty * this.displays[i].price;
      }
      this.data[15][1] = sum;
    }
  }

  onDry2() {
    this.data = [
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0]
    ];

    let i;
    let count = 0;
    this.total = 0;
    let temp: Inventory[] = [];
    for (i = 0; i < this.inventorys.length; ++i) {
      if (this.inventorys[i].location === 'Dry Storage2') {
        temp[count] = this.inventorys[i];
        ++count;
      }
    }

    let j;
    let min;
    if (this.sort === 'qty') {
      for (i = 0; i < temp.length; ++i) {
        this.total += temp[i].qty;
      }

      for (i = temp.length - 1; i >= 0; i--) {
        for (j = 1; j <= i; j++) {
          if(temp[j - 1].qty > temp[j].qty) {
           var temporary = temp[j - 1];
           temp[j - 1] = temp[j];
           temp[j] = temporary;
          }
        }
      }
    } else if (this.sort === 'price') {
      for (i = 0; i < temp.length; ++i) {
        this.total += temp[i].qty * temp[i].price;
      }
      this.total = parseFloat(this.total.toFixed(2));

      for (i = temp.length - 1; i >= 0; i--) {
        for (j = 1; j <= i; j++) {
          if (temp[j - 1].price * temp[j - 1].qty > temp[j].price * temp[j].qty) {
           var temporary = temp[j - 1];
           temp[j - 1] = temp[j];
           temp[j] = temporary;
          }
        }
      }
    }
    this.displays = temp.reverse();

    if (this.sort === 'qty') {
      console.log('OK');
      const leng = this.displays.length;
      for (i = 0; i < 15; ++i) {
        this.data[i][0] = this.displays[i].descrpt;
        console.log(this.data[i][0]);
        this.data[i][1] = this.displays[i].qty;
        console.log(this.data[i][1]);
      }
      this.data[15][0] = 'Others';
      let sum = 0;
      for (i = 15; i < leng; ++i) {
        sum += this.displays[i].qty;
      }
      this.data[15][1] = sum;
    } else if (this.sort === 'price') {
      const leng = this.displays.length;
      for (i = 0; i < 15; ++i) {
        this.data[i][0] = this.displays[i].descrpt;
        console.log(this.data[i][0]);
        this.data[i][1] = this.displays[i].qty * this.displays[i].price;
      }
      this.data[15][0] = 'Others';
      let sum = 0;
      for (i = 15; i < leng; ++i) {
        sum += this.displays[i].qty * this.displays[i].price;
      }
      this.data[15][1] = sum;
    }
  }

  onCooler() {
    this.data = [
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0]
    ];

    let i;
    let count = 0;
    this.total = 0;
    let temp: Inventory[] = [];
    for (i = 0; i < this.inventorys.length; ++i) {
      if (this.inventorys[i].location === 'Cooler') {
        temp[count] = this.inventorys[i];
        ++count;
      }
    }

    let j;
    let min;
    if (this.sort === 'qty') {
      for (i = 0; i < temp.length; ++i) {
        this.total += temp[i].qty;
      }

      for (i = temp.length - 1; i >= 0; i--) {
        for (j = 1; j <= i; j++) {
          if(temp[j - 1].qty > temp[j].qty) {
           var temporary = temp[j - 1];
           temp[j - 1] = temp[j];
           temp[j] = temporary;
          }
        }
      }
    } else if (this.sort === 'price') {
      for (i = 0; i < temp.length; ++i) {
        this.total += temp[i].qty * temp[i].price;
      }
      this.total = parseFloat(this.total.toFixed(2));

      for (i = temp.length - 1; i >= 0; i--) {
        for (j = 1; j <= i; j++) {
          if (temp[j - 1].price * temp[j - 1].qty > temp[j].price * temp[j].qty) {
           var temporary = temp[j - 1];
           temp[j - 1] = temp[j];
           temp[j] = temporary;
          }
        }
      }
    }
    this.displays = temp.reverse();

    if (this.sort === 'qty') {
      console.log('OK');
      const leng = this.displays.length;
      for (i = 0; i < 15; ++i) {
        this.data[i][0] = this.displays[i].descrpt;
        console.log(this.data[i][0]);
        this.data[i][1] = this.displays[i].qty;
        console.log(this.data[i][1]);
      }
      this.data[15][0] = 'Others';
      let sum = 0;
      for (i = 15; i < leng; ++i) {
        sum += this.displays[i].qty;
      }
      this.data[15][1] = sum;
    } else if (this.sort === 'price') {
      const leng = this.displays.length;
      for (i = 0; i < 15; ++i) {
        this.data[i][0] = this.displays[i].descrpt;
        console.log(this.data[i][0]);
        this.data[i][1] = this.displays[i].qty * this.displays[i].price;
      }
      this.data[15][0] = 'Others';
      let sum = 0;
      for (i = 15; i < leng; ++i) {
        sum += this.displays[i].qty * this.displays[i].price;
      }
      this.data[15][1] = sum;
    }
  }

  onFreezer() {
    this.data = [
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0],
      ['', 0]
    ];

    let i;
    let count = 0;
    this.total = 0;
    let temp: Inventory[] = [];
    for (i = 0; i < this.inventorys.length; ++i) {
      if (this.inventorys[i].location === 'Freezer') {
        temp[count] = this.inventorys[i];
        ++count;
      }
    }

    let j;
    let min;
    if (this.sort === 'qty') {
      for (i = 0; i < temp.length; ++i) {
        this.total += temp[i].qty;
      }

      for (i = temp.length - 1; i >= 0; i--) {
        for (j = 1; j <= i; j++) {
          if(temp[j - 1].qty > temp[j].qty) {
           var temporary = temp[j - 1];
           temp[j - 1] = temp[j];
           temp[j] = temporary;
          }
        }
      }
    } else if (this.sort === 'price') {
      for (i = 0; i < temp.length; ++i) {
        this.total += temp[i].qty * temp[i].price;
      }
      this.total = parseFloat(this.total.toFixed(2));

      for (i = temp.length - 1; i >= 0; i--) {
        for (j = 1; j <= i; j++) {
          if (temp[j - 1].price * temp[j - 1].qty > temp[j].price * temp[j].qty) {
           var temporary = temp[j - 1];
           temp[j - 1] = temp[j];
           temp[j] = temporary;
          }
        }
      }
    }
    this.displays = temp.reverse();

    if (this.sort === 'qty') {
      console.log('OK');
      const leng = this.displays.length;
      for (i = 0; i < 15; ++i) {
        this.data[i][0] = this.displays[i].descrpt;
        console.log(this.data[i][0]);
        this.data[i][1] = this.displays[i].qty;
        console.log(this.data[i][1]);
      }
      this.data[15][0] = 'Others';
      let sum = 0;
      for (i = 15; i < leng; ++i) {
        sum += this.displays[i].qty;
      }
      this.data[15][1] = sum;
    } else if (this.sort === 'price') {
      const leng = this.displays.length;
      for (i = 0; i < 15; ++i) {
        this.data[i][0] = this.displays[i].descrpt;
        console.log(this.data[i][0]);
        this.data[i][1] = this.displays[i].qty * this.displays[i].price;
      }
      this.data[15][0] = 'Others';
      let sum = 0;
      for (i = 15; i < leng; ++i) {
        sum += this.displays[i].qty * this.displays[i].price;
      }
      this.data[15][1] = sum;
    }
  }
}
