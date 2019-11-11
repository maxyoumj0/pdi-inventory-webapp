import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { InvenService } from '../../services/inven.service';
import { Translation } from '../../models/translation';

@Component({
  selector: 'app-edit-translation',
  templateUrl: './edit-translation.component.html',
  styleUrls: ['./edit-translation.component.css']
})
export class EditTranslationComponent implements OnInit {
  private id: string;
  translations: Translation[];
  translationGet: Translation;

  nameInput: string;
  supplierInput: string;
  priceInput: number;

  confirm: boolean;
  confirmInput: string;

  constructor(private inven: InvenService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.id = paramMap.get('id');
        this.inven.getTranslationById(this.id).subscribe(data => {
          this.translationGet = {translation_id: data.posts[0].info_record_id, supply_code: data.posts[0].Supply_Code, pdi_code: data.posts[0].PDI_Code,
          descrpt: data.posts[0].Description, supplier: data.posts[0].Supplier, price: data.posts[0].Price};
        });
      }

      this.inven.getTranslation();
      this.inven.getTranslationUpdateListener()
      .subscribe((items: Translation[]) => {
        this.translations = items;
      });
    });

    this.confirm = false;
  }

  onSubmit() {
    if (this.nameInput == undefined) {
      this.nameInput = this.translationGet.descrpt;
    }
    if (this.supplierInput == undefined) {
      this.supplierInput = this.translationGet.supplier;
    }
    if (this.priceInput == undefined) {
      this.priceInput = this.translationGet.price;
    }
    this.inven.updateTranslationEdit(this.translationGet.supply_code, this.nameInput, this.supplierInput, this.priceInput);
  }


  onDelete() {
    if (!this.confirm) {
      this.confirm = true;
      return;
    }

    if (this.confirmInput === 'yes' || this.confirmInput === 'Yes') {
      this.inven.deleteTranslation(this.id);
      this.router.navigate(['/translation']);
    }
  }
}
