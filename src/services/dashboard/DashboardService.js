const url = 'http://192.168.2.171:5000'
const DashboardService = {
    async getEnergyValues() {
        return await fetch(url + '/community/total')
            .then(res => res.json())
            .then(res => {
                return [Math.round(res.consumption), Math.round(res.generation), Math.round(res.flexibility)];
            }).catch(error => {
                console.error('Error fetching energy values:', error);
                return [0, 0, 0];
            });
    },
    async getMembers() {
        return await fetch(url + '/community')
            .then(res => res.json())
            .then(res => {
                return res.community.length;
            }).catch(error => {
                console.error('Error fetching members:', error);
                return 0;
            });
    },
    async getEnergyHistoric() {
        return await fetch(url + '/historic/total')
            .then(res => res.json())
            .then(res => {
                return [res.hours, res.consumption, res.generation, res.flexibility];
            }).catch(error => {
                console.error('Error fetching historic:', error);
                return [[0], [0], [0], [0]];
            });
    }
}
export default DashboardService;
