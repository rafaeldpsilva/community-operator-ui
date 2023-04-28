import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { DashboardService } from '../../../services/dashboard/dashboard.service'


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  public loading = false;
  public consumption = '0';
  public generation = '0';
  public flexibility = '0';
  public members = '0';
  public last_dr_datetime = '';

  public canvas : any;
  public ctx;
  public chartColor;
  public chartMonitoring;
    
  constructor(private dashboardService: DashboardService) { }

    async ngOnInit(){  
      this.loading = true;
      const numberMembers = await this.dashboardService.getMembers();
      this.members = numberMembers + '';

      
      const historic = await this.dashboardService.getHistoric();
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
      const arr = await this.dashboardService.getConsumption();
      this.consumption =arr[0] + ' W';
      this.generation =arr[1] + ' W';
      this.flexibility =arr[2] + ' W';
      this.loading = false;
      setInterval(async () => {
        this.loading = true;
        const arr = await this.dashboardService.getConsumption();
        this.consumption =arr[0] + ' W';
        this.generation =arr[1] + ' W';
        this.flexibility =arr[2] + ' W';
        this.loading = false
      }, 20000);
    }
}
