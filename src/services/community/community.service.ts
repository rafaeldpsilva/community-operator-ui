import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor() { }

  async getMemberIots(uri, token): Promise<string[]>{
    return await fetch(uri+'/iots?token='+token)
      .then(res => res.json())
      .then(res =>{
        return res.iots
      })
  }

  async  getCommunity(): Promise<string[]>{
    return await fetch('http://192.168.2.171:5000/community')
      .then(res => res.json())
      .then(res =>{
        return res.community
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
