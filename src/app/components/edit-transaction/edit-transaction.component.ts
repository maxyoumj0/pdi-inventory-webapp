import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { InvenService } from '../../services/inven.service';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent implements OnInit {
  private id: string;
  transactions: Transaction[];
  transactionGet: Transaction;

  confirm: boolean;
  confirmInput: string;

  constructor(private inven: InvenService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.id = paramMap.get('id');
      }

      this.inven.getTransaction();
      this.inven.getTransactionUpdateListener()
      .subscribe((items: Transaction[]) => {
        this.transactions = items;
      });
    });

    this.confirm = false;
  }

  onDelete() {
    if (!this.confirm) {
      this.confirm = true;
      return;
    }

    if (this.confirmInput === 'yes' || this.confirmInput === 'Yes') {
      this.inven.deleteTransaction(this.id);
      this.router.navigate(['/transaction']);
    }
  }
}
