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
                trigger: 'axis'
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
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: []
        }

        var optimization = await this.batteryService.getBatteriesOptimization();
        this.option.xAxis.data = optimization['x']
        this.option.legend.data = ['Battery 1','Battery 2','Battery 3','Battery 4','Battery 5','Battery 6']

        for (var i = 0; i < optimization['y_batteries'].length; i++){
            this.option.series.push({
                name: 'Battery '+i,
                type: 'line',
                data: optimization['y_batteries'][i],
                showSymbol: false,
                smooth: true,
            })
        }
        this.optionsGraph(lineChart)
    }

    optionsGraph(lineChart) {
        lineChart.setOption(this.option)
    }
}