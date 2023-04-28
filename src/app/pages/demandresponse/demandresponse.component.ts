import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { DemandresponseService } from '../../../services/demandresponse/demandresponse.service'

@Component({
    selector: 'demandresponse-cmp',
    moduleId: module.id,
    templateUrl: 'demandresponse.component.html'
})

export class DemandResponseComponent implements OnInit{
  public idro = 0;
  public flexibility_forecast = 0;
  public ranking = 0;
  public invite_participants = 0;

  public consumption = '0';
  public generation = '0';
  public flexibility = '0';
  public members = '0';
  
  public last_dro_char_datetime = '';

  public canvas : any;
  public ctx;
  public chartColor;
  public chartMetrics;
  public chartMonitoring;
  public rankingTable;
  
  public dro;
  public iot_flexibility_forecast;
  public ranking_table;
  public mainParticipants;
  public participantsResponses;
  constructor(private demandresponseService: DemandresponseService) { }

  async getIDRO(){
    this.idro = 1;
    this.dro = await this.demandresponseService.getDRO()
    this.createDROGraph(this.dro['consumption'],this.dro['generation'],this.dro['flexibility'],this.dro['dr_period'],this.dro['gs_period'])
    this.last_dro_char_datetime= new Date().toLocaleString();
    this.idro = 2;
  }

  async getIoTFlexibility(){
    this.flexibility_forecast = 1;
    this.iot_flexibility_forecast = await this.demandresponseService.getIotForecast();
    this.flexibility_forecast = 2;
  }

  async runRanking(){
    this.ranking = 1;
    const ranking_response = await this.demandresponseService.postRanking(this.iot_flexibility_forecast)
    this.ranking_table = ranking_response[0]
    this.mainParticipants = ranking_response[1]
    this.createRankingTable(ranking_response[0])
    const metricsAverage = await this.demandresponseService.getMetricsAverage(this.ranking_table)
    console.log(metricsAverage)
    this.createMetricsChart(metricsAverage)
    this.ranking = 2;
  }

  async inviteParticipants(){
    this.invite_participants = 1;
    this.participantsResponses = await this.demandresponseService.postInviteParticipants(this.dro['consumption'],this.dro['generation'],this.dro['flexibility'],this.dro['dr_period'],this.dro['dr_energy'],this.dro['gs_period'],this.dro['gs_energy'],this.mainParticipants, this.ranking_table)
    this.invite_participants = 2;
  }

  async createDROGraph(consumption, generation, flexibility, dr_period, gs_period){
    var dr_data = [] 
    let j = 0;
    for (const index of dr_period) {
      if (index!=j){
        for (let i = 0; i < (index-j); i++) {
          dr_data.push(NaN);
        }
      }
      j=index+1;
      dr_data.push(generation[index])
    }
    
    var gs_data = []
    j = 0;
    for (const index of gs_period) {
      if (index!=j){
        for (let i = 0; i < (index-j); i++) {
          gs_data.push(NaN);
        }
      }
      j=index+1;
      gs_data.push(generation[index])
    }
    this.ctx = document.getElementById("speedChart");
    var lineChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
        datasets: [{
          data: consumption,
          borderColor: '#51cbce',
          backgroundColor: 'transparent',
          pointRadius: 0
        }, 
        {
          data: generation,
          borderColor: '#6bd098',
          backgroundColor: 'transparent',
          pointRadius: 0
        }, 
        {
          data: flexibility,
          borderColor: '#ef8157',
          backgroundColor: 'transparent',
          pointRadius: 0
        }, 
        {
          data: dr_data,
          type: 'scatter',
          borderColor: '#874587',
          backgroundColor: 'transparent',
          pointRadius: 8,
          pointHoverRadius: 4,
          pointBorderWidth: 2
        }, 
        {
          data: gs_data,
          type: 'scatter',
          borderColor: '#6bd098',
          backgroundColor: 'transparent',
          pointRadius: 8,
          pointHoverRadius: 4,
          pointBorderWidth: 2
        }]
      },
      options: {
        legend: {
          display: false,
          position: 'top'
        }
      }
    });
  }

  async createRankingTable(ranking){
    var json = [];
    for (const iot of ranking) {
        json.push({name:iot[7],flexibility:iot[0],metric1:iot[1],metric2:iot[2],metric3:iot[3],metric4:iot[4],totalscore:iot[5],fairscore:iot[6]})
    }
    this.rankingTable = json
  }

  createMetricsChart(metricsAverage){
    this.canvas = document.getElementById("chartMetrics");
    this.ctx = this.canvas.getContext("2d");
    this.chartMetrics = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: metricsAverage[0],
        datasets: [{
          label: "Metrics",
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
  }

  async createHistoricChart(historic){
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
  }

  async ngOnInit(){
    const last_dr_event = await this.demandresponseService.getLastDREvent()
    this.last_dro_char_datetime = last_dr_event['datetime']

    this.createDROGraph(last_dr_event['consumption'],last_dr_event['generation'],last_dr_event['flexibility'],last_dr_event['dr_period'], last_dr_event['gs_period']);
    
    this.mainParticipants = last_dr_event['participants_responses'].length
    this.createRankingTable(last_dr_event['ranking']);

    const historic = await this.demandresponseService.getHistoric();
    this.createHistoricChart(historic)

    this.createMetricsChart(last_dr_event['metrics'])    
  }
}
