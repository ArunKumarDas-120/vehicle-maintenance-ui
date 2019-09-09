import { Notify } from './notify.enum';

export class PartMaintenance {
    taskId?: number;
    vehicleNumber?: string;
    nextChangeDate?: Date;
    lastChangedDate: Date;
    taskName: string;
    changeAfter: number;
    notify: Notify;
    constructor(){
        
    }
}
