import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../../../services/community/community.service'

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{
    public table1;
    public table2;
    public participant;
    
    constructor(private communityService: CommunityService) { }
    
    async ngOnInit(){
        var participantsData = await this.communityService.getCommunity();

        var json = [];
        for (const item of participantsData) {
            json.push({name:item['name'],type:item['type'],uri:item['uri'],method:item['method']})
        }
        
        this.table1 = json
        this.participant = this.table1[0]['name']
        this.onRowClick(this.table1[0])
        
    }

    async onRowClick(item: any) {
      this.participant = item.name
      var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ29tbXVuaXR5IE9wZXJhdG9yIiwibGlzdF9vZl9yZXNvdXJjZXMiOlsiYWdncmVnYXRlZCIsImRpc2NyZXRlIiwiY29tbXVuaXR5X21hbmFnZXIiLCJhZG1pbiJdLCJkYXRhX2FnZ3JlZ2F0aW9uIjoiYWxsIiwidGltZV9hZ2dyZWdhdGlvbiI6ImFsbCIsImVtYmFyZ29fcGVyaW9kIjoiMTIzNTEyMyIsImV4cCI6MTcxMzU0MDk4Mn0.Mn7NycJse-gptdVe7_9Ozu218Q2JZ_IfoQqVpjMRQx8';
      if (item.name == "LeftSideBuildingPower"){
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ29tbXVuaXR5IE9wZXJhdG9yIiwibGlzdF9vZl9yZXNvdXJjZXMiOlsiYWdncmVnYXRlZCIsImRpc2NyZXRlIiwiY29tbXVuaXR5X21hbmFnZXIiLCJhZG1pbiJdLCJkYXRhX2FnZ3JlZ2F0aW9uIjoiYWxsIiwidGltZV9hZ2dyZWdhdGlvbiI6ImFsbCIsImVtYmFyZ29fcGVyaW9kIjoiMTIzNTEyMyIsImV4cCI6MTcxMzU0MDk4Mn0.Mn7NycJse-gptdVe7_9Ozu218Q2JZ_IfoQqVpjMRQx8";
      } else if (item.name == 'RightSideBuildingPower'){
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ29tbXVuaXR5IE9wZXJhdG9yIiwibGlzdF9vZl9yZXNvdXJjZXMiOlsiYWdncmVnYXRlZCIsImRpc2NyZXRlIiwiY29tbXVuaXR5X21hbmFnZXIiLCJhZG1pbiJdLCJkYXRhX2FnZ3JlZ2F0aW9uIjoiYWxsIiwidGltZV9hZ2dyZWdhdGlvbiI6ImFsbCIsImVtYmFyZ29fcGVyaW9kIjoiMTIzNTEyMyIsImV4cCI6MTcxMzU0MDk4Mn0.Mn7NycJse-gptdVe7_9Ozu218Q2JZ_IfoQqVpjMRQx8';
      } else if (item.name == 'HousePedroPower'){
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ29tbXVuaXR5IE9wZXJhdG9yIiwibGlzdF9vZl9yZXNvdXJjZXMiOlsiYWdncmVnYXRlZCIsImRpc2NyZXRlIiwiY29tbXVuaXR5X21hbmFnZXIiLCJhZG1pbiJdLCJkYXRhX2FnZ3JlZ2F0aW9uIjoiYWxsIiwidGltZV9hZ2dyZWdhdGlvbiI6ImFsbCIsImVtYmFyZ29fcGVyaW9kIjoiMTIzNTEyMyIsImV4cCI6MTcxMzU0MDk4Mn0.Mn7NycJse-gptdVe7_9Ozu218Q2JZ_IfoQqVpjMRQx8';
      }
      var participantData = await this.communityService.getMemberIots(item.uri, token)

      var json = [];
      for (const iot of participantData) {
          json.push({name:iot['name'],type:iot['type']})
      }
      
      this.table2 = json
    }
}
