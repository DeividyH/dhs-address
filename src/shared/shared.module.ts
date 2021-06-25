import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { SideNavBarComponent } from './components/layouts/side-nav-bar/side-nav-bar.component';
import { AddressCepComponent } from './components/address-cep/address-cep.component';

@NgModule({
  declarations: [
    SideNavBarComponent,
    AddressCepComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    SideNavBarComponent,
    AddressCepComponent
  ]
})
export class SharedModule { }
