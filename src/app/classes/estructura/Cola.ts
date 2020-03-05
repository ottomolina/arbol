
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
    insertar(valor: number) {
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
    extrae() {
        if (!this.isEmpty()) {
            const valor = this.raiz.dato;
            if (this.raiz === this.fondo) {
                this.raiz = this.fondo = null;
            } else {
                this.raiz = this.raiz.sig;
            }
            return valor;
        }
        return null;
    }
}
