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

  async getRanking(){
    return await fetch('http://192.168.2.171:5000/demandresponse/ranking')
      .then(res => res.json())
      .then(res =>{
        return res
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

  async getMetricsAverage(){
    return await fetch('http://192.168.2.171:5000/demandresponse/metrics')
      .then(res => res.json())
      .then(res =>{
        return [res.names, res.metrics, res.datetime]
      })
  },

  async postInviteParticipants(){
    return await fetch('http://192.168.2.171:5000/demandresponse/invite',{
      method: 'POST'})
      .then(res => res.json())
      .then(res =>{
        return res
      })
  },
  async setEventHour(event_hour){
    return await fetch('http://192.168.2.171:5000/demandresponse/event_hour',{
      method: 'POST',
      body: JSON.stringify({"event_hour": event_hour}),
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
  async getMonitoring(){
    return await fetch('http://192.168.2.171:5000/demandresponse/monitoring')
      .then(res => res.json())
      .then(res =>{
        return res
      })
  },
  async getBenefits(){
    return await fetch('http://192.168.2.171:5000/demandresponse/benefits')
      .then(res => res.json())
      .then(res =>{
        return res
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
