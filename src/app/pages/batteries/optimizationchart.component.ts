import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { BatteryService } from '../../../services/battery/battery.service'
import * as echarts from "echarts";

import $ from 'jquery';

@Component({
    selector: 'optimization-chart',
    template: `<div class="mGraph-wrapper">
  <div class="mGraph" id="lineChart"></div>
</div>`,
    styles: [`
  .mGraph-wrapper{
    width: 100%;
    height: 400px;
    background: #fff;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mGraph-wrapper .mGraph{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }`]
})

/**plt.figure(1)
    ax = plt.axes()
    x = np.linspace(1, n_periods, n_periods)
    plt.plot(x, np.sum(Res['Buy_Grid'], 1), label='Bought from grid')
    plt.plot(x, np.sum(Res['Sell_Grid'], 1), label='Sold to the grid')
    plt.plot(x, np.sum(Gen, 1), label='Generation')
    plt.plot(x, np.sum(Load, 1), label='Load')
    plt.xticks(np.linspace(1, n_periods, n_periods))
    ax.set_xlim([1, n_periods])
    ax.grid(False)
    ax.set_facecolor('#ECE9E8')
    ax.legend(loc='best', edgecolor='#ECE9E8', facecolor='#ECE9E8')
    plt.xlabel("Periods (h)")
    plt.ylabel("Energy (kWh)")
    plt.show()

    plt.figure(2)
    ax = plt.axes()
    x = np.linspace(1, n_periods, n_periods)
    plt.plot(x, np.sum(Res['Bat_dch'], 1), label='Battery discharge')
    plt.plot(x, np.sum(Res['Bat_ch'], 1), label='Battery charge')
    plt.plot(x, np.sum(Res['Home_bat_est'], 1), label='Battery charge')
    plt.xticks(np.linspace(1, n_periods, n_periods))
    ax.set_xlim([1, n_periods])
    ax.grid(False)
    ax.set_facecolor('#ECE9E8')
    ax.legend(loc='best', edgecolor='#ECE9E8', facecolor='#ECE9E8')
    plt.xlabel("Periods (h)")
    plt.ylabel("Energy (kWh)")
    plt.show()

    plt.figure(3)
    ax = plt.axes()
    x = np.linspace(1, n_periods, n_periods)
    plt.plot(x, ToU.T[0], label='Buy')
    plt.plot(x, FiT.T[0], label='Sell')
    plt.xticks(np.linspace(1, n_periods, n_periods))
    ax.set_xlim([1, n_periods])
    ax.grid(False)
    ax.set_facecolor('#ECE9E8')
    ax.legend(loc='best', edgecolor='#ECE9E8', facecolor='#ECE9E8')
    plt.xlabel("Periods (h)")
    plt.ylabel("Price (€/kWh)")
    plt.show()

    y = []
    plt.figure(4)
    ax = plt.axes()
    x = np.linspace(1, n_periods, n_periods)

    for i in range(n_players):
        for bat in range(n_bat):
            aux = []
            for j in range(n_periods):
                aux.append(Est_bat_part[j][i][bat])
            y.append(aux)

    for j in range(n_bat * n_players):
        plt.plot(x, y[j], label='Bat ' + str(j + 1))

    plt.xticks(np.linspace(1, n_periods, n_periods))
    ax.set_xlim([1, n_periods])
    ax.grid(False)
    ax.set_facecolor('#ECE9E8')
    ax.legend(loc='best', edgecolor='#ECE9E8', facecolor='#ECE9E8')
    plt.xlabel("Periods (h)")
    plt.ylabel("Energy (kWh)")
    plt.show() */

export class OptimizationcharComponent implements OnInit {
    public option;
    constructor(private elm: ElementRef,
        private batteryService: BatteryService) { }

    async ngOnInit() {
        let lineChart = echarts.init($(this.elm.nativeElement).find('#lineChart')[0]);
        this.option = {
            tooltip: {
                trigger: 'axis',
                triggerOn: 'none',
            },
            legend: {
                data: []
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: [],
                axisPointer: {
                    triggerOn: 'none',
                    value: '0',
                    snap: true,
                    lineStyle: {
                        color: '#7581BD',
                        width: 2
                    },
                    label: {
                        show: true,
                        backgroundColor: '#7581BD'
                    },
                    handle: {
                        show: true,
                        color: '#7581BD'
                    }
                },
            },
            yAxis: {
                type: 'value'
            },
            series: []
        }


        //var optimization = await this.batteryService.getBatteriesOptimization();
        var historic = { "historic": [[99.76, 99.92, 99.84, 99.81, 99.8, 99.9], [99.86, 99.86, 99.78, 99.84, 99.88, 99.82], [99.85, 99.88, 99.77, 99.86, 99.8, 99.85], [80.0, 80.0, 80.0, 79.89, 79.0, 79.0], [99.8, 99.84, 99.78, 99.83, 99.8, 99.8], [99.87, 100.0, 100.0, 100.0, 99.77, 100.0]], "names": ["Building1_Battery_4", "Building1_Battery_5", "Building1_Battery_6", "Building2_Battery_1", "Building2_Battery_2", "Building2_Battery_3"] }
        var optimization = { 
            "bought": [4.321000000000001, 0.2, 0.4, 3.8, 0.4, 6.0, 0.8, 0.0, 0.0, 0.0, 0.0, 1.5444083333333332, 6.0, 6.0, 4.47243888888889, 3.481740972222222, 0.5763548611111116, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            "gen": [0.4, 0.2, 0.4, 0.6, 0.4, 0.2, 0.8, 1.0, 1.8, 2.4, 4.0, 6.0, 5.0, 3.2, 2.6, 3.8, 4.2, 1.8, 1.0, 0.6, 0.4, 0.8, 0.8, 0.0], "sold": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            "x": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 23.0, 24.0],
            "y_batteries": [
                ["Building1_Battery_4", [0.9, 0.9, 0.9, 0.99, 0.99, 2.7, 2.7, 2.7, 2.11, 1.22, 0.9, 0.9, 0.9, 2.61, 2.7, 2.68, 1.80, 0.89, 0.90, 0.90, 0.90, 0.90, 0.90, 0.90]],
                ["Building1_Battery_5", [0.6, 0.6, 0.6, 1.80, 1.80, 1.80, 1.80, 1.38, 1.38, 1.38, 0.6, 0.6, 1.80, 1.80, 1.80, 1.80, 0.60, 0.60, 0.60, 0.60, 0.60, 0.60, 0.60, 0.60]],
                ["Building1_Battery_6", [0.9, 0.9, 0.9, 1.51, 1.51, 2.7, 2.7, 2.7, 2.7, 2.7, 2.50, 0.9, 0.92, 1.14, 2.7, 2.7, 2.7, 2.7, 2.2, 1.90, 1.70, 1.30, 0.90, 0.90]],
                ["Building2_Battery_1", [0.6, 0.6, 0.6, 0.6, 0.6, 1.80, 1.80, 1.80, 1.21, 0.6, 0.6, 0.6, 0.62, 1.80, 1.80, 1.80, 1.5, 0.60, 0.60, 0.60, 0.60, 0.60, 0.60, 0.60]],
                ["Building2_Battery_2", [0.9, 0.9, 0.9, 1.0, 1.0, 2.7, 2.7, 2.7, 2.7, 2.7, 1.90, 0.9, 0.9, 1.65, 2.7, 2.7, 2.7, 1.70, 1.70, 1.70, 1.70, 1.30, 0.90, 0.90]],
                ["Building2_Battery_3", [0.6, 0.6, 0.6, 1.80, 1.80, 1.80, 1.80, 1.38, 1.38, 1.10, 0.6, 0.6, 1.80, 1.80, 1.80, 1.80, 0.6, 1.6, 1.1, 0.8, 0.60, 0.60, 0.60, 0.60]]] }
        var legend = []
        const now_hour = new Date().getHours()
        this.option.xAxis.data = [now_hour-5,now_hour-4,now_hour-3,now_hour-2,now_hour-1,now_hour, now_hour+1,now_hour+2,now_hour+3,now_hour+4,now_hour+5,now_hour+6]

        for (var i = 0; i < optimization['y_batteries'].length; i++) {
            var seriesName = optimization['y_batteries'][i][0]
            legend.push(seriesName)
            
            var array = [NaN,NaN,NaN,NaN,NaN, ...optimization['y_batteries'][i][1].slice(now_hour-1)]

            this.option.series.push({
                name: legend[i],
                type: 'line',
                lineStyle: {
                    type: 'dashed'
                },
                data: array,
                showSymbol: false,
                smooth: false,
            })
        }
        //var historic = await this.batteryService.getBatteriesHistoric();
        
        for (var i = 0; i < historic['historic'].length; i++) {
            for (var j = 0; j < historic['historic'][i].length; j++){
                historic['historic'][i][j] = historic['historic'][i][j] / 100 * 3.6
            }
        }
        for (var i = 0; i < historic['historic'].length; i++) {
            this.option.series.push({
                name: legend[i],
                type: 'line',
                data: historic['historic'][i],
                showSymbol: false,
                smooth: false,
            })
        }

        this.option.xAxis.axisPointer.value = now_hour.toString();
        this.option.legend.data = legend
        this.optionsGraph(lineChart)
    }

    optionsGraph(lineChart) {
        lineChart.setOption(this.option)
    }
}