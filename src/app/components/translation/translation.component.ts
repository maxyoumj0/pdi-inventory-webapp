import { Component, OnInit } from '@angular/core';
import { InvenService } from '../../services/inven.service';
import { Translation } from '../../models/translation';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent implements OnInit {
  translations: Translation[] = [];
  displays: Translation[] = [];
  action: string;
  name: string;
  rest: string;
  pdiCode: number;
  itemInput;
  codeInput;

  constructor(private inven: InvenService) { }

  ngOnInit() {
    this.inven.getTranslation();
    this.inven.getTranslationUpdateListener()
      .subscribe((items: Translation[]) => {
        this.translations = items;
      });
  }

  onSubmit() {
    this.displays = [];
    let j = 0;
    let i;
    if (this.itemInput === undefined || this.itemInput === null) {
      this.displays = this.translations;
    } else {
      for (i = 0; i < this.translations.length; i++) {
        let compare: string = this.translations[i].descrpt;
        if (compare.toLowerCase().includes(this.itemInput.toLowerCase())) {
          this.displays[j] = this.translations[i];
          ++j;
        }
      }
    }
  }
}
