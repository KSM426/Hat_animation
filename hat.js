import { Point } from "./point.js";

const VEL = 5;
const JUMP = 20;
const ACC = 0.2;
const GRV = 1.7;
export class Hat {
    constructor(hH, hW, bH, bW, hC, bC, boxC, bR, floor) {
        this.canJump = 1;
        this.aFlag = 0;
        this.dFlag = 0;
        this.wFlag = 0;

        this.hatHeight = 80;
        this.hatWidth = 40;

        this.boxHeight = 16;
        this.boxWidth = 40;

        this.hatColor = 'green';
        this.ballColor = 'red';
        this.boxColor = 'gray';
        this.ballRadius = 10;

        this.v = new Point(0, 0);
        
        this.floor = 400;
        this.middle = new Point(175, this.floor);
        this.point = new Point(-20 + this.middle.x, -this.hatHeight + this.middle.y + 20);

        this.reCoor();

        window.addEventListener('keydown', this.keydown.bind(this));
        window.addEventListener('keyup', this.keyup.bind(this));
    }

    resize(w, h) {
        this.stageWidth = w;
        this.stageHeight = h;
    }

    animate(ctx) {
        ctx.save();
        ctx.translate(this.middle.x, this.middle.y);

        ctx.lineWidth = 2;
        
        ctx.fillStyle = this.hatColor;
        // ctx.strokeStyle = 'blue';
        
        ctx.beginPath();
        ctx.moveTo(this.point.x - this.middle.x, this.point.y - this.middle.y);
        ctx.quadraticCurveTo(this.rightCurve.x, this.rightCurve.y, this.right.x, this.right.y);
        
        ctx.lineTo(this.left.x, this.left.y);    

        ctx.quadraticCurveTo(this.leftCurve.x, this.leftCurve.y, this.point.x - this.middle.x, this.point.y - this.middle.y);
        ctx.closePath();        

        // ctx.stroke();
        ctx.fill();
        
        // ctx.fillStyle = 'black';
        // ctx.fillRect(-2, -2, 4, 4);
        
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.point.x-this.middle.x-2, this.point.y-this.middle.y-2, 4, 4);
        // ctx.fillRect(this.pointFix.x-2, this.pointFix.y-2, 4, 4);
        // ctx.fillRect(this.leftCurve.x-2, this.leftCurve.y-2, 4, 4);
        // ctx.fillRect(this.rightCurve.x-2, this.rightCurve.y-2, 4, 4);
        // ctx.fillRect(this.left.x-2, this.left.y-2, 4, 4);
        // ctx.fillRect(this.right.x-2, this.right.y-2, 4, 4);

        ctx.fillStyle = this.boxColor;
        ctx.fillRect(this.left.x, this.left.y - this.boxHeight/2, this.boxWidth, this.boxHeight);

        ctx.fillStyle = this.ballColor;
        ctx.beginPath();
        ctx.arc(this.point.x - this.middle.x, this.point.y - this.middle.y, this.ballRadius, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();


        ctx.restore();


        this.velocity();
        this.reCoor();
        this.move();
    }

    keydown(e) {
        //w 87, a 65, s 83, d 68
        if(e.keyCode == 65) {
            this.aFlag = 1;
        } else if(e.keyCode == 68) {
            this.dFlag = 1;
        } else if(e.keyCode == 87) {
            this.wFlag = 1;
        }
    }

    keyup(e) {
        if(e.keyCode == 65) {
            this.aFlag = 0;
        } else if(e.keyCode == 68) {
            this.dFlag = 0;
        } else if(e.keyCode == 87) {
            this.wFlag = 0;
        }
    }

    velocity() {
        if(this.aFlag == 1) {
            this.v.x -= VEL;
        }
        if(this.dFlag == 1) {
            this.v.x += VEL;
        }
        if(this.wFlag == 1 && this.canJump == 1) {
            this.v.y -= JUMP;
            this.canJump = 0;
        } else {
            this.v.y += GRV;
        }
    }

    move() {        
        this.middle.x += this.v.x;
        this.middle.y += this.v.y;

        if(this.middle.y > this.floor) {
            this.v.y = 0;
            this.canJump = 1;
            this.middle.y = this.floor;
        }

        this.v.x *= ACC;

        this.point.x += (this.pointFix.x - (this.point.x-this.middle.x)) * 0.1;
        this.point.y += (this.pointFix.y - (this.point.y-this.middle.y)) * 0.1;
    }

    reCoor() {
        this.pointFix = new Point(0, -this.hatHeight);
        this.left = new Point(-this.hatWidth/2, 0);
        this.right = new Point(this.hatWidth/2, 0);

        this.leftCurve = new Point().middlePoint(this.pointFix, this.left);
        this.rightCurve = new Point().middlePoint(this.pointFix, this.right);
    }
}