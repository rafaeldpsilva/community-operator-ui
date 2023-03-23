import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemandresponseService {

  constructor() { }

  async getLastDREvent(): Promise<object>{
    return await fetch('http://192.168.2.171:5000/demandresponse/last')
      .then(res => res.json())
      .then(res =>{
        return res
      })
  }

  async getIotForecast(): Promise<object>{
    return await fetch('http://192.168.2.171:5000/demandresponse/forecast')
      .then(res => res.json())
      .then(res =>{
        return res.iots_flexibility_forecast
      })
  }
  
  async getDRO(): Promise<object>{
    return await fetch('http://192.168.2.171:5000/demandresponse/dro')
      .then(res => res.json())
      .then(res =>{
        return [res.consumption, res.generation, res.flexibility, res.dr_energy, res.dr_period, res.gs_energy, res.gs_period]
      })
  }

  async postRanking(iots_flexibility_forecast): Promise<object>{
    return await fetch('http://192.168.2.171:5000/demandresponse/ranking',{
        method: 'POST',
        body: JSON.stringify({"iots_flexibility_forecast":iots_flexibility_forecast}),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then(res => res.json())
      .then(res =>{
        return [res.ranking, res.main_participants]
      })
  }

  async getMetricsAverage(): Promise<object>{
    return await fetch('http://192.168.2.171:5000/demandresponse/metrics')
      .then(res => res.json())
      .then(res =>{
        return [res.names, res.metrics, res.datetime]
      })
  }

  async postInviteParticipants(consumption, generation, flexibility, dr_period, dr_energy, gs_period, gs_energy,participants_iots, responses, ranking): Promise<object>{
    return await fetch('http://192.168.2.171:5000/demandresponse/invite')
      .then(res => res.json())
      .then(res =>{
        return res.responses
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
