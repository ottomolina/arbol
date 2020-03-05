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
    private raiz: Nodo;
    public label = '';

    constructor() {
        this.raiz = null;
        this.label = '';
    }

    insertar(valor: number) {
        const nuevo = new Nodo(valor);
        if (this.raiz == null) {
            this.raiz = nuevo;
        } else {
            let anterior: Nodo = null;
            let reco: Nodo = this.raiz;
            while (reco !== null) {
                anterior = reco;
                if (valor < reco.valor) {
                    reco = reco.izq;
                } else {
                    reco = reco.der;
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
    inorden(reco: Nodo) {
        if (reco !== null) {
            this.preorden(reco.izq);
            this.label += reco.valor.toString() + ',';
            this.preorden(reco.der);
        } else {
            return;
        }
    }
    postorden(reco: Nodo) {
        if (reco !== null) {
            this.preorden(reco.izq);
            this.preorden(reco.der);
            this.label += reco.valor.toString() + ',';
        } else {
            return;
        }
    }

    public preordenRet() {
        const nodo: Nodo = this.raiz;
        this.label = '';
        this.preorden(nodo);
        return this.label;
    }
    public inordenRet() {
        const nodo: Nodo = this.raiz;
        this.label = '';
        this.inorden(nodo);
        return this.label;
    }
    public postordenRet() {
        const nodo: Nodo = this.raiz;
        this.label = '';
        this.postorden(nodo);
        return this.label;
    }
}
