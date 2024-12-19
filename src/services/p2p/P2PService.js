const url = 'http://192.168.2.171:5000'
const P2PService = {
    async getBidding(){
        return await fetch(url+'/p2p/bidding')
          .then(res => res.json())
          .then(res =>{
            return res
          })
      },
}
export default P2PService;
