import { PartMaintenance } from './part-maintenance';

export class VehicleInfoTo {
    vehicleNumber: String;
    model: String;
    company: String;
    dailyRunningInKM: number;
    userId: number;
    partMaintenanceTask?: PartMaintenance[] = [];
    constructor() {

    }
}
