import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BatteryService {

  constructor() { }

  async  getCommunityBatteries(): Promise<string[]>{
    return await fetch('http://192.168.2.171:5000/batteries')
      .then(res => res.json())
      .then(res =>{
        return res.batteries
      })
  }

  async  getBatteriesOptimization(): Promise<string[]>{
    return await fetch('http://192.168.2.171:5000/batteries/optimization')
      .then(res => res.json())
  }

  async  getBatteriesHistoric(): Promise<string[]>{
    return await fetch('http://192.168.2.171:5000/batteries/historic')
      .then(res => res.json())
  }
}
