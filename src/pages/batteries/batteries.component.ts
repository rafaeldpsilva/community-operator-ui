import { Component, OnInit } from '@angular/core';
import { BatteryService } from '../../../services/battery/battery.service'

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'batteries-cmp',
    moduleId: module.id,
    templateUrl: 'batteries.component.html'
})

export class BatteriesComponent implements OnInit{
    public table1;
    public table2;
    public participant;
    
    constructor(private batteryService: BatteryService) { }
    
    async ngOnInit(){
        var batteries = await this.batteryService.getCommunityBatteries();
        this.table1 = batteries
    }
}
