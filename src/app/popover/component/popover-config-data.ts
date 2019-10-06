import { TemplateRef } from '@angular/core';

export class PopoverConfigData {

    template: TemplateRef<any>;
    styleClasses?: string;
    data?: [{ key: string, value: any }]

    constructor(template: TemplateRef<any>, styleClasses?: string, data?: [{ key: string, value: any }]) {
        this.template = template;
        this.styleClasses = styleClasses;
        this.data = data;
    }
}