class Square {
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


class Renderer {
    private ctx: CanvasRenderingContext2D;
    private renderingSquares: Square[] = [];
    private toBeRemovedQueue: number[] = [];
    private firstRun = true;

    constructor(canvas: HTMLCanvasElement) {
        var ctx = canvas.getContext("2d");
        if (ctx == null) {
            throw new Error("Could not get a drawing context.");
        } else {
            this.ctx = ctx;
        }
    }

    clear() {
        this.ctx.fillStyle = "#104547";
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        this.ctx.moveTo(0, window.innerHeight / 2);
        this.ctx.strokeStyle = "#D2D6EF";
        this.ctx.lineWidth = 10;
        this.ctx.lineTo(window.innerWidth, window.innerHeight / 2);
        this.ctx.stroke();
        this.ctx.fillStyle = "#D2D6EF";
    }

    addSquare(type: string) {
        this.renderingSquares.push(new Square(type));
    }

    loop(time: number) {
        this.clear();
        this.renderingSquares.forEach((square, index) => {
            this.ctx.fillRect(square.x, square.y, square.w, square.h);
            square.move();
            if (square.x == window.innerWidth) {
                this.toBeRemovedQueue.push(index);
            }
        });
        this.toBeRemovedQueue.forEach(index => {
            this.renderingSquares.splice(index)
        });
        window.requestAnimationFrame(this.loop);
    }
}

let canvas = (<HTMLCanvasElement> document.getElementById("canvas"));
canvas.setAttribute("width", window.innerWidth.toString());
canvas.setAttribute("height", window.innerHeight.toString());

let renderer = new Renderer(canvas);
document.onkeydown = (ev: KeyboardEvent) => {
    if (ev.code == "Space") renderer.addSquare("big");
    else if (ev.code == "Enter") renderer.addSquare("small");
}

window.requestAnimationFrame(renderer.loop);