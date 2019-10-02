import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../modal/modal.service';
import { ModalData } from '../../modal/modal-data';
import { VehicleScheduleService } from '../../service/vehicle-schedule.service';
import { VehicleInfoTo } from '../../model/vehicle-info';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SharedDataService } from '../../service/share-data.service';
import { MessageService } from '../../service/message.service';

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
    private messageService: MessageService,
    private sharedDataService: SharedDataService) {
    this.vehicle = new VehicleInfoTo();
  }

  ngOnInit() {
    this.scheduleService.getScheduleInfoForVehicle(this.config.data.vehicleId).subscribe((data: VehicleInfoTo) => {
      this.vehicle = data;
    }, (error: any) => {
      this.messageService.handleHttpError(error);
    });
  }

  public update(): void {
    this.scheduleService.saveSchedule(this.vehicle).subscribe((data: VehicleInfoTo) => {
      this.messageService.showMessage('Information','Updation Successfull', "info");
      this.sharedDataService.publish(data);
	  this.close();
    }, (error: any) => {
      this.messageService.handleHttpError(error);
    });
  }

  public close() {
    this.modalService.closeModal();
  }
}
