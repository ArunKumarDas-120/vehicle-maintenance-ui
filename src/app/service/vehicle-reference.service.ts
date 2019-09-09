import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { VehicleCompany } from '../model/vehicle-company';
import { Observable } from 'rxjs';
import { VehicleModel } from '../model/vehicle-model';
import { VehiclePartSchedule } from '../model/vehicle-part-schedule';

@Injectable({
  providedIn: 'root'
})
export class VehicleReferenceService {

  private vehicleCompanyURL: string = "http://localhost:4000/company/";
  private vehicleModelURL: string = "http://localhost:4000/model/";
  private vehicleSchdeuleURL: string = "http://localhost:4000/schedule/";
  constructor(private httpClient: HttpClient) { }

  public getCompanies(): Observable<VehicleCompany[]> {
    return this.httpClient.get<VehicleCompany[]>(this.vehicleCompanyURL + "getall");
  }

  public getModels(companyName: String): Observable<VehicleModel[]> {
    return this.httpClient.get<VehicleModel[]>(this.vehicleModelURL + companyName);
  }

  public getScheduleList(companyName: String, modelName: String): Observable<VehiclePartSchedule[]> {
    return this.httpClient.get<VehiclePartSchedule[]>(this.vehicleSchdeuleURL + modelName + "/" + companyName);
  }
}
