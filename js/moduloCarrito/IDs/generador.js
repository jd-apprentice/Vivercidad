export class generarID {
    constructor() {
        this.id = 0;
    }

    generar() {
        this.id++;
        return this.id;
    }
}