const ForecastService =  {
    async getConsumption(){
      return await fetch('http://192.168.2.171:5000/forecast/consumption')
        .then(res => res.json())
        .then(res =>{
          return res.consumption_forecast
        })
    },
    async getGeneration(){
      return await fetch('http://192.168.2.171:5000/forecast/generation')
        .then(res => res.json())
        .then(res =>{
          return res.generation_forecast
        })
    },
  
    async getFlexibility(){
      return await fetch('http://192.168.2.171:5000/forecast/flexibility')
        .then(res => res.json())
        .then(res =>{
          return res.flexibility_forecast
        })
    },
  }
  export default ForecastService;
  