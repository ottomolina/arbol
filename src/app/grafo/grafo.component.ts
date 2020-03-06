import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EChartOption, ECharts } from 'echarts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grafo',
  templateUrl: './grafo.component.html',
  styleUrls: ['./grafo.component.css']
})
export class GrafoComponent implements OnInit {
  @Input() chartOption: any;
  /*options: any = {
    title: {
      text: 'Gráfica Árbol'
    },
    tooltip: {},
    animationDurationUpdate: 1000,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 30,
        roam: true,
        label: {
          normal: {
            show: true
          }
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          normal: {
            textStyle: {
              fontSize: 8
            }
          }
        },
        data: [ {name: '1', x: 90, y: 50 } ],
        lineStyle: {
          normal: {
            opacity: 0.9,
            width: 2,
            curveness: 0
          }
        }
      }
    ]
  };*/
  shown = false;

  /*public setOptions(options: any): void {
    if (this.options !== null && this.options !== undefined) {
      this.options.ngOnDestroy();
    }
    this.options = options;
  }

  public update(data: any, links: any): void {
    this.shown = false;
    this.options.series[0].data = data;
    this.options.series[0].links = links;
    this.shown = true;
  }*/

  constructor() {
   }

  ngOnInit(): void {
    console.log(this.chartOption);
  }


}
