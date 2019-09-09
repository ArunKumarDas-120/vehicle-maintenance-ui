import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleInfoTo } from '../model/vehicle-info';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleScheduleService {

  private scheduleUrl: string = "http://localhost:4001/schedule/";
  constructor(private httpClient: HttpClient) { }

  public saveSchedule(scheduleIfo: VehicleInfoTo): Observable<VehicleInfoTo> {
    return this.httpClient.post<VehicleInfoTo>(this.scheduleUrl + "create", scheduleIfo);
  }

  public removeSchedule(vehicleNumber: string, userId: number): Observable<VehicleInfoTo> {
    return this.httpClient.delete<VehicleInfoTo>(this.scheduleUrl + "delete/"+ vehicleNumber + "/" + userId);
  }

  public getAllSchedule(userId: any): Observable<VehicleInfoTo[]> {
    return this.httpClient.get<VehicleInfoTo[]>(this.scheduleUrl + userId);
  }
  public getScheduleInfoForVehicle(vehicheNumber: string): Observable<VehicleInfoTo> {
    return this.httpClient.get<VehicleInfoTo>(this.scheduleUrl + "vehicle/" + vehicheNumber);
  }
}
