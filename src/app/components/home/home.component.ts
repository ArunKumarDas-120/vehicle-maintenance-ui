import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../modal/modal.service';
import { RegisterScheduleComponent } from '../add/register-schedule.component';
import { ModifyScheduleComponent } from '../edit/modify-schedule.component';
import { VehicleInfoTo } from '../../model/vehicle-info';
import { VehicleScheduleService } from '../../service/vehicle-schedule.service';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../../service/share-data.service';
import { Subscription } from 'rxjs';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  listOfVehicles: VehicleInfoTo[] = [];
  private dataSubscription: Subscription;

  constructor(private modal: ModalService,
    private scheduleService: VehicleScheduleService,
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.init();
    this.dataSubscription = this.sharedDataService.behaviour.subscribe((data: VehicleInfoTo) => {
      this.init();
    });
  }
  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
  public registerVehicleUI(): void {
    this.modal.openModal(RegisterScheduleComponent, {});
  }

  public editVechicleServiceUI(vehicleNumber: any): void {
    this.modal.openModal(ModifyScheduleComponent, { data: { vehicleId: vehicleNumber } });
  }
  public removeSchedule(vehicleNumber: string, userId: number) {
    this.scheduleService.removeSchedule(vehicleNumber, userId).subscribe((data: VehicleInfoTo) => {
      this.sharedDataService.publish(data);
      this.toastService.show("Remove Sucessfully", "info");
    },(error: any) =>{
		console.log(error);
      this.toastService.show("Error", "error");
    });
  }

  private init(): void {
    this.scheduleService.getAllSchedule(this.route.snapshot.paramMap.get('id')).subscribe((data: VehicleInfoTo[]) => {
      this.listOfVehicles.length = 0;
      this.listOfVehicles.push(...data);
    });
  }
}
