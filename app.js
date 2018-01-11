/*
Customize dropping shapes code

   INSTRUCTIONS:
      - Make it so that the colors of the dropping shapes are random.
      - Add at least one other shape and have the type of shape randomize between circle and your new shape upon creation.
      - Can you find the object/memory leak? If so can you fix it or at least describe why it is happening in comments?
*/

var canvas,
    ctx;
class SuralinkApplicationFX {
    constructor() {
        this._frame = 0;
        this._canvasInitted = false;

        // The memory leak appears to be in the below array.
        // Data is continually added causing the array to be several thousand entries long within minutes
        // Fixed by creating function cleanMemoryLeak, splices items from array that have traveled 50px past window height

        this._shapes = [];

        this.InitCanvas();
        this.Render();
    }

    cleanMemoryLeak(){
        // console.log(this._shapes.length, this._shapes)
        let shapesArray = this._shapes;

        for(let i = 0; i < this._shapes.length; i++){
            if(shapesArray[i]._y > window.innerHeight + 50){
                this._shapes.splice(i, 1)
            }
        }
    }

    InitCanvas() {
        this._canvasInitted = true;
        canvas = document.getElementById('theCanvas'),
        ctx = canvas.getContext('2d');
        canvas.setAttribute('width', window.innerWidth);

        this.DropShapes();

        window.requestAnimationFrame(() => this.Render());
    }



    DropShapes() {
        if (this._shapes.length <= 0) 
        window.requestAnimationFrame(() => this.Render());
        
        var howManyToDrop = getRandomInt(1, 12);
        
        // Cleaning function
        this.cleanMemoryLeak();


        for (var xIt = 1; xIt <= howManyToDrop; xIt++) {
            let shape = this.randomizeShape();
            this._shapes.push(shape);

        }
        setTimeout(() => this.DropShapes(), getRandomInt(350, 950));
    }

    //new Shapes go here

    randomizeShape(){
        let x = getRandomInt(0, parseInt(canvas.getAttribute('width')));
        let y = 0;
        let color = getRandomRgb(255, 0); //color
        let alpha = randomNumFrom(0.15, 0.65); //alpha
        let gravity = randomNumFrom(0.05, 1.45); //gravity
        let size = randomNumFrom(2, 20);

        // Below would be based on only two possible shapes, 
        // For more than 2 shapes, would create a shape array with all possibilities 

        let shapeRandomizer = getRandomInt(1, 10)
        if(shapeRandomizer % 2 === 0){
            return new Circle(x, y, color, alpha, gravity, size)
        } else {
            return new Square(x, y, color, alpha, gravity, size)
        }
    }

    Render() {
        if (this._canvasInitted == true) {
            this._frame++;
            this._can_w = parseInt(canvas.getAttribute('width')),
            this._can_h = parseInt(canvas.getAttribute('height')),

            ctx.clearRect(0, 0, this._can_w, this._can_h);

            this.UpdateShapes();
            this.DrawShapes();
        }

        if (this._shapes.length > 0) 
            window.requestAnimationFrame(() => this.Render());
        }
    
    DrawShapes()
    {
        this
            ._shapes
            .forEach(function (shape) {
                shape.Draw();
            }, this);
    }

    UpdateShapes()
    {
        this
            ._shapes
            .forEach(function (shape, idx) {
                shape.ApplyGravity();
            }, this);
    }
}

class Shape {
    constructor(type, x, y, color, alpha, gravity)
    {
        this._type = type;
        this._x = x;
        this._y = y;
        this._color = color;
        this._gravity = gravity;
        this._alpha = alpha;
    }

    get type() {
        return this._type;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }

    ApplyGravity()
    {
        this._y += this._gravity;
    }

    Draw() {}
}

class Circle extends Shape {
    constructor(x, y, color, alpha, gravity, radius) {
        super("circle", x, y, color, alpha, gravity);
        this._radius = radius;
        // console.log(x, y, color, alpha, gravity, radius)
    }

    Draw() {
        ctx.fillStyle = 'rgba(' + this._color + ',' + this._alpha + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this._radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
}

class Square extends Shape {
    constructor(x, y, color, alpha, gravity, dimension) {
        super("square", x, y, color, alpha, gravity);
        this._dimension = dimension * 2;
        // console.log(x, y, color, alpha, gravity, radius)
    }

    Draw() {
        ctx.fillStyle = 'rgba(' + this._color + ',' + this._alpha + ')';
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this._dimension, this._dimension);
        ctx.closePath();
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomNumFrom(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomRgb(max, min) {
    let r = Math.floor( Math.random() * (max - min + 1) );
    let g = Math.floor( Math.random() * (max - min + 1) );
    let b = Math.floor( Math.random() * (max - min + 1) );

    let randomRgb = r + ', ' + g + ', ' + b;
    // console.log(randomRgb);
    // return randomRgb
    return randomRgb;
}

var suralinkAppFx = new SuralinkApplicationFX();