import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  chose = false;
  choseOne = false;
  choseTwo = false;
  choseThree = false;

  constructor() { }

  ngOnInit() {
  }

  onChoose(option: number, chosen: boolean) {
    this.chose = chosen;
    if (option === 1) {
      this.choseOne = chosen;
    } else if (option === 2) {
      this.choseTwo = chosen;
    } else if (option === 3) {
      this.choseThree = chosen;
    }
  }
}
