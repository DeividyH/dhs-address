import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddressComponent } from './address/address.component';
import { CreateOrEditAddressComponent } from './address/create-or-edit-address/create-or-edit-address.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddressComponent,
    CreateOrEditAddressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  entryComponents: [
    CreateOrEditAddressComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
