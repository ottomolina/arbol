export class Nodo {
    public valor: number;
    public izq: Nodo;
    public der: Nodo;

    constructor(valor: number) {
        this.valor = valor;
        this.izq = this.der = null;
    }
}

export class Arbol {
    public raiz: Nodo;
    public label = '';
    public alt: number;
    public numNodos: number;

    constructor() {
        this.raiz = null;
        this.label = '';
        this.alt = 0;
        this.numNodos = 0;
    }

    insertar(valor: number) {
        const nuevo = new Nodo(valor);
        if (this.raiz === null) {
            this.raiz = nuevo;
        } else {
            let anterior: Nodo = null;
            let reco: Nodo = this.raiz;
            while (reco !== null) {
                anterior = reco;
                if (valor < reco.valor) {
                    reco = reco.izq;
                } else if (valor > reco.valor) {
                    reco = reco.der;
                } else {
                    console.log('El valor ya fue ingresado');
                    return;
                }
            }
            if (valor < anterior.valor) {
                anterior.izq = nuevo;
            } else {
                anterior.der = nuevo;
            }
        }
    }
    private preorden(reco: Nodo) {
        if (reco !== null) {
            this.label += reco.valor.toString() + ',';
            this.preorden(reco.izq);
            this.preorden(reco.der);
        } else {
            return;
        }
    }
    private inorden(reco: Nodo) {
        if (reco !== null) {
            this.preorden(reco.izq);
            this.label += reco.valor.toString() + ',';
            this.preorden(reco.der);
        } else {
            return;
        }
    }
    private postorden(reco: Nodo) {
        if (reco !== null) {
            this.preorden(reco.izq);
            this.preorden(reco.der);
            this.label += reco.valor.toString() + ',';
        } else {
            return;
        }
    }
    private profDer(reco: Nodo) {
        if (reco !== null) {
            this.label += reco.valor.toString() + ',';
            this.profDer(reco.der);
            this.profDer(reco.izq);
        } else {
            return;
        }
    }

    public preordenRet(): string {
        const nodo: Nodo = this.raiz;
        this.label = '';
        this.preorden(nodo);
        this.label = this.label.substring(0, this.label.length - 1);
        return this.label;
    }
    public inordenRet(): string {
        const nodo: Nodo = this.raiz;
        this.label = '';
        this.inorden(nodo);
        this.label = this.label.substring(0, this.label.length - 1);
        return this.label;
    }
    public postordenRet(): string {
        const nodo: Nodo = this.raiz;
        this.label = '';
        this.postorden(nodo);
        this.label = this.label.substring(0, this.label.length - 1);
        return this.label;
    }
    public profDerRet(): string {
        const nodo: Nodo = this.raiz;
        this.label = '';
        this.profDer(nodo);
        this.label = this.label.substring(0, this.label.length - 1);
        return this.label;
    }

    private altura(nodo: Nodo, nivel: number) {
        if (nodo !== undefined && nodo !== null) {
            this.altura(nodo.izq, nivel + 1);
            this.alt = nivel;
            this.altura(nodo.der, nivel + 1);
        }
    }

    public getAltura(): number {
        this.altura(this.raiz, 1);
        return this.alt;
    }
}
