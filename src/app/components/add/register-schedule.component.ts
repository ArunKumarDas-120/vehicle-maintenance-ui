import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit, Renderer2, ViewChild } from '@angular/core';
import { VehicleReferenceService } from '../../service/vehicle-reference.service';
import { VehicleCompany } from '../../model/vehicle-company';
import { VehicleModel } from '../../model/vehicle-model';
import { VehiclePartSchedule } from '../../model/vehicle-part-schedule';
import { PartMaintenance } from '../../model/part-maintenance';
import { Notify } from '../../model/notify.enum';
import { ModalService } from '../../modal/modal.service';
import { VehicleScheduleService } from '../../service/vehicle-schedule.service';
import { VehicleInfoTo } from '../../model/vehicle-info';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SharedDataService } from '../../service/share-data.service';
import { ToastService } from '../toast/toast.service';
import { StorageService } from '../../service/storage.service';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-register-schedule',
  templateUrl: './register-schedule.component.html',
  styleUrls: ['./register-schedule.component.css'],
  animations: [
    trigger('addAnimation', [
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
export class RegisterScheduleComponent implements OnInit, AfterViewInit {

  @ViewChildren('registrationTab')
  private tabs: QueryList<ElementRef>;
  @ViewChildren('circle')
  private circletab: QueryList<ElementRef>;
  @ViewChild('prevBtn', { read: ElementRef, static: false })
  private previousButton: ElementRef;


  vehicleInfoTo: VehicleInfoTo = new VehicleInfoTo();
  companyList: VehicleCompany[] = [];
  modelList: VehicleModel[] = [];
  enableSubmit: boolean = false;
  private currentActiveTab: number = 0;

  constructor(private rendere: Renderer2,
    private vehiclieRefrenceService: VehicleReferenceService,
    private modalService: ModalService,
    private vehicleScheduleService: VehicleScheduleService,
    private storageService: StorageService,
    private sharedDataServicec: SharedDataService,
    private messageService: MessageService) {
  }

  ngOnInit() {
    this.vehiclieRefrenceService.getCompanies().subscribe((data: VehicleCompany[]) => {
      this.companyList.push(...data);
    });
  }
  ngAfterViewInit(): void {
    let currentTab: ElementRef = this.tabs.first;
    this.rendere.setStyle(currentTab.nativeElement, "display", "block");
    this.rendere.addClass(this.circletab.first.nativeElement, "active");
    this.vehicleInfoTo.userId = this.storageService.reteriveData("logedInuser");
  }
  public saveSchedule(): void {
    this.vehicleScheduleService.saveSchedule(this.vehicleInfoTo).subscribe((data: VehicleInfoTo) => {
      this.messageService.showMessage('Information', 'Registarion Successfull', "info");
      this.sharedDataServicec.publish(data);
      this.modalService.closeModal();
    }, (error: any) => {
      this.messageService.handleHttpError(error);
    });
  }

  public changeStep(step: number): void {

    if ((this.currentActiveTab > 0 || (this.currentActiveTab == 0 && step > 0)) &&
      (this.currentActiveTab < this.tabs.length - 1 || step < 0)) {
      this.currentActiveTab = this.currentActiveTab + step;
      this.fixCircle(this.currentActiveTab);
      if (this.currentActiveTab == this.tabs.length - 1) {
        this.vehicleInfoTo.partMaintenanceTask.length = 0;
        this.vehiclieRefrenceService.getScheduleList(this.vehicleInfoTo.company, this.vehicleInfoTo.model)
          .subscribe((data: VehiclePartSchedule[]) => {
            data.forEach((d: VehiclePartSchedule) => {
              let p = new PartMaintenance();
              p.taskName = d.scheduleName;
              p.changeAfter = d.changeAfterKm;
              p.notify = Notify.Y;
              this.vehicleInfoTo.partMaintenanceTask.push(p);
            });
          });
        this.toggleButtons(false);
      } else {
        this.toggleButtons(true);
      }
      this.tabs.forEach((item, index) => {
        if (index == this.currentActiveTab) {
          this.rendere.setStyle(item.nativeElement, "display", "block");
        } else {
          this.rendere.setStyle(item.nativeElement, "display", "none");
        }
      });

    }

  }

  public fetchModel(): void {
    this.modelList.length = 0;
    this.vehiclieRefrenceService.getModels(this.vehicleInfoTo.company).subscribe((data: VehicleModel[]) => {
      this.modelList.push(...data);
    });
  }

  private fixCircle(step: number): void {
    this.circletab.forEach((item, index) => {
      if (index == step) {
        this.rendere.addClass(item.nativeElement, "active");
      } else {
        this.rendere.removeClass(item.nativeElement, "active");
      }
    });
  }

  public close() {
    this.modalService.closeModal();
  }
  private toggleButtons(orginal: boolean): void {
    if (orginal) {
      this.rendere.setStyle(this.previousButton.nativeElement, "display", "none");
      this.enableSubmit = false;
      this.vehicleInfoTo.partMaintenanceTask.length = 0;
    } else {
      this.rendere.setStyle(this.previousButton.nativeElement, "display", "initial");
      this.enableSubmit = true;
    }
  }
}
