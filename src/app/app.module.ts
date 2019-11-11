import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSelectModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { GoogleChartsModule } from 'angular-google-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StockManagementComponent } from './components/stock-management/stock-management.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InventoryRecordComponent } from './components/inventory-record/inventory-record.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { InvenService } from './services/inven.service';
import { InventoryComponent } from './components/inventory/inventory.component';
import { TranslationComponent } from './components/translation/translation.component';

import { DatePipe } from '@angular/common';
import { MasterComponent } from './components/master/master.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddRestComponent } from './components/add-rest/add-rest.component';
import { EditInventoryComponent } from './components/edit-inventory/edit-inventory.component';
import { EditTranslationComponent } from './components/edit-translation/edit-translation.component';
import { SummaryComponent } from './components/summary/summary.component';
import { Chart2Component } from './components/chart2/chart2.component';
import { Chart3Component } from './components/chart3/chart3.component';
import { EditTransactionComponent } from './components/edit-transaction/edit-transaction.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'stock-management', component: StockManagementComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'transaction', component: TransactionComponent},
  {path: 'inventory', component: InventoryComponent},
  {path: 'translation', component: TranslationComponent},
  {path: 'master', component: MasterComponent},
  {path: 'editInventory/:id', component: EditInventoryComponent},
  {path: 'editTranslation/:id', component: EditTranslationComponent},
  {path: 'editTransaction/:id', component: EditTransactionComponent},
  {path: 'summary', component: SummaryComponent},
  {path: 'chart/:id', component: Chart2Component}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    ProfileComponent,
    InventoryRecordComponent,
    TransactionComponent,
    InventoryComponent,
    TranslationComponent,
    MasterComponent,
    AddItemComponent,
    StockManagementComponent,
    AddEmployeeComponent,
    AddRestComponent,
    EditInventoryComponent,
    EditTranslationComponent,
    SummaryComponent,
    Chart2Component,
    Chart3Component,
    EditTransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    GoogleChartsModule.forRoot()
  ],
  providers: [
    ValidateService,
    AuthService,
    InvenService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
