import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './components/shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { CocinaModule } from './components/cocina/cocina.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { ComedorModule } from './components/comedor/comedor.module';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CocinaModule,
    DashboardModule,
    ComedorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
