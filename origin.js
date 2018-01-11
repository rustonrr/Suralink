/*
Customize dropping shapes code

   INSTRUCTIONS:
      - Make it so that the colors of the dropping shapes are random.
      - Add at least one other shape and have the type of shape randomize between circle and your new shape upon creation.
      - Can you find the object/memory leak? If so can you fix it or at least describe why it is happening in comments?
*/

var canvas,
    ctx;
class SuralinkApplicationFX
{
    constructor()
    {
        this._frame = 0;
        this._canvasInitted = false;
        this._shapes = [];

        this.InitCanvas();
        this.Render();
    }

    InitCanvas()
    {
        this._canvasInitted = true;
        canvas = document.getElementById('theCanvas'),
        ctx = canvas.getContext('2d');
        canvas.setAttribute('width', window.innerWidth);

        this.DropShapes();

        window.requestAnimationFrame(() => this.Render());
    }

    DropShapes()
    {
        if (this._shapes.length <= 0) 
            window.requestAnimationFrame(() => this.Render());
        
        var howManyToDrop = getRandomInt(1, 12);

        for (var xIt = 1; xIt <= howManyToDrop; xIt++) {
            var shape = new Circle(getRandomInt(0, parseInt(canvas.getAttribute('width'))), 0, '41,91,140', randomNumFrom(0.15, 0.65), randomNumFrom(0.05, 1.45), randomNumFrom(2, 20));
            this
                ._shapes
                .push(shape);
        }

        setTimeout(() => this.DropShapes(), getRandomInt(350, 950));
    }

    Render()
    {
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

class Shape
{
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

class Circle extends Shape
{
    constructor(x, y, color, alpha, gravity, radius)
    {
        super("circle", x, y, color, alpha, gravity);
        this._radius = radius;
    }

    Draw()
    {
        ctx.fillStyle = 'rgba(' + this._color + ',' + this._alpha + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this._radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomNumFrom(min, max) {
    return Math.random() * (max - min) + min;
}

var suralinkAppFx = new SuralinkApplicationFX();