function Shape(position) {
    this.position = position;
};

Shape.prototype.render = function () { };

Shape.prototype.move = function (position) {
    this.position = position;
};

Shape.prototype.resize = function () { };

// Rectangle
function Rectangle(position, width, height) {
    Shape.call(this, position);
    this.width = width;
    this.height = height;
    this.color = document.getElementById('mycolor').value
    this.size = document.getElementById('selecter').value
};

Rectangle.prototype = Object.create(Shape.prototype);

Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function () {
    // Render a rectangle
    drawio.ctx.lineWidth = this.size;
    drawio.ctx.strokeStyle = this.color;
    drawio.ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
};

Rectangle.prototype.resize = function (x, y) {
    // The x coordinate we are getting in the function (starting position)
    // minus the final position
    this.width = x - this.position.x;
    // Same as above but for y
    this.height = y - this.position.y;
};

Rectangle.prototype.move = function (x, y) {
    this.position.x = x;
    this.position.y = y;
}

// Line shape
function Line(position, x, y) {
    Shape.call(this, position);
    this.x = x;
    this.y = y;
    this.color = document.getElementById('mycolor').value
    this.size = document.getElementById('selecter').value
};

Line.prototype = Object.create(Shape.prototype);

Line.prototype.constructor = Line;

Line.prototype.render = function () {
    drawio.ctx.lineWidth = this.size;
    drawio.ctx.strokeStyle = this.color
    drawio.ctx.beginPath();
    drawio.ctx.moveTo(this.position.x, this.position.y);
    drawio.ctx.lineTo(this.x, this.y);
    drawio.ctx.stroke();
    drawio.ctx.closePath();
};

Line.prototype.resize = function (x, y) {
    this.x = x;
    this.y = y;
};

// Brush shape
function Brush(position, lastPoint, lines = []) {
    Shape.call(this, position);
    this.lastPoint = lastPoint;
    this.lines = lines;
    this.name = 'brush';
    this.color = document.getElementById('mycolor').value
    this.size = document.getElementById('selecter').value
}
Brush.prototype = Object.create(Shape.prototype);

Brush.prototype.constructor = Brush;

Brush.prototype.render = function () {
    drawio.ctx.lineWidth = this.size;
    drawio.ctx.strokeStyle = this.color
    drawio.ctx.beginPath();
    for (let i = 0; i < this.lines.length; i++) {
        if (i !== 0) {
            drawio.ctx.moveTo(this.lines[i - 1].x, this.lines[i - 1].y);
        }
        drawio.ctx.lineTo(this.lines[i].x, this.lines[i].y);
    }
    drawio.ctx.closePath();
    drawio.ctx.stroke();
}

Brush.prototype.resize = function (x, y) {
    this.lastPoint.x = this.position.x;
    this.lastPoint.y = this.position.x;
    this.position = { x: x, y: y };
    this.lines.push(this.position);
}

Brush.prototype.move = function (x, y) {
    this.position.x = x;
    this.position.y = y;
    for (let i = 0; i < this.lines.length; i++) {
        var element = this.lines[i];
        element.y = (y - element.y);
        element.x = (x - element.x);
    }
}

// Circle
function Circle(position, radius) {
    Shape.call(this, position);
    this.radius = radius;
    this.color = document.getElementById('mycolor').value;
    this.size = document.getElementById('selecter').value;
    /*this.width = width;
    this.height = height;*/
};

Circle.prototype = Object.create(Shape.prototype);

Circle.prototype.constructor = Circle;

Circle.prototype.render = function () {
    //drawio.ctx.fillStyle = "red";
    drawio.ctx.lineWidth = this.size;
    drawio.ctx.strokeStyle = this.color
    drawio.ctx.beginPath();
    drawio.ctx.arc(this.position.x, this.position.y, this.radius, 2 * Math.PI, 0);
    drawio.ctx.closePath();
    drawio.ctx.stroke();

};

Circle.prototype.resize = function (x, y) {
    this.radius = Math.sqrt(Math.pow(x - this.position.x, 2) + Math.pow(y - this.position.y, 2));
};

Circle.prototype.move = function (x, y) {
    this.position.x = x;
    this.position.y = y;
}

// Text
function Text(position, width, height, strokeStyle, textInput, textFont) {
    Shape.call(this, position);
    this.width = width;
    this.height = height;
    this.strokeStyle = strokeStyle;
    this.type = "text";
    this.textInput = textInput;
    this.textFont = textFont;
    //this.draggable = true;
}
Text.prototype = Object.create(Shape.prototype);

Text.prototype.constructor = Text;

Text.prototype.render = function () {
    drawio.ctx.fillStyle = this.strokeStyle;
    drawio.ctx.font = this.textFont;
    drawio.ctx.fillText(this.textInput, this.position.x, this.position.y)
};

Text.prototype.move = function (x, y) {
    this.position.x = x;
    this.position.y = y;
};