import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Transaction } from '../../models/transaction';
import { InvenService } from '../../services/inven.service';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = [];
  display: Transaction[] = [];
  private invenSub: Subscription;

  itemName: string;
  employee: string;
  date: string;

  count = 50;

  constructor(private inven: InvenService) { }

  ngOnInit() {
    this.inven.getTransaction();
    this.invenSub = this.inven.getTransactionUpdateListener()
      .subscribe((items: Transaction[]) => {
        this.transactions = items.reverse();
      });
  }

  onClick() {
    if (this.itemName === undefined && this.employee === undefined && this.date === undefined) {
      let i;
      const length = this.display.length;

      for (i = length; i < length + 50; ++i) {
        this.display[i] = this.transactions[i];
      }
    } else {
      return;
    }
  }

  onSubmit() {
    this.display = [];
    let dateCheck = false;
    let shiftCheck = false;
    let groupCheck = false;

    console.log(this.itemName, this.employee, this.date);

    if (this.itemName === '') {
      this.itemName = undefined;
    }
    if (this.employee === '') {
      this.employee = undefined;
    }
    if (this.date === '') {
      this.date = undefined;
    }

    if (this.itemName === undefined && this.employee === undefined && this.date === undefined) {
      let i;
      for (i = 0; i < 50; ++i) {
        this.display[i] = this.transactions[i];
      }
      return;
    }

    let i;
    for (i = 0; i < 3; ++i) {
      if (this.itemName !== undefined && i === 0 && !dateCheck) {
        let j;
        let count = 0;
        for (j = 0; j < this.transactions.length; ++j) {
          const text: string = this.transactions[j].descrpt;
          if (text != null && text.toLowerCase().includes(this.itemName.toLocaleLowerCase())) {
            this.display[count] = this.transactions[j];
            ++count;
          }
        }
        dateCheck = true;
      } else if (this.itemName !== undefined && i !== 0 && !dateCheck) {
        const temp: Transaction[] = this.display;
        this.display = [];
        let count = 0;
        let j;
        for (j = 0; j < temp.length; ++j) {
          if (temp[j].descrpt != null && temp[j].descrpt.toLowerCase().includes(this.itemName.toLowerCase())) {
            this.display[count] = temp[j];
            ++count;
          }
        }
        dateCheck = true;
      } else if (this.employee !== undefined && i === 0 && !shiftCheck) {
          let count = 0;
          let j;
          for (j = 0; j < this.transactions.length; ++j) {
            if (this.transactions[j].employee != null && this.transactions[j].employee.toLowerCase().includes(this.employee.toLowerCase())) {
              this.display[count] = this.transactions[j];
              ++count;
            }
          }
          shiftCheck = true;
      } else if (this.employee !== undefined && i !== 0 && !shiftCheck) {
        const temp: Transaction[] = this.display;
        this.display = [];
        let count = 0;
        let j;
        for (j = 0; j < temp.length; ++j) {
          if (temp[j].employee != null && temp[j].employee.toLowerCase().includes(this.employee.toLowerCase())) {
            this.display[count] = temp[j];
            ++count;
          }
        }
        shiftCheck = true;
      } else if (this.date !== undefined && i === 0 && !groupCheck) {
        let count = 0;
        let j;
        for (j = 0; j < this.transactions.length; ++j) {
          if (this.transactions[j].date != null && this.transactions[j].date.toLowerCase().includes(this.date.toLowerCase())) {
            this.display[count] = this.transactions[j];
            ++count;
          }
        }
        groupCheck = true;
      } else if (this.date !== undefined && i !== 0 && !groupCheck) {
          const temp: Transaction[] = this.display;
          this.display = [];
          let count = 0;
          let j;
          for (j = 0; j < temp.length; ++j) {
            console.log(temp[j].date, this.date);
            if (temp[j].date != null && temp[j].date.includes(this.date)) {
              this.display[count] = temp[j];
              ++count;
            }
          }
          groupCheck = true;
        }
    }
  }

  ngOnDestroy() {
    this.invenSub.unsubscribe();
  }
}
