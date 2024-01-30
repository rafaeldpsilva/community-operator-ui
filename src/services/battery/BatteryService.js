const BatteryService = {
  async getCommunityBatteries() {
    return await fetch('http://192.168.2.171:5000/batteries')
      .then(res => res.json())
      .then(res => {
        return res.batteries
      }).catch(error => {
        console.error('Error fetching energy values:', error);
        return [0, 0, 0];
      })
  },

  async getBatteriesTable() {
    return await fetch('http://192.168.2.171:5000/batteries/table')
      .then(res => res.json())
      .then(res => {
        return res
      }).catch(error => {
        console.error('Error fetching energy values:', error);
        return [];
      })
  },

  async getBatteriesOptimization() {
    return await fetch('http://192.168.2.171:5000/batteries/optimization')
      .then(res => res.json()).catch(error => {
        console.error('Error fetching energy values:', error);
        return [0, 0, 0];
      })
  },

  async getBatteriesHistoric() {
    return await fetch('http://192.168.2.171:5000/batteries/historic')
      .then(res => res.json()).catch(error => {
        console.error('Error fetching energy values:', error);
        return [0, 0, 0];
      })
  },
}
export default BatteryService;
