const url = 'http://192.168.2.171:5000'
const CommunityService = {
    async getMemberIots(uri, token){
        return await fetch(uri+'/iots?token='+token)
          .then(res => res.json())
          .then(res =>{
            return res.iots
          })
      },
    
      async  getCommunity(){
        return await fetch(url + '/community')
          .then(res => res.json())
          .then(res =>{
            return res.community
          })
      },
    
      async getMembers(){
        return await fetch(url + '/community')
          .then(res => res.json())
          .then(res =>{
            return res.community.length
          })
      },
    
      async getHistoric(){
        return await fetch(url + '/historic/total')
          .then(res => res.json())
          .then(res =>{
            return [res.hours, res.consumption, res.generation, res.flexibility]
          })
      },
}
export default CommunityService;
