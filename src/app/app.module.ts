import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterScheduleComponent } from './components/add/register-schedule.component';
import { VehicleReferenceService } from './service/vehicle-reference.service';
import { VehicleScheduleService } from './service/vehicle-schedule.service';
import { ModalModule } from './modal/modal.module';
import { HomeComponent } from './components/home/home.component';
import { ModifyScheduleComponent } from './components/edit/modify-schedule.component';
import { ToastComponent } from './components/toast/toast.component';
import { DateValidator } from './validator/date-validator.directive';
import { LoginComponent } from './components/login/login.component';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  declarations: [AppComponent, RegisterScheduleComponent,
    HomeComponent, ModifyScheduleComponent,
    ToastComponent, DateValidator, LoginComponent, MessageComponent],
  imports: [BrowserModule, AppRoutingModule,
    HttpClientModule, FormsModule,
    ModalModule, BrowserAnimationsModule],
  providers: [VehicleReferenceService, VehicleScheduleService],
  bootstrap: [AppComponent],
  entryComponents: [ModifyScheduleComponent, RegisterScheduleComponent]
})
export class AppModule { }
