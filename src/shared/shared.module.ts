import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedRoutingModule } from './shared-routing.module';

import { SideNavBarComponent } from './components/layouts/side-nav-bar/side-nav-bar.component';
import { AddressCepComponent } from './components/address-cep/address-cep.component';

// used to create fake backend
import { fakeBackendProvider } from './helpers/fake-backend';

import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { HeaderUserAreaComponent } from './components/layouts/header-user-area/header-user-area.component';

@NgModule({
  declarations: [
    SideNavBarComponent,
    AddressCepComponent,
    HeaderUserAreaComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    SideNavBarComponent,
    AddressCepComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    //provide used to create fake backend
    fakeBackendProvider
  ]
})
export class SharedModule { }
