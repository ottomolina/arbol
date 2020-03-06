
export class NodoCola {
    public dato: number;
    public sig: NodoCola;
}

export class Cola {
    raiz: NodoCola;
    fondo: NodoCola;

    constructor() {
        this.raiz = null;
        this.fondo = null;
    }
    isEmpty() {
        return this.raiz == null;
    }
    insertar(valor: any) {
        const nuevo: NodoCola = new NodoCola();
        nuevo.dato = valor;
        nuevo.sig = null;
        if (this.isEmpty()) {
            this.raiz = this.fondo = nuevo;
        } else {
            this.fondo.sig = nuevo;
            this.fondo = nuevo;
        }
    }
    extrae(): any {
        if (!this.isEmpty()) {
            const valor = this.raiz;
            if (this.raiz === this.fondo) {
                this.raiz = this.fondo = null;
            } else {
                this.raiz = this.raiz.sig;
            }
            return valor;
        }
        return null;
    }

    length(): number {
        let ret = 0;
        let aux: NodoCola = this.raiz;
        while (aux != null) {
            ret++;
            aux = aux.sig;
        }
        return ret;
    }
}
