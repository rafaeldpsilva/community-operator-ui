const DemandResponseService =  {
  async getLastDREvent(){
    return await fetch('http://192.168.2.171:5000/demandresponse/last')
      .then(res => res.json())
      .then(res =>{
        return res
      })
  },
  async getIotForecast(){
    return await fetch('http://192.168.2.171:5000/demandresponse/forecast')
      .then(res => res.json())
      .then(res =>{
        return res.iots_flexibility_forecast
      })
  },
  
  async getDRO(){
    return await fetch('http://192.168.2.171:5000/demandresponse/dro')
      .then(res => res.json())
      .then(res =>{
        return res
      })
  },

  async postRanking(iots_flexibility_forecast, difference){
    return await fetch('http://192.168.2.171:5000/demandresponse/ranking',{
        method: 'POST',
        body: JSON.stringify({"iots_flexibility_forecast":iots_flexibility_forecast, "difference": difference}),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then(res => res.json())
      .then(res =>{
        return [res.ranking, res.main_participants]
      })
  },

  async getUpcomingEvents(){
    return await fetch('http://192.168.2.171:5000/demandresponse/upcoming')
      .then(res => res.json())
      .then(res =>{
        return res.upcoming_events
      })
  },

  async getEvents(date){
    return await fetch('http://192.168.2.171:5000/demandresponse/events',{
      method: 'POST',
      body: JSON.stringify({"date": date.toISOString().split('T')[0]}),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(res =>{
        return res.events
      })
  },

  async getMetricsAverage(ranking){
    return await fetch('http://192.168.2.171:5000/demandresponse/metrics',{
      method: 'POST',
      body: JSON.stringify({"ranking":ranking}),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(res =>{
        return [res.names, res.metrics, res.datetime]
      })
  },

  async postInviteParticipants(consumption, generation, flexibility, dr_period, dr_energy, gs_period, gs_energy,participants_iots, ranking, time){
    return await fetch('http://192.168.2.171:5000/demandresponse/invite',{
      method: 'POST',
      body: JSON.stringify({"consumption":consumption, "generation": generation, "flexibility": flexibility, "dr_period": dr_period, "dr_energy": dr_energy, "gs_period": gs_period, "gs_energy": gs_energy, "participants_iots": participants_iots, "ranking": ranking, "event_time": time}),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(res =>{
        return res.responses
      })
  },
  
  async getMonitoring(event_time){
    return await fetch('http://192.168.2.171:5000/demandresponse/monitoring',{
      method: 'POST',
      body: JSON.stringify({"event_time": event_time}),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(res =>{
        return res.aggregated_balance
      })
  },
  
  async getDemandResponseEvent(event_time){
    return await fetch('http://192.168.2.171:5000/demandresponse/event',{
      method: 'POST',
      body: JSON.stringify({"event_time": event_time}),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(res =>{
        return res
      })
  },
}
export default DemandResponseService;