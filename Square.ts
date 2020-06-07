export class Square {
    x: number;
    y: number;
    w: number;
    h: number;

    constructor(type: string) {
        this.x = 0;
        this.w = window.innerWidth / 64;
        if (type == "big") {
            this.y = window.innerHeight * 0.2;
            this.h = window.innerHeight * 0.6;
        }
        else {
            this.y = window.innerHeight * 0.35;
            this.h = window.innerHeight * 0.3;
        }
    }

    move() {
        this.x++;
    }
}
