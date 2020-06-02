class Wave
{
    constructor() {

        this.canvas = document.querySelector('canvas');
        this.engine = this.canvas.getContext('2d');

        this.width  = window.innerWidth;
        this.height = window.innerHeight;

        this.midX = this.width / 2;
        this.midY = this.height / 2;

        this.canvas.setAttribute('width', this.width);
        this.canvas.setAttribute('height', this.height);

        this.raster = {
            width: this.width / 25 | 0,
            height: this.height / 25 | 0
        };

        this.tick  = 123456;
        this.tick2 = 435555;

        this.createBackground();


    }

    createBackground() {

        this.bgr = this.engine.createRadialGradient(
            this.width * 0.8,
            this.height * 0.6,
            0,
            this.width * 0.8,
            this.height * 0.6,
            this.width * 0.3
        );

        this.bgl = this.engine.createLinearGradient(
            this.width * 0.8,
            this.height * 0.6,
            this.width * 0.8,
            0,
        );

        this.bgl.addColorStop(0, 'hsl(0, 50%, 50%)');
        this.bgl.addColorStop(1, 'hsl(200, 50%, 30%)');

        this.bgr.addColorStop(0, 'hsla(30, 50%, 70%, 1)');
        this.bgr.addColorStop(0.5, 'hsla(58, 50%, 70%, 0.7)');
        this.bgr.addColorStop(1, 'hsla(58, 50%, 40%, 0.1)');

    }

    getIndex(x, y) {
        return y * this.width + x;
    }


    clear() {
        this.engine.clearRect(0, 0, this.width, this.height);

        // this.engine.fillStyle = this.bgl;
        // this.engine.fillRect(0, 0, this.width, this.height * 0.6);
        //
        // this.engine.fillStyle = this.bgr;
        // this.engine.fillRect(0, 0, this.width, this.height * 0.6);
    }


    drawRaster() {

        for (let y = 0; y < this.raster.height; y++) {
            for (let x = 0; x < this.raster.width; x++) {

                this.drawTriangle(
                    [x / this.raster.width, y / this.raster.height],
                    [(x + 1) / this.raster.width, y / this.raster.height],
                    [(x + 1)/ this.raster.width, (y + 1) / this.raster.height],
                    [x / this.raster.width, (y + 1) / this.raster.height],
                );

            }
        }

    }

    drawTriangle(...triangles) {

        const base = triangles.shift();

        const depth = 0.2 + Math.pow(base[1], 0.8) * 0.8;
        const h     = 1 - ((1 + this.getHeight(...base)) * 0.3 + 0.4);

        // this.engine.strokeStyle = `hsl(200, 60%, ${10 + Math.min(1, depth * h) * 40}%)`;
        // this.engine.fillStyle   = `hsl(200, 60%, ${10 + Math.min(1, depth * h) * 40}%)`;

        // this.engine.strokeStyle = `hsl(220, ${Math.min(1, h) * 60}%, 60%)`;
        // this.engine.fillStyle   = `hsl(220, 60%, ${20 + Math.min(1, h) * 80}%)`;
        //
        //
        // this.engine.beginPath();
        //
        // this.engine.moveTo(...this.getCoords(...base, false, false));
        // this.engine.lineTo(...this.getCoords(...triangles[0], true, false));
        // this.engine.lineTo(...this.getCoords(...triangles[2], false, true));
        //
        // this.engine.moveTo(...this.getCoords(...triangles[0], true, false));
        // this.engine.lineTo(...this.getCoords(...triangles[1], true, true));
        // this.engine.lineTo(...this.getCoords(...triangles[2], false, true));
        //
        //
        // // this.engine.moveTo(...this.getCoords(...base, false, false));
        // // this.engine.lineTo(...this.getCoords(...triangles[0], true, false));
        // // this.engine.lineTo(...this.getCoords(...triangles[1], true, true));
        // // this.engine.lineTo(...this.getCoords(...triangles[2], false, true));
        //
        // // this.engine.moveTo(...this.getCoords(...base, false, false));
        // // this.engine.lineTo(...this.getCoords(...triangles[0], true, false));
        // //
        // // this.engine.moveTo(...this.getCoords(...base, false, false));
        // // this.engine.lineTo(...this.getCoords(...triangles[1], true, true));
        // //
        // // this.engine.moveTo(...this.getCoords(...base, false, false));
        // // this.engine.lineTo(...this.getCoords(...triangles[2], false, true));
        //
        //
        // this.engine.closePath();
        // // this.engine.stroke();
        // this.engine.fill();



        this.engine.strokeStyle = `hsl(200, 60%, ${10 + Math.min(1, depth * h) * 40}%)`;
        this.engine.fillStyle   = `hsl(200, 60%, ${10 + Math.min(1, depth * h) * 40}%)`;

        this.engine.strokeStyle = `hsla(220, ${Math.min(1, h) * 60}%, 100%, 0.1)`;

        this.engine.beginPath();

        this.engine.moveTo(...this.getCoords(...base, false, false));
        this.engine.lineTo(...this.getCoords(...triangles[0], true, false));

        this.engine.moveTo(...this.getCoords(...base, false, false));
        this.engine.lineTo(...this.getCoords(...triangles[1], true, true));

        this.engine.moveTo(...this.getCoords(...base, false, false));
        this.engine.lineTo(...this.getCoords(...triangles[2], false, true));


        this.engine.closePath();
        this.engine.stroke();

    }

    dist(x1, x2, y1, y2) {
        return Math.sqrt(
            Math.pow(x1 - x2, 2) +
            Math.pow(y1 - y2, 2)
        )
    }

    //-1 / 1
    getHeight(xRel, yRel) {

        const norm = 0.05 + (1 - yRel) * 0.1;
        const push = 20;

        return (
              Math.sin(this.dist(xRel, 0, yRel, 0) * push * 1.2 - this.tick * 0.2)
            + Math.sin(this.dist(xRel, 1, yRel, 0) * push * 1.2 - this.tick * 0.2)
            + Math.sin(yRel * push - this.tick * 0.1)
        ) / 2;
    }

    getCoords(xRel, yRel, xCeil = true, yCeil = true) {

        let nx, ny;

        if (xCeil) {
            nx = Math.ceil;
        } else {
            nx = Math.floor;
        }

        if (yCeil) {
            ny = Math.ceil;
        } else {
            ny = Math.floor;
        }

        const height = 0.03;
        const x  = this.midX + (xRel - 0.5) * this.width * (1 + Math.pow(yRel, 2));
        const hy = this.getHeight(xRel, yRel) * (0.2 + yRel) * this.height * height;

        return {
            x : nx(x),
            y : ny(this.height / 2 + Math.pow(yRel, 2) * this.height * (0.5 + height * 2) + hy),
            [Symbol.iterator] : function* () {
                yield this.x;
                yield this.y;
            }
        };

    }

    render() {

        this.tick++;
        this.tick2 += Math.random();

        this.clear();
        this.drawRaster();

        window.requestAnimationFrame(this.render.bind(this));

    }

    run() {

        this.render();

    }
}

const a = new Wave();
a.run();