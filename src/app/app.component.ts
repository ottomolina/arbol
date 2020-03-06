import { Component, ViewChild } from '@angular/core';
import { Arbol, Nodo } from './classes/estructura/arbol';
import { LinkedList } from 'linked-list-typescript';
import { Cola } from './classes/estructura/Cola';
// const { LinkedList } = require('linked-list-typescript');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // @ViewChild('chartGrafo', {static: false}) chartGrafo: GrafoComponent;
  title = 'Gráfica Árbol';
  titleReco = 'Recorrido ';
  arbol: Arbol;
  options: any;
  optionsReco: any;

  public valor: number;
  public cmbValor: any;
  public txtValor: any;

  tipos: any = [
    { value: '0', viewValue: 'Profundidad [Izq-Der]' },
    { value: '1', viewValue: 'Profundidad [Der-Izq]' },
    { value: '2', viewValue: 'Anchura [Izq-Der]' },
    { value: '3', viewValue: 'Anchura [Der-Izq]' }
  ];

  links = new Array();
  datos = new Array();

  constructor() {
    this.arbol = new Arbol();
    this.options = { title: { text: this.title } };

    /*setInterval(() => {
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
  }, 1000);*/
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

  busqueda(): void {
    if (this.arbol.getAltura() === 0) {
      alert('Aún no ha ingresado valores al árbol.');
      return;
    }
    console.log(this.cmbValor);
    console.log(this.txtValor);
    let valores: any;

    if (this.cmbValor === '0') {
      // Se realiza la búsqueda en profundidad [izq-der]
      valores = this.arbol.preordenRet();
    } else if (this.cmbValor === '1') {
      // Se realiza la búsqueda en profundidad [der-izq]
      valores = this.arbol.profDerRet();
    } else if (this.cmbValor === '2') {

      // Se realiza la búsqueda en anchura [izq-der]
      const record = new Cola();
      this.busquedaAnchura(this.arbol.raiz, record);
      /*for (const item of record) {
        console.log(item);
      }*/
      console.log(record);

    } else if (this.cmbValor === '3') {
      // Se realiza la búsqueda en anchura [der-izq]
    }
/*
    this.titleReco = 'Recorrido ' + this.tipos[this.cmbValor].viewValue;
    if (!this.verificaBusqueda(valores, this.txtValor)) {
      alert('No se ha encontrado el nodo meta');
    }
    this.makeGraphSearch(valores, this.txtValor);
    console.log(this.datos);
    console.log(this.links);
    this.generateOptionsReco();*/
  }

  private busquedaAnchura(aux: Nodo, recorrido: Cola): void {
    const cola = new Cola();
    cola.insertar(aux);
    while (cola.length() > 0) {
      const tmp: Nodo = cola.extrae();
      recorrido.insertar(tmp.valor);
      if (tmp.izq !== null) {
        cola.insertar(tmp.izq);
      }
      if (tmp.der !== null) {
        cola.insertar(tmp.der);
      }
    }
  }

  private verificaBusqueda(valores: string, meta: string): boolean {
    let ret = false;
    const array: string[] = valores.split(',');
    array.forEach(element => {
      if (element === meta) {
        ret = true;
      }
    });
    return ret;
  }

  private makeGraphSearch(valores: string, meta: string): void {
    const array: string[] = valores.split(',');
    let vx = 10;
    const vy = 10;
    this.datos = new Array();
    this.links = new Array();
    // array.forEach(element => {
    let auxElement: any = null;
    for (const element of array) {
      const data = { name: element.toString(), x: vx, y: vy };
      this.datos.push(data);
      if (auxElement !== null) {
        const link = { source: auxElement, target: element };
        this.links.push(link);
      }
      if (element === meta) {
        break;
      }
      vx += 10;
      auxElement = element;
    }
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

  private generateOptionsReco(): void {
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
          data: this.datos,
          links: this.links,
          lineStyle: { normal: { opacity: 0.9, width: 2, curveness: 0 } }
        }
      ]
    };
  }

}
