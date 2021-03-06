const theVoid = {
    canvas: document.getElementById('void-canvas'),
    active: true,
    speed: 55,
    dotCheck: function() {
        if (Math.random() < 0.02) theVoid.dot();
    },
    dots: [],
    dot: function() {
        this.dots.push({
          x: Math.floor(Math.random() * window.innerWidth),
          y: 0,
          r: Math.ceil(Math.random() * 2 + 1),
          v: parseFloat((Math.random() + 1).toFixed(1)),
          o: 1,
          m: (Math.random() > 0.5) ? Math.random() : Math.random() * -1
        });
    },
    targetDotCheck: function() {
        if (Math.random() < 0.5) return true;
    },
    targetDot: function(x,y,c,r) {
        const xran = (Math.random() < 0.5) ? Math.random() / 2 : Math.random() / -2; 
        this.dots.push({
          x: x + xran,
          y: y,
          c: c,
          r: r,
          v: parseFloat((Math.random() + 1).toFixed(1))
        });
    },
    goneCheck: function(cur) {
        return (cur.y > this.canvas.height || cur.y < 0 || cur.x > this.canvas.width || cur.x < 0);
    },
    removeDots: function(arr) {
        let n = 0;
        arr.forEach(function(cur,ind,arr) {
          theVoid.dots.splice(cur,1-n);
          n++;
        });
    },
    adjust: function() {
        this.clear();
        theVoid.dotCheck();
        const toRemove = [];
        theVoid.dots.forEach(function(cur,ind,arr) {
            cur.o = 1 - (1 / (theVoid.canvas.height * 0.5)) * (cur.y - (theVoid.canvas.height * 0.5));
            let offset = (Math.random() < 0.5) ? parseFloat((Math.random()/2).toFixed(1)) : (Math.random()/2).toFixed(1) * -1;
            cur.y = parseFloat((cur.y + cur.v).toFixed(1));
            cur.x += offset;
            cur.x += cur.m;
            (Math.random() > cur.m) ? cur.m *= 0.98 : cur.m *= 1.005;

            theVoid.draw(cur);
            if (theVoid.goneCheck(cur)) toRemove.push(ind);
        });
        if (toRemove.length) this.removeDots(toRemove);
    },
    clear: function() {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
    },
    draw: function(cur) {
        this.context.fillStyle = `rgba(255,255,255, ${cur.o})`;;
        this.context.beginPath();
        this.context.arc(cur.x,cur.y,cur.r,0,Math.PI*2);
        this.context.fill();
    },
    main: function() {
        theVoid.adjust();
    },
    resize: function() {
        if (window.innerWidth < window.innerHeight) {
            this.canvas.width = window.innerHeight;
            this.canvas.height = window.innerHeight;
        } else {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerWidth;
        }
    }
}
theVoid.context = theVoid.canvas.getContext('2d');

window.addEventListener('resize', theVoid.resize);

function load() {
    theVoid.resize();
    setTimeout(() => theVoid.loop = setInterval(theVoid.main, theVoid.speed));
}
document.addEventListener("DOMContentLoaded", function(event) {load();});
