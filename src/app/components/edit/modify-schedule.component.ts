import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/modal/modal.service';
import { ModalData } from 'src/app/modal/modal-data';
import { VehicleScheduleService } from 'src/app/service/vehicle-schedule.service';
import { VehicleInfoTo } from 'src/app/model/vehicle-info';
import { ToastService } from '../toast/toast.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SharedDataService } from 'src/app/service/share-data.service';

@Component({
  selector: 'app-modify-schedule',
  templateUrl: './modify-schedule.component.html',
  styleUrls: ['./modify-schedule.component.css'],
  animations: [
    trigger('fadeAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-in')
      ]),
      transition(':leave',
        animate('600ms ease-out', style({ opacity: 0 })))
    ])
  ]
})
export class ModifyScheduleComponent implements OnInit {

  vehicle: VehicleInfoTo;

  constructor(private modalService: ModalService,
    private config: ModalData,
    private scheduleService: VehicleScheduleService,
    private toastService: ToastService,
    private sharedDataService: SharedDataService) {
    this.vehicle = new VehicleInfoTo();
  }

  ngOnInit() {
    this.scheduleService.getScheduleInfoForVehicle(this.config.data.vehicleId).subscribe((data: VehicleInfoTo) => {
      this.vehicle = data;
    }, (error: any) => {
      this.toastService.show(error.status, "error");
    });
  }

  public update(): void {
    this.scheduleService.saveSchedule(this.vehicle).subscribe((data: VehicleInfoTo) => {
      this.toastService.show('Updation Successfull', "info");
      this.sharedDataService.publish(data);
    }, (error: any) => {
      this.toastService.show(error.status, "error");
    });
  }

  public close() {
    this.modalService.closeModal();
  }
}
