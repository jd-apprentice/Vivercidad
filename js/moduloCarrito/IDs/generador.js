export class generarID {
    constructor() {
        this.id = Math.floor(Math.random() * 1000);
    }

    generar() {
        if(this.id == this.id) {
            this.id += 1;
            return this.id;
        }
    }
}