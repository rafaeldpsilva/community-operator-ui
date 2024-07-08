const url = 'http://192.168.2.171:5000'
const DemandResponseService =  {
  async getLastDREvent(){
    return await fetch(url + '/demandresponse/last')
      .then(res => res.json())
      .then(res =>{
        return res
      })
  },
  async getIotForecast(){
    return await fetch(url + '/demandresponse/forecast')
      .then(res => res.json())
      .then(res =>{
        return res.iots_flexibility_forecast
      })
  },

  async getDRO(){
    return await fetch(url + '/demandresponse/dro')
      .then(res => res.json())
      .then(res =>{
        return res
      })
  },

  async getRanking(){
    return await fetch(url + '/demandresponse/ranking')
      .then(res => res.json())
      .then(res =>{
        return res
      })
  },

  async getUpcomingEvents(){
    return await fetch(url + '/demandresponse/upcoming')
      .then(res => res.json())
      .then(res =>{
        return res.upcoming_events
      })
  },

  async getEvents(date){
    return await fetch(url + '/demandresponse/events',{
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
    return await fetch(url + '/demandresponse/metrics')
      .then(res => res.json())
      .then(res =>{
        return res
      })
  },

  async postInviteParticipants(){
    return await fetch(url + '/demandresponse/invite',{
      method: 'POST'})
      .then(res => res.json())
      .then(res =>{
        return res
      })
  },
  async setEventHour(event_hour){
    return await fetch(url + '/demandresponse/event_hour',{
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
    return await fetch(url + '/demandresponse/monitoring')
      .then(res => res.json())
      .then(res =>{
        return res
      })
  },
  async getBenefits(){
    return await fetch(url + '/demandresponse/benefits')
      .then(res => res.json())
      .then(res =>{
        return res
      })
  },
  async getDemandResponseEvent(event_time){
    return await fetch(url + '/demandresponse/event',{
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
