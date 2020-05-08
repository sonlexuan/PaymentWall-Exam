import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiService } from './services/api.service';
import { AuthenticateInterceptor } from './interceptors/authenticate.interceptor';

import { NgxMaskModule, IConfig } from 'ngx-mask';
const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticateInterceptor, multi: true },
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
