import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Transaction } from '../models/transaction';
import { CategoryCode } from '../models/category_code';
import { Inventory } from '../models/inventory';
import { Restaurant } from '../models/restaurant';
import { Translation } from '../models/translation';
import { Name } from '../models/name';



@Injectable({
  providedIn: 'root'
})
export class InvenService {
  url = 'http://10.2.1.160:3000/';

  private transactions: Transaction[] = [];
  private transactionsUpdated = new Subject<Transaction[]>();

  private translations: Translation[] = [];
  private translationsUpdated = new Subject<Translation[]>();

  private restaurants: Restaurant[] = [];
  private restaurantsUpdated = new Subject<Restaurant[]>();

  private inventorys: Inventory[] = [];
  private inventorysUpdated = new Subject<Inventory[]>();

  private categoryCodes: CategoryCode[] = [];
  private categoryCodesUpdated = new Subject<CategoryCode[]>();

  private mvts: string[] = [];
  private mvtsUpdated = new Subject<string[]>();

  private names: Name[] = [];
  private namesUpdated = new Subject<Name[]>();

  private locations: string[] = [];
  private locaitonsUpdated = new Subject<string[]>();


  constructor(private http: HttpClient) { }

  getTransaction() {
    const newUrl = this.url + 'getTransaction';
    this.http
      .get<{ message: string; posts: any }>(
        newUrl
      )
      .pipe(map((itemData) => {
        return itemData.posts.map(item => {
          return {
            transId: item.transactions_id,
            supplier_code: item.Supplier_Code,
            pdi_code: item.PDI_Code,
            descrpt: item.Description,
            employee: item.Employee,
            mvt: item.Mvt,
            qty: item.Quantity,
            unit: item.Handling_Unit,
            location: item.Location,
            date: item.Created_Date,
            rest: item.Resturant
          };
        });
      }))
      .subscribe(transformedItems => {
        this.transactions = transformedItems;
        this.transactionsUpdated.next([...this.transactions]);
      });
  }

  getTransactionUpdateListener() {
    return this.transactionsUpdated.asObservable();
  }

// tslint:disable-next-line: variable-name
  addTransaction(transId: string, supplier_code: string, pdi_code: string, descrpt, employee, mvt, qty, unit, location, date, rest) {
    const transaction: Transaction = { transId, supplier_code, pdi_code, descrpt,
      employee, mvt, qty, unit, location, date, rest};
    let mess: string;
    this.http
      .post<{ message: string }>(this.url + 'postTransaction', transaction)
      .subscribe(responseData => {
        console.log(responseData.message);
        mess = responseData.message;
        this.transactions.push(transaction);
        this.transactionsUpdated.next([...this.transactions]);
      });
    return mess;
  }

  deleteTransaction(transId: string) {
    const update = [transId];
    this.http
      .post<{ message: string }>(this.url + 'deleteTransaction', update)
      .subscribe(responseData => {
        console.log(responseData.message);
      });
  }

  getTranslation() {
    const newUrl = this.url + 'getTranslation';
    this.http
      .get<{ message: string; posts: any }>(
        newUrl
      )
      .pipe(map((itemData) => {
        return itemData.posts.map(item => {
          return {
            translation_id: item.info_record_id,
            supply_code: item.Supply_Code,
            pdi_code: item.PDI_Code,
            descrpt: item.Description,
            supplier: item.Supplier,
            price: item.Price
          };
        });
      }))
      .subscribe(transformedItems => {
        this.translations = transformedItems;
        this.translationsUpdated.next([...this.translations]);
      });
  }

  getTranslationById(id: string) {
    const newUrl = this.url + 'getTranslation/' + id;
    return this.http.get<{ message: string; posts: any}>(newUrl);
  }

  getTranslationUpdateListener() {
    return this.translationsUpdated.asObservable();
  }

  addTranslation(translation_id: number, supply_code: string, pdi_code: string, descrpt: string, supplier: string, price: number) {
    const translation = { translation_id, pdi_code, supply_code, descrpt, supplier, price };
    this.http
      .post<{ message: string }>(this.url + 'postTranslation', translation)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.translations.push(translation);
        this.translationsUpdated.next([...this.translations]);
      });
  }

  updateTranslationEdit(supply_code: string, descrpt: string, supplier: string, price: number) {
    const update = [supply_code, descrpt, supplier, price];
    this.http
      .post<{ message: string }>(this.url + 'updateTranslationEdit', update)
      .subscribe(responseData => {
        console.log(responseData.message);
      });
  }

  deleteTranslation(supply_code: string) {
    const update = [supply_code];
    this.http
      .post<{ message: string }>(this.url + 'deleteTranslation', update)
      .subscribe(responseData => {
        console.log(responseData.message);
      });
  }

  getRestaurant() {
    const newUrl = this.url + 'getRestaurant';
    this.http
      .get<{ message: string; posts: any }>(
        newUrl
      )
      .pipe(map((itemData) => {
        return itemData.posts.map(item => {
          return {
            no: item.No,
            rest: item.Restaurant
          };
        });
      }))
      .subscribe(transformedItems => {
        this.restaurants = transformedItems;
        this.restaurantsUpdated.next([...this.restaurants]);
      });
  }

  getRestaurantUpdateListener() {
    return this.restaurantsUpdated.asObservable();
  }

  addRestaurant(no: number, rest: string) {
    const restau: Restaurant = { no, rest };
    this.http
      .post<{ message: string }>(this.url + 'postRestaurant', restau)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.restaurants.push(restau);
        this.restaurantsUpdated.next([...this.restaurants]);
      });
  }

  deleteRestaurant(name: string) {
    const update = [name];
    this.http
      .post<{ message: string }>(this.url + 'deleteRestaurant', update)
      .subscribe(responseData => {
        console.log(responseData.message);
      });
  }

  getInventory() {
    const newUrl = this.url + 'getInventory';
    this.http
      .get<{ message: string; posts: any }>(
        newUrl
      )
      .pipe(map((itemData) => {
        return itemData.posts.map(item => {
          return {
            pdi_code: item.PDI_Code,
            ctg_code: item.Ctg_code,
            item: item.Item,
            ctg: item.Category,
            descrpt: item.Description,
            supplier: item.Supplier,
            unit: item.Handling_Unit,
            location: item.Location,
            qty: item.Qty,
            price: item.Price
          };
        });
      }))
      .subscribe(transformedItems => {
        this.inventorys = transformedItems;
        this.inventorysUpdated.next([...this.inventorys]);
      });
  }

  getInventoryById(id: string) {
    const newUrl = this.url + 'getInventory/' + id;
    return this.http.get<{ message: string; posts: any}>(newUrl);
  }

  getInventoryUpdateListener() {
    return this.inventorysUpdated.asObservable();
  }

  updateInventory(qty: number, pdi_code: string) {
    const update = [qty, pdi_code];
    this.http
      .post<{ message: string }>(this.url + 'updateInventory', update)
      .subscribe(responseData => {
        console.log(responseData.message);
      });
  }

  updateInventoryEdit(descrpt: string, supplier: string, unit: string, location: string, qty: number, price: number, pdi_code: string) {
    const update = [descrpt, supplier, unit, location, qty, price, pdi_code];
    this.http
      .post<{ message: string }>(this.url + 'updateInventoryEdit', update)
      .subscribe(responseData => {
        console.log(responseData.message);
      });
  }

  addInventory(pdi_code: string, ctg_code: string, item: string, ctg: string, descrpt: string, supplier: string,
               unit: string, location: string, qty: number, price: number) {
    const inventory: Inventory = { pdi_code, ctg_code, item, ctg, descrpt, supplier, unit, location, qty, price };
    this.http
      .post<{ message: string }>(this.url + 'postInventory', inventory)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.inventorys.push(inventory);
        this.inventorysUpdated.next([...this.inventorys]);
      });
  }

  deleteInventory(pdi_code: string) {
    const update = [pdi_code];
    this.http
      .post<{ message: string }>(this.url + 'deleteInventory', update)
      .subscribe(responseData => {
        console.log(responseData.message);
      });
  }

  getCategory() {
    const newUrl = this.url + 'getCategoryCode';
    this.http
      .get<{ message: string; posts: any }>(
        newUrl
      )
      .pipe(map((itemData) => {
        return itemData.posts.map(item => {
          return {
            category: item.Category,
            ctg_code: item.Ctg_code
          };
        });
      }))
      .subscribe(transformedItems => {
        this.categoryCodes = transformedItems;
        this.categoryCodesUpdated.next([...this.categoryCodes]);
      });
  }

  getCategoryUpdateListener() {
    return this.categoryCodesUpdated.asObservable();
  }

  getMvt() {
    const newUrl = this.url + 'getMvt';
    this.http
      .get<{ message: string; posts: any }>(
        newUrl
      ).subscribe(transformedItems => {
        this.mvts = transformedItems.posts;
        this.mvtsUpdated.next([...this.mvts]);
      });
  }

  getMvtUpdateListener() {
    return this.mvtsUpdated.asObservable();
  }

  getName() {
    const newUrl = this.url + 'getName';
    this.http
      .get<{ message: string; posts: any }>(
        newUrl
      )
      .pipe(map((itemData) => {
        return itemData.posts.map(item => {
          return {
            name: item.Name
          };
        });
      }))
      .subscribe(transformedItems => {
        this.names = transformedItems;
        this.namesUpdated.next([...this.names]);
      });
  }

  getNameUpdateListener() {
    return this.namesUpdated.asObservable();
  }

  addName(name: string) {
    const Name: Name = { name };
    console.log(Name.name);
    this.http
      .post<{ message: string }>(this.url + 'postName', Name)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.names.push(Name);
        this.namesUpdated.next([...this.names]);
      });
  }

  deleteName(name: string) {
    const update = [name];
    this.http
      .post<{ message: string }>(this.url + 'deleteName', update)
      .subscribe(responseData => {
        console.log(responseData.message);
      });
  }

  getLocation() {
    const newUrl = this.url + 'getLocation';
    this.http
      .get<{ message: string; posts: any }>(
        newUrl
      ).subscribe(transformedItems => {
        this.locations = transformedItems.posts;
        this.locaitonsUpdated.next([...this.locations]);
      });
  }

  getLocationUpdateListener() {
    return this.mvtsUpdated.asObservable();
  }
}
