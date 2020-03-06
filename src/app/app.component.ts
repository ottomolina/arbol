import { Component, ViewChild } from '@angular/core';
import { Arbol, Nodo } from './classes/estructura/arbol';
import { GrafoComponent } from './grafo/grafo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // @ViewChild('chartGrafo', {static: false}) chartGrafo: GrafoComponent;
  title = 'Gráfica Árbol';
  titleReco = 'Recorrido ';
  public valor: number;
  arbol: Arbol;
  options: any;
  optionsReco: any;

  tipos: any = [
    { value: '0', viewValue: 'Preorden' },
    { value: '1', viewValue: 'Inorden' },
    { value: '2', viewValue: 'Postorden' },
    { value: '3', viewValue: 'Anchura' }
  ];

  links = new Array();
  datos = new Array();

  constructor() {
    this.arbol = new Arbol();
    this.options = { title: { text: this.title } };
    setInterval(() => {
    this.optionsReco = {
      title: { text: this.titleReco },
      animationDurationUpdate: 1000,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          type: 'graph',
          layout: 'none',
          symbolSize: 30,
          roam: true,
          label: { normal: { show: true } },
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          edgeLabel: { normal: { textStyle: { fontSize: 8 } } },
          data: [
            {name: '5', x: 5, y: 5},
            {name: '1', x: 15, y: 5},
            {name: '3', x: 25, y: 5},
            {name: '7', x: 35, y: 5}
          ],
          links: [
            {source: '5', target: '1'},
            {source: '1', target: '3'},
            {source: '3', target: '7'}
          ],
          lineStyle: { normal: { opacity: 0.9, width: 2, curveness: 0 } }
        }
      ]
    };
  }, 1000);
  }

  agregarNodo() {
    console.log(this.valor);
    this.arbol.insertar(this.valor);
    this.valor = null;
    this.pintar();
  }

  reset() {
    this.arbol = new Arbol();
    this.options = { };
  }

  private verificaNodo(x: number, y: number): boolean {
    let ret = false;
    this.datos.forEach(element => {
      if (element.x === x && element.y === y) {
        ret = true;
      }
    });
    return ret;
  }

  private pintaArbol(nodo: Nodo, vx: number, vy: number, xoff: number, yoff: number, nivel: number) {
    if (nodo === undefined || nodo === null) { return; }
    if (this.verificaNodo(vx, vy)) {
      const data = { name: nodo.valor.toString(), x: (vx + 10), y: (vy + 10) };
      this.datos.push(data);
    } else {
      const data = { name: nodo.valor.toString(), x: vx, y: vy };
      this.datos.push(data);
    }

    if (nodo.izq !== undefined && nodo.izq !== null) {
      const link = { source: nodo.valor.toString(), target: nodo.izq.valor.toString() };
      this.links.push(link);
    }
    if (nodo.der !== undefined && nodo.der !== null) {
      const link = { source: nodo.valor.toString(), target: nodo.der.valor.toString() };
      this.links.push(link);
    }
    this.pintaArbol(nodo.izq, (vx - xoff), (vy + yoff), (xoff + nivel * 2), yoff, nivel + 1);
    this.pintaArbol(nodo.der, (vx + xoff), (vy + yoff), (xoff - nivel * 2), yoff, nivel + 1);
  }

  public pintar(): void {
    this.datos = new Array();
    this.links = new Array();
    const altura = this.arbol.getAltura();
    this.pintaArbol(this.arbol.raiz, 510, (720 / 12), (1020 / 12), (720 / 12), 1);
    this.generateOptions();
  }

  private generateOptions(): void {
    this.options = {
      title: { text: this.title },
      animationDurationUpdate: 1000,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          type: 'graph',
          layout: 'none',
          symbolSize: 30,
          roam: true,
          label: { normal: { show: true } },
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          edgeLabel: { normal: { textStyle: { fontSize: 8 } } },
          data: this.datos,
          links: this.links,
          lineStyle: { normal: { opacity: 0.9, width: 2, curveness: 0 } }
        }
      ]
    };
  }

}
