import { Component, OnInit } from '@angular/core';

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

    async ngOnInit(){
        async function getCommunity(): Promise<string[]>{
            return await fetch('http://192.168.2.171:5000/community')
              .then(res => res.json())
              .then(res =>{
                return res.community
              })
        }
        var participantsData = await getCommunity()

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
        async function getParticipant(): Promise<string[]>{
            var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJOYW1lIjoiTW9kYXIgSG91c2UgTHVpcyIsIkxpc3Qgb2YgUmVzb3VyY2VzIjpbeyJ0ZXh0IjoiSW9UXzEiLCJ0aUNsYXNzZXMiOlsidGktdmFsaWQiXX0seyJ0ZXh0IjoiSW9UXzIiLCJ0aUNsYXNzZXMiOlsidGktdmFsaWQiXX0seyJ0ZXh0IjoiSW9UXzMiLCJ0aUNsYXNzZXMiOlsidGktdmFsaWQiXX1dLCJEYXRhIEFnZ3JlZ2F0aW9uIjoiaW5kaXZpZHVhbCIsIlRpbWUgQWdncmVnYXRpb24iOiJyZWFsdGltZSIsIkVtYmFyZ28gUGVyaW9kIjoiMCIsImV4cCI6MTcwNDAxOTQxMH0.pj2fBXqrfY9KVKezi7TU02uGDqO86dVOMB3Oslj5S4o';
            if (item.name == "LeftSideBuildingPower"){
              token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoicmFmYWVsIiwiTGlzdCBvZiBSZXNvdXJjZXMiOiJyYWZhZWwiLCJEYXRhIEFnZ3JlZ2F0aW9uIjoicmFmYWVsIiwiVGltZSBBZ2dyZWdhdGlvbiI6InJhZmFlbCIsIkVtYmFyZ28gUGVyaW9kIjoicmFmYWVsIiwiZXhwIjoxNzIwMDEwODQwfQ.xEUvr4LnUhsbjKtfnq7DgOEEu3pXEJBfCxX05yIMMZ0";
            } else if (item.name == 'RightSideBuildingPower'){
              token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoicmFmYWVsIiwiTGlzdCBvZiBSZXNvdXJjZXMiOiJyYWZhZWwiLCJEYXRhIEFnZ3JlZ2F0aW9uIjoicmFmYWVsIiwiVGltZSBBZ2dyZWdhdGlvbiI6InJhZmFlbCIsIkVtYmFyZ28gUGVyaW9kIjoicmFmYWVsIiwiZXhwIjoxNzE5NzQ0NDE3fQ.Dzz5-JyYVL5jqO9jYFFUmAUV3jtGKIIWD9E7RM5kjP8'
            } else if (item.name == 'HousePedroPower'){
              token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJOYW1lIjoiTW9kYXIgSG91c2UgUGVkcm8iLCJMaXN0IG9mIFJlc291cmNlcyI6W3sidGV4dCI6IklvVF8xIiwidGlDbGFzc2VzIjpbInRpLXZhbGlkIl19LHsidGV4dCI6IklvVF8yIiwidGlDbGFzc2VzIjpbInRpLXZhbGlkIl19LHsidGV4dCI6IklvVF8zIiwidGlDbGFzc2VzIjpbInRpLXZhbGlkIl19XSwiRGF0YSBBZ2dyZWdhdGlvbiI6ImluZGl2aWR1YWwiLCJUaW1lIEFnZ3JlZ2F0aW9uIjoicmVhbHRpbWUiLCJFbWJhcmdvIFBlcmlvZCI6IjAiLCJleHAiOjE3MDQwMTkxMjV9.GXeJC05vDTarml0FMOfz-jKfms1FRkEel7WdEOAahGo'
            }
            return await fetch(item.uri+'/iots?token='+token)
              .then(res => res.json())
              .then(res =>{
                return res.iots
              })
        }
        var participantData = await getParticipant()

        var json = [];
        for (const iot of participantData) {
            json.push({name:iot['name'],type:iot['type']})
        }
        
        this.table2 = json
      }
}
