var c = document.getElementById("bingo");
var ctx = c.getContext("2d");

speed = 0;
width = c.width;
height = c.height;

c.addEventListener('mousemove', function (event) {
    speed = Map(event.x, 0, window.width, 0, 16);
});

var stars = new Array(800);

setup();
setInterval(draw, 1000/20);

function setup() {
    for (let i = 0; i < stars.length; i++) {
        stars[i] = new Star();
    }
}

function draw() {
    ctx.save();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    ctx.translate(width/2, height/2);
    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
    }
    ctx.restore();
}

function Star() {
    this.x = rand(-width/2, width/2);
    this.y = rand(-height/2, height/2);
    this.z = rand(0,width);
    
    pz = this.z;
}

Star.prototype.update = function() {
    this.z-=speed;
    if (this.z < 1) {
        this.z = width;
        this.x = rand(-width/2, width/2);
        this.y = rand(-height/2, height/2);
        
        pz = this.z;
    }
}

Star.prototype.show = function() {
    let sx = Map(this.x/this.z, 0, 1, 0, width);
    let sy = Map(this.y/this.z, 0, 1, 0, height);
    
    let r = Map(this.z, 0, width, 16, 0);
    
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fillStyle = "white"
    ctx.fill();
    //ctx.stroke();
    ctx.beginPath();
    let px = Map(this.x/pz, 0, 1, 0, width);
    let py = Map(this.y/pz, 0, 1, 0, height);
    ctx.moveTo(px, py);
    ctx.lineTo(sx, sy);
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
}

function Map(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max-out_min) / (in_max - in_min) + out_min;
}

function rand(x, y) {
    return Math.random() * (y - x) + x;
}