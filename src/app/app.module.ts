import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TraywindowComponent } from './traywindow/traywindow.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MainComponent } from './main/main.component';
import { TaskService } from './task.service';
import { DurationPipe } from './core/duration.pipe';
import { ElectronService } from './core/electron.service';


@NgModule({
  declarations: [
    AppComponent,
    TraywindowComponent,
    MainComponent,
    DurationPipe,
  ],
  imports: [
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    TaskService,
    ElectronService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
