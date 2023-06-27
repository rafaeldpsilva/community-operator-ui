import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { DemandresponseService } from '../../../services/demandresponse/demandresponse.service'
import { interval } from 'rxjs';

@Component({
    selector: 'demandresponse-cmp',
    moduleId: module.id,
    templateUrl: 'demandresponse.component.html'
})

export class DemandResponseComponent implements OnInit{
  //button states
  public idroButton = 0;
  public flexibilityForecastButton = 0;
  public rankingButton = 0;
  public inviteParticipantsButton = 0;
  public isRankingTableExtended = false;

  public mainParticipants;
  public participantsResponses;
  public eventHours;
  public selectedHour;

  //html variables
  public canvas : any;
  public ctx;
  public chartHistoric;
  public chartMetrics;
  public chartMonitoring;
  public rankingTable;
  
  public dro;
  public iotFlexibilityForecast;
  public rankingMatrix;

  public selectedDay;
  public eventsDayDate;
  public nextEvent = "";
  public currentEvent = "";
  public currentEventInterval = 0;
  public currentEventAggregatedBalance = 0;
  public eventTimeLeft;
  public upcomingEvents = [];


  constructor(private demandresponseService: DemandresponseService) { }

  async getIDRO(){
    this.idroButton = 1;
    this.dro = await this.demandresponseService.getDRO()
    this.createDROGraph(this.dro['consumption'],this.dro['generation'],this.dro['flexibility'],this.dro['dr_period'],this.dro['gs_period'])
    this.idroButton = 2;

    this.eventHours = this.dro['dr_period'].concat(this.dro['gs_period'])
  }

  async getIoTFlexibility(){
    this.flexibilityForecastButton = 1;
    this.iotFlexibilityForecast = await this.demandresponseService.getIotForecast();
    this.flexibilityForecastButton = 2;
  }

  async runRanking(){
    this.rankingButton = 1;
    const ranking_response = await this.demandresponseService.postRanking(this.iotFlexibilityForecast)
    this.rankingMatrix = ranking_response[0]
    this.mainParticipants = ranking_response[1]
    this.createRankingTable(ranking_response[0])
    const metricsAverage = await this.demandresponseService.getMetricsAverage(ranking_response[0])
    this.createMetricsChart(metricsAverage)
    this.rankingButton = 2;
  }

  async inviteParticipants(){
    this.inviteParticipantsButton = 1;
    if (this.eventHours == null){
      this.inviteParticipantsButton = 0;
      console.log("ERROR")
      return
    } else {
      let date = new Date();
      date.setDate(date.getDate() + 1);
      let time = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${this.selectedHour}:00:00`;
      this.participantsResponses = await this.demandresponseService.postInviteParticipants(this.dro['consumption'],this.dro['generation'],this.dro['flexibility'],this.dro['dr_period'],this.dro['dr_energy'],this.dro['gs_period'],this.dro['gs_energy'],this.mainParticipants, this.rankingMatrix, time)
      this.inviteParticipantsButton = 2;
    }
  }

  createDROGraph(consumption, generation, flexibility, dr_period, gs_period){
    let flexibility_area = [];
    consumption.forEach((element, index) => {
      flexibility_area.push(consumption[index]- flexibility[index]);
    });
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
        datasets: [
        {
          data: consumption,
          type: 'line',
          fill: 1,
          borderColor: '#51cbce',
          backgroundColor: 'rgba(81, 203, 206, 0.4)', // Change color and alpha value as desired
          pointRadius: 0
        },
        {
          data: flexibility_area,
          borderColor: '#ef8157',
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

  async createEventsTable(events){
    let sortedAsc;
    if (events[0] != '') {
      sortedAsc = Object.values(events).sort(
        (objA, objB) => Number(Date.parse(objA[0])) - Number(Date.parse(objB[0])),
        );
    }
    var json = [];
    for (const event of sortedAsc) {
      json.push({time:event[0],okParticipants:event[1],notOkParticipants:event[2]})
    }
    this.upcomingEvents = json

    const upcoming = await this.demandresponseService.getUpcomingEvents();
    if (upcoming[0] != '') {
      sortedAsc = Object.values(upcoming).sort(
        (objA, objB) => Number(Date.parse(objA[0])) - Number(Date.parse(objB[0])),
        );
    }
    if (new Date() > new Date(Date.parse(sortedAsc[0][0]))){
      this.currentEvent = sortedAsc[0][0]
      this.nextEvent = sortedAsc[1][0]
      setInterval(() => this.calculateDifference(sortedAsc[1][0]), 1000);
    } else{
      this.currentEvent = '';
      this.nextEvent = sortedAsc[0][0]
      setInterval(() => this.calculateDifference(sortedAsc[0][0]), 1000);
    }
    this.loadEventData(sortedAsc[0][0])
  }

  createRankingTable(ranking){
    var json = [];
    for (const iot of ranking) {
        json.push({name:iot[7],flexibility:iot[0],metric1:iot[1],metric2:iot[2],metric3:iot[3],metric4:iot[4], totalscore:iot[5].toFixed(2),fairscore:iot[6]})
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

  async loadEventData(event_time){
    const event = await this.demandresponseService.getDemandResponseEvent(event_time);
    this.createEventMonitoringChart(event_time, event['aggregated_balance'])
    this.createDROGraph(event['consumption'],event['generation'],event['flexibility'],event['dr_period'], event['gs_period']);
    
    this.mainParticipants = event['participants_responses'].length
    this.createRankingTable(event['ranking']);
    
    this.createMetricsChart(event['metrics'])
    
  }

  async createEventMonitoringChart(event_time, aggregated_balance){
    let monitoring = aggregated_balance[0];

    let corrections = [[],[],[],[],[],[]];
    if (aggregated_balance[0][1] != null) {
      for(let i = 0; i< aggregated_balance[1].length; i++){
        for(let j = 0; j < aggregated_balance[1][i].length; j++){
          if (i>j){
            corrections[j].push(aggregated_balance[1][j][i])
          }else{
            if(i==j){
              corrections[j].push(aggregated_balance[0][i])
            }else{
              corrections[j].push(NaN)
            }
          }
        }
      }
      //corrections = aggregated_balance[1][0].map((_, colIndex) => aggregated_balance[1].map(row => row[colIndex]));
    }

    let hour = event_time.slice(11,-6)
    let hours = [hour+':00',hour+':10',hour+':20',hour+':30',hour+':40',hour+':50',parseInt(hour)+1+':00']

    this.currentEventAggregatedBalance = monitoring.at(-1)
    this.currentEventInterval = monitoring.length - 1

    this.chartHistoric = "#FFFFFF";
    this.canvas = document.getElementById("chartEventMonitoring");
    this.ctx = this.canvas.getContext("2d");
    this.chartMonitoring = new Chart(this.ctx, {
      type: 'line',

      data: {
        labels: hours,
        datasets: [{
          borderColor: "#51cbce",
          backgroundColor: "transparent",
          pointRadius: 2,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: monitoring,
          label: 'Aggregated Balance'
        },
        {
          borderColor: "#3be332",
          backgroundColor: "transparent",
          pointRadius: 2,
          pointHoverRadius: 0,
          borderWidth: 3,
          borderDash: [5, 5],
          data: corrections[0],
          label: 'w/o DR',
          showLine: true
        },
        {
          borderColor: "#de2fd2",
          backgroundColor: "transparent",
          pointRadius: 2,
          pointHoverRadius: 0,
          borderWidth: 3,
          borderDash: [5, 5],
          data: corrections[1],
          label: 'Correction 1',
          showLine: true
        },
        {
          borderColor: "#de752f",
          backgroundColor: "transparent",
          pointRadius: 2,
          pointHoverRadius: 0,
          borderWidth: 3,
          borderDash: [5, 5],
          data: corrections[2],
          label: 'Correction 2',
          showLine: true
        },
        {
          borderColor: "#b0a50b",
          backgroundColor: "transparent",
          pointRadius: 2,
          pointHoverRadius: 0,
          borderWidth: 3,
          borderDash: [5, 5],
          data: corrections[3],
          label: 'Correction 3',
          showLine: true
        },
        {
          borderColor: "#1043eb",
          backgroundColor: "transparent",
          pointRadius: 2,
          pointHoverRadius: 0,
          borderWidth: 3,
          borderDash: [5, 5],
          data: corrections[4],
          label: 'Correction 4',
          showLine: true
        },
        {
          borderColor: "#03154f",
          backgroundColor: "transparent",
          pointRadius: 2,
          pointHoverRadius: 0,
          borderWidth: 3,
          borderDash: [5, 5],
          data: corrections[5],
          label: 'Correction 5',
          showLine: true
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
    this.selectedDay = new Date()
    this.eventsDayDate = `${this.selectedDay.getDate()}-${this.selectedDay.getMonth()+1}-${this.selectedDay.getFullYear()}`;
    const events = await this.demandresponseService.getEvents(this.selectedDay);
    this.createEventsTable(events);
  }

  private calculateDifference(date1) {
    const difference = Math.abs(Date.parse(date1) - Date.now());
    const secondsDifference = Math.floor(difference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const remainingHours = Math.floor(minutesDifference / 60);
    const remainingMinutes = Math.floor(minutesDifference % 60);
    const remainingSeconds = Math.floor(secondsDifference % 60);
    this.eventTimeLeft = `${remainingHours}:${remainingMinutes}:${remainingSeconds}`
  }

  hideLine(line){
    if (this.chartMonitoring.data.datasets[line].showLine){
      this.chartMonitoring.data.datasets[line].showLine = false;
      this.chartMonitoring.data.datasets[line].pointRadius = 0;
    } else {
      this.chartMonitoring.data.datasets[line].showLine = true;
      this.chartMonitoring.data.datasets[line].pointRadius = 2;
    }
    console.log(this.chartMonitoring.data.datasets[line])
    this.chartMonitoring.update();
  }

  extendTable(){
    this.isRankingTableExtended = !this.isRankingTableExtended;
  }

  async eventsDayIncrement(increment){
    if (increment == 1){
      this.selectedDay.setDate(this.selectedDay.getDate() + 1)
    }else{
      this.selectedDay.setDate(this.selectedDay.getDate() - 1)
    }
    this.eventsDayDate = `${this.selectedDay.getDate()}-${this.selectedDay.getMonth()+1}-${this.selectedDay.getFullYear()}`;
    const events = await this.demandresponseService.getEvents(this.selectedDay);
    let sortedAsc;
    if (events[0] != '') {
      sortedAsc = Object.values(events).sort(
        (objA, objB) => Number(Date.parse(objA[0])) - Number(Date.parse(objB[0])),
        );
      this.createEventsTable(sortedAsc);
    }
  }
}
