import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InvenService } from '../../services/inven.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  name: string;
  names: string[] = [];

  constructor(private inven: InvenService) { }

  ngOnInit() {
  }

  onSubmit(names: HTMLInputElement) {
    this.name = names.value;
    this.inven.addName(this.name);
  }

  onSub(drests) {
    this.inven.deleteName(drests.value);
  }
}
