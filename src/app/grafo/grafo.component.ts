import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafo',
  templateUrl: './grafo.component.html',
  styleUrls: ['./grafo.component.css']
})
export class GrafoComponent implements OnInit {

  options = {
    title: {
      text: 'Gráfica Árbol'
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 60,
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
              fontSize: 20
            }
          }
        },
        data: [{
          name: 'Node 1',
          x: 300,
          y: 300
        }, {
          name: 'Node 2',
          x: 800,
          y: 300
        }, {
          name: 'Node 3',
          x: 550,
          y: 100
        }, {
          name: 'Node 4',
          x: 550,
          y: 500
        }],
        // links: [],
        links: [/*{
          source: 0,
          target: 1,
          symbolSize: [5, 20],
          label: {
            normal: {
              show: true
            }
          },
          lineStyle: {
            normal: {
              width: 5,
              curveness: 0.2
            }
          }
        },*/ /*{
          source: 'Node 2',
          target: 'Node 1',
          label: {
            normal: {
              show: true
            }
          },
          lineStyle: {
            normal: { curveness: 0.2 }
          }
        },*/
        {
          source: 'Node 3',
          target: 'Node 1'
        },
        {
          source: 'Node 3',
          target: 'Node 2'
        },
        {
          source: 'Node 2',
          target: 'Node 4'
        }/*,
        {
          source: 'Node 1',
          target: 'Node 4'
        }*/
      ],
        lineStyle: {
          normal: {
            opacity: 0.9,
            width: 2,
            curveness: 0
          }
        }
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
