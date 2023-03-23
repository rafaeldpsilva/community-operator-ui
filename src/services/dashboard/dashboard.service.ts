import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  async getConsumption(): Promise<number[]>{
    return await fetch('http://192.168.2.171:5000/building/total')
      .then(res => res.json())
      .then(res =>{
        return [Math.round(res.consumption),Math.round(res.generation),Math.round(res.flexibility)]
      })
  }
  async getMembers(): Promise<number>{
    return await fetch('http://192.168.2.171:5000/community')
      .then(res => res.json())
      .then(res =>{
        return res.community.length
      })
  }
  async getHistoric(): Promise<object>{
    return await fetch('http://192.168.2.171:5000/historic/total')
      .then(res => res.json())
      .then(res =>{
        return [res.hours, res.consumption, res.generation, res.flexibility]
      })
  }
}
