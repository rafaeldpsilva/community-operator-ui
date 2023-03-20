import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  public consumption = '0';
  public generation = '0';
  public flexibility = '0';
  public members = '0';
  public last_dr_datetime = '';

  public canvas : any;
  public ctx;
  public chartColor;
  public chartMetrics;
  public chartMonitoring;
    async getConsumption(): Promise<number[]>{
      return await fetch('http://192.168.2.171:5000/building/total')
        .then(res => res.json())
        .then(res =>{
          return [Math.round(res.consumption),Math.round(res.generation),Math.round(res.flexibility)]
        })
    }
    async loopWithDelay() {
        const arr = await this.getConsumption();
        this.consumption =arr[0] + ' W';
        this.generation =arr[1] + ' W';
        this.flexibility =arr[2] + ' W';
    }
  
    async ngOnInit(){
      async function getHistoric(): Promise<object>{
        return await fetch('http://192.168.2.171:5000/historic/total')
          .then(res => res.json())
          .then(res =>{
            return [res.hours, res.consumption, res.generation, res.flexibility]
          })
      }

      const historic = await getHistoric();
      this.chartColor = "#FFFFFF";

      this.canvas = document.getElementById("chartMonitoring");
      this.ctx = this.canvas.getContext("2d");
      this.chartMonitoring = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: historic[0],
          datasets: [{
            borderColor: "#51cbce",
            backgroundColor: "transparent",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: historic[1],
            label: 'consumption'
          },
          {
              borderColor: "#6bd098",
              backgroundColor: "transparent",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: historic[2],
              label: 'generation'
            },
            {
              borderColor: "#ef8157",
              backgroundColor: "transparent",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: historic[3],
              label: 'flexibility'
            }
          ]
        },
        options: {
          legend: {
            display: false
          },

          tooltips: {
            enabled: true
          },

          scales: {
            yAxes: [{

              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: false,
                maxTicksLimit: 5,
                //padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "#ccc",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent",
                display: false,
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f"
              }
            }]
          },
        }
      });


      async function getMetricsAverage(): Promise<object>{
        return await fetch('http://192.168.2.171:5000/demandresponse/metrics')
          .then(res => res.json())
          .then(res =>{
            return [res.names, res.metrics, res.datetime]
          })
      }
      const metricsAverage = await getMetricsAverage();
      this.last_dr_datetime = metricsAverage[2];

      this.canvas = document.getElementById("chartMetrics");
      this.ctx = this.canvas.getContext("2d");
      this.chartMetrics = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: metricsAverage[0],
          datasets: [{
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: [
              '#e3e3e3',
              '#4acccd',
              '#fcc468',
              '#ef8157'
            ],
            borderWidth: 0,
            data: metricsAverage[1]
          }]
        },

        options: {

          legend: {
            display: false
          },

          pieceLabel: {
            render: 'percentage',
            fontColor: ['white'],
            precision: 2
          },

          tooltips: {
            enabled: true
          },

          scales: {
            yAxes: [{

              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false,
              }
            }]
          },
        }
      });
      
      async function getDro(): Promise<object>{
        return await fetch('http://192.168.2.171:5000/demandresponse/dro')
          .then(res => res.json())
          .then(res =>{
            return [res.consumption, res.generation, res.flexibility, res.dr_energy, res.dr_period, res.gs_energy, res.gs_period]
          })
      }

      const dro = await getDro()
      var speedCanvas = document.getElementById("speedChart");

      var consumption = {
        data: dro[0],
        fill: false,
        borderColor: '#51cbce',
        backgroundColor: 'transparent'
      };

      var generation = {
        data: dro[1],
        fill: false,
        borderColor: '#6bd098',
        backgroundColor: 'transparent'
      };

      var flexibility = {
        data: dro[2],
        fill: false,
        borderColor: '#ef8157',
        backgroundColor: 'transparent'
      };
      var dr_data = []
      
      let j = 0;
      console.log(dro[4])
      for (const index of dro[4]) {
        if (index!=j){
          for (let i = 0; i < (index-j); i++) {
            dr_data.push(NaN);
          }
        }
        j=index+1;
        dr_data.push(dro[1][index])
      }

      var gs_data = []
      j = 0;
      console.log(dro[6])
      for (const index of dro[6]) {
        if (index!=j){
          for (let i = 0; i < (index-j); i++) {
            gs_data.push(NaN);
          }
        }
        j=index+1;
        gs_data.push(dro[1][index])
      }

      var dr = {
        data: dr_data,
        fill: false,
        borderColor: '#51cbce',
        backgroundColor: 'transparent',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      };

      var gs = {
        data: gs_data,
        fill: false,
        borderColor: '#6bd098',
        backgroundColor: 'transparent',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      };

      var speedData = {
        labels: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
        datasets: [consumption, generation, flexibility, dr, gs]
      };

      var chartOptions = {
        legend: {
          display: false,
          position: 'top'
        }
      };

      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        hover: false,
        data: speedData,
        options: chartOptions
      });
      
      async function getConsumption(): Promise<number[]>{
        return await fetch('http://192.168.2.171:5000/building/total')
          .then(res => res.json())
          .then(res =>{
            return [Math.round(res.consumption),Math.round(res.generation),Math.round(res.flexibility)]
          })
      }
      const arr = await getConsumption();
      this.consumption =arr[0] + ' kWh';
      this.generation =arr[1] + ' kWh';
      this.flexibility =arr[2] + ' kWh';

      async function getMembers(): Promise<number>{
        return await fetch('http://192.168.2.171:5000/community')
          .then(res => res.json())
          .then(res =>{
            return res.community.length
          })
      }
      
      const numberMembers = await getMembers();
      this.members = numberMembers + '';
      
      setInterval(() => {
        this.loopWithDelay();
      }, 60000);
    }
}
